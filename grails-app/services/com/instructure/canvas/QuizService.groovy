package com.instructure.canvas

import grails.converters.JSON
import grails.gorm.transactions.Transactional
import org.grails.web.json.JSONArray

@Transactional
class QuizService extends CanvasAPIBaseService{

    List<Quiz> listQuizzesInCourse(String courseId){
        def url = "${canvasBaseURL}/api/v1/courses/{course_id}/quizzes?per_page={per_page_limit}"
        def params = [course_id: courseId, per_page_limit: perPageLimit]
        def resp = restClient.get(url){
            auth("Bearer ${oauthToken}")
            urlVariables(params)
        }
        log.debug("ACTION=External_API DESCRIPTION=List Quizzes In Course REQUEST_URL=${url} HTTP_STATUS=${resp.status}")
        if(resp.status == 200 && resp.json){
            JSONArray respArr = (JSONArray) resp.json
            List<Quiz> resultList = new ArrayList<Quiz>(respArr)
            processResponsePages(resp,resultList)
            return resultList
        }
        null
    }

    Quiz getSingleQuiz(String courseId, String quizId){
        def url = "${canvasBaseURL}/api/v1/courses/{course_id}/quizzes/{quiz_id}"
        def params = [course_id: courseId, quiz_id: quizId]
        def resp = restClient.get(url){
            auth("Bearer ${oauthToken}")
            urlVariables(params)
        }
        log.debug("ACTION=External_API DESCRIPTION=Get Single Quiz REQUEST_URL=${url} HTTP_STATUS=${resp.status}")
        if(resp.status == 200 && resp.json){
            return CanvasAPIParser.quizFromJsonElement(resp.json)
        }
        null
    }

    List<Assignment> listQuizAssignmentsForUser(String courseId, String userId){
        def url = "${canvasBaseURL}/api/v1/courses/{course_id}/assignments?include[]=submission&per_page={per_page_limit}&as_user_id={user_id}"
        def params = [course_id: courseId, user_id: userId, per_page_limit: perPageLimit]
        def resp = restClient.get(url){
            auth("Bearer ${oauthToken}")
            urlVariables(params)
        }
        log.debug("ACTION=External_API DESCRIPTION=List Quiz Assignments For User REQUEST_URL=${url} HTTP_STATUS=${resp.status}")
        if(resp.status == 200 && resp.json){
            JSONArray respArr = (JSONArray) resp.json
            List<Assignment> resultList = new ArrayList<Assignment>(respArr)
            processResponsePages(resp,resultList)
            resultList.removeAll{it.quiz_id == null}
            return resultList
        }
        null
    }

    Quiz publishQuiz(String courseId, String quizId, Boolean publish){
        def url = "${canvasBaseURL}/api/v1/courses/{course_id}/quizzes/{quiz_id}"
        def params = [course_id: courseId, quiz_id: quizId]
        def rqBody = [quiz:[published:publish]]
        def resp = restClient.put(url){
            auth("Bearer ${oauthToken}")
            urlVariables(params)
            contentType('application/json')
            body(rqBody as JSON)
        }
        log.debug("ACTION=External_API DESCRIPTION=Update Quiz REQUEST_URL=${url} HTTP_STATUS=${resp.status}")
        if(resp.status == 200 && resp.json){
            return CanvasAPIParser.quizFromJsonElement(resp.json)
        }
        null
    }

}
