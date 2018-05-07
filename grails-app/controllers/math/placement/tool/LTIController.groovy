package math.placement.tool

import org.imsglobal.lti.launch.LtiVerificationResult
import org.imsglobal.lti.launch.LtiVerifier

class LTIController {

    @SuppressWarnings("GroovyAssignabilityCheck")
    def launch() {
        // Log incoming request
        log.debug("Request URL: " + request.getRequestURL().toString())
        log.debug("Query String: " + request.getQueryString())
        log.debug("HTTP Method: " + request.getMethod())
        for(header in request.getHeaderNames()){
            log.debug("${header}:${request.getHeader(header)}")
        }
        for(param in request.getParameterMap()){
            log.debug("${param.key}:${param.value}")
        }

        // Authenticate initial LTI Request and store request params
        if(request.getParameter("oauth_consumer_key") != null){
            LtiVerifier ltiVerifier = new LtiOauthVerifierSSL()
            def ltiSecret = grailsApplication.config.getProperty('canvas.ltiSecret')
            LtiVerificationResult ltiResult = ltiVerifier.verify(request, ltiSecret)
            if(ltiResult.success){
                //find user's role
                def roles = params.custom_membership_roles as String
                def roleList = roles.split(',')
                def role = 'unauthorized'
                if(roleList.contains('Instructor') || roleList.contains('Sandbox Instructor')){
                    role = 'instructor'
                }
                else if(roleList.contains('StudentEnrollment')){
                    role = 'student'
                }

                //set session variables
                session["userId"] = params.custom_canvas_user_id
                session["courseId"] = params.custom_canvas_course_id
                session["userRole"] = role
                session["isCoursePublished"] = params.custom_canvas_workflow_state == 'available'
                render(view: "/index")
            }
            else{
                log.error("LTI Result not SUCCESS: " + ltiResult.getMessage())
                respond ltiResult
            }
        }
    }
}
