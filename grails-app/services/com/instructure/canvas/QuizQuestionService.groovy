package com.instructure.canvas

import grails.gorm.transactions.Transactional
import org.grails.web.json.JSONArray

@Transactional
class QuizQuestionService extends CanvasAPIBaseService {

    List<QuizQuestion> listQuizQuestions(String courseId, String quizId) {
        def url = "${canvasBaseURL}/api/v1/courses/{course_id}/quizzes/{quiz_id}/questions?per_page={per_page_limit}"
        def params = [course_id: courseId, quiz_id: quizId, per_page_limit: perPageLimit]
        def start = System.currentTimeMillis()
        def resp = restClient.get(url){
            auth("Bearer ${oauthToken}")
            urlVariables(params)
        }
        log.debug("ACTION=External_API DESCRIPTION=List Quiz Questions REQUEST_URL=${url} HTTP_STATUS=${resp.status} RESP_TIME=${System.currentTimeMillis() - start}")
        if(resp.status == 200 && resp.json){
            JSONArray respArr = (JSONArray) resp.json
            List<QuizQuestion> resultList = new ArrayList<QuizQuestion>(respArr)
            processResponsePages(resp,resultList)
            return resultList
        }
        null
    }
}
