package com.instructure.canvas

import grails.gorm.transactions.Transactional

@Transactional
class QuizQuestionGroupService extends CanvasAPIBaseService {

    QuizGroup getSingleQuizGroup(String courseId, String quizId, String quizGroupId){
        def url = "${canvasBaseURL}/api/v1/courses/{course_id}/quizzes/{quiz_id}/groups/{quiz_group_id}"
        def params = [course_id: courseId, quiz_id: quizId, quiz_group_id: quizGroupId]
        def resp = restClient.get(url){
            auth("Bearer ${oauthToken}")
            urlVariables(params)
        }
        log.debug("ACTION=External_API DESCRIPTION=Get Single Quiz Group REQUEST_URL=${url} HTTP_STATUS=${resp.status}")
        if(resp.status == 200 && resp.json){
            return CanvasAPIParser.quizGroupFromJsonElement(resp.json)
        }
        null
    }
}
