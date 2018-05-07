package com.instructure.canvas

import grails.gorm.transactions.Transactional
import org.grails.web.json.JSONArray

@Transactional
class CourseService extends CanvasAPIBaseService {

    List<User> listStudentsInCourse(String courseId){
        def url = "${canvasBaseURL}/api/v1/courses/{course_id}/users?enrollment_type[]=student_view&enrollment_type[]=student"
        def params = [course_id: courseId, per_page_limit: perPageLimit]
        def resp = restClient.get(url){
            auth("Bearer ${oauthToken}")
            urlVariables(params)
        }
        log.debug("ACTION=External_API DESCRIPTION=List Users In Course REQUEST_URL=${url} HTTP_STATUS=${resp.status}")
        if(resp.status == 200 && resp.json){
            JSONArray respArr = (JSONArray) resp.json
            List<User> resultList = new ArrayList<User>(respArr)
            processResponsePages(resp,resultList)
            return resultList
        }
        null
    }
}
