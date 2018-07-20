package com.instructure.canvas

import grails.gorm.transactions.Transactional
import grails.plugins.rest.client.RestResponse
import org.grails.web.json.JSONArray

@Transactional
class QuizSubmissionQuestionService extends CanvasAPIBaseService {

    List<QuizQuestion> listQuizSubmissionQuestions(String submissionId) {
        def url = "${canvasBaseURL}/api/v1/quiz_submissions/{submission_id}/questions?per_page={per_page_limit}"
        def params = [submission_id: submissionId, per_page_limit: perPageLimit]
        def resp = restClient.get(url){
            auth("Bearer ${oauthToken}")
            urlVariables(params)
        }
        log.debug("ACTION=External_API DESCRIPTION=List Quiz Submission Questions REQUEST_URL=${url} HTTP_STATUS=${resp.status}")
        if(resp.status == 200 && resp.json){
            JSONArray respArr = (JSONArray) resp.json.quiz_submission_questions
            List<QuizQuestion> resultList = new ArrayList<QuizQuestion>(respArr)
            processResponsePages(resp,resultList)
            return resultList
        }
        null
    }

    @Override
    <T> void processResponsePages(RestResponse resp, List<T> firstPage){
        def nextPage = canvasNextPage(resp)
        while(nextPage != null){
            resp = restClient.get(nextPage){
                auth('Bearer ' + oauthToken)
            }
            log.info("ACTION=External_API DESCRIPTION=Paging REQUEST_URL=${nextPage} HTTP_STATUS=${resp.status}")
            firstPage.addAll((JSONArray) resp.json.quiz_submission_questions)
            nextPage = canvasNextPage(resp)
        }
    }
}