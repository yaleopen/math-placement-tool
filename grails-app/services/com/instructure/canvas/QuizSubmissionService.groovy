package com.instructure.canvas

import grails.gorm.transactions.Transactional
import org.grails.web.json.JSONArray

@Transactional
class QuizSubmissionService extends CanvasAPIBaseService {

    List<QuizSubmission> listQuizSubmissions(String courseId, String quizId) {
        def url = "${canvasBaseURL}/api/v1/courses/{course_id}/quizzes/{quiz_id}/submissions?per_page={per_page_limit}"
        def params = [course_id: courseId, quiz_id: quizId, per_page_limit: perPageLimit]
        def resp = restClient.get(url){
            auth("Bearer ${oauthToken}")
            urlVariables(params)
        }
        log.debug("ACTION=External_API DESCRIPTION=List Quiz Submissions REQUEST_URL=${url} HTTP_STATUS=${resp.status}")
        if(resp.status == 200 && resp.json){
            JSONArray respArr = (JSONArray) resp.json.quiz_submissions
            List<QuizSubmission> resultList = new ArrayList<QuizSubmission>(respArr)
            processResponsePages(resp,resultList)
            return resultList
        }
        null
    }
}