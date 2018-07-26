package com.instructure.canvas

import grails.gorm.transactions.Transactional
import org.grails.web.json.JSONArray

@Transactional
class SubmissionService extends CanvasAPIBaseService {

    List<QuizSubmission> listAssignmentSubmissions(String courseId, String assignmentId) {
        def url = "${canvasBaseURL}/api/v1/courses/{course_id}/assignments/{assignment_id}/submissions?per_page={per_page_limit}&include[]=submission_history"
        def params = [course_id: courseId, assignment_id: assignmentId, per_page_limit: perPageLimit]
        def start = System.currentTimeMillis()
        def resp = restClient.get(url){
            auth("Bearer ${oauthToken}")
            urlVariables(params)
        }
        log.debug("ACTION=External_API DESCRIPTION=List Submissions REQUEST_URL=${url} HTTP_STATUS=${resp.status} RESP_TIME=${System.currentTimeMillis() - start}")
        if(resp.status == 200 && resp.json){
            JSONArray respArr = (JSONArray) resp.json
            List<QuizSubmission> resultList = new ArrayList<QuizSubmission>(respArr)
            processResponsePages(resp,resultList)
            return resultList
        }
        null
    }

    QuizSubmission getSingleSubmission(String courseId, String assignmentId, String userId) {
        def url = "${canvasBaseURL}/api/v1/courses/{course_id}/assignments/{assignment_id}/submissions/{user_id}?include[]=submission_history"
        def params = [course_id: courseId, assignment_id: assignmentId, user_id: userId]
        def start = System.currentTimeMillis()
        def resp = restClient.get(url){
            auth("Bearer ${oauthToken}")
            urlVariables(params)
        }
        log.debug("ACTION=External_API DESCRIPTION=Get Single Submission REQUEST_URL=${url} HTTP_STATUS=${resp.status} RESP_TIME=${System.currentTimeMillis() - start}")
        if(resp.status == 200 && resp.json){
            return CanvasAPIParser.quizSubmissionFromJsonElement(resp.json)
        }
        null
    }
}