package com.instructure.canvas

import grails.gorm.transactions.Transactional
import org.grails.web.json.JSONArray

@Transactional
class SubmissionService extends CanvasAPIBaseService {

    List<QuizSubmission> listAssignmentSubmissions(String courseId, String assignmentId) {
        def url = "${canvasBaseURL}/api/v1/courses/{course_id}/assignments/{assignment_id}/submissions?per_page={per_page_limit}&include[]=submission_history"
        def params = [course_id: courseId, assignment_id: assignmentId, per_page_limit: perPageLimit]
        def resp = restClient.get(url){
            auth("Bearer ${oauthToken}")
            urlVariables(params)
        }
        log.debug("ACTION=External_API DESCRIPTION=List Submissions REQUEST_URL=${url} HTTP_STATUS=${resp.status}")
        if(resp.status == 200 && resp.json){
            JSONArray respArr = (JSONArray) resp.json
            List<QuizSubmission> resultList = new ArrayList<QuizSubmission>(respArr)
            processResponsePages(resp,resultList)
            return resultList
        }
        null
    }
}