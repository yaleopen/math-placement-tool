# Math Placement Exam for Canvas
Manages math placement rubrics, calculates placement scores, displays info to student/instructors

## Dev Setup
1. Install [Grails 3.3.4](https://grails.org/download.html#sdkman)

2. Create environment variables for `application.yml` properties
    ```yaml
    canvas:
        oauthToken: '${CANVAS_API_TOKEN}'
        canvasBaseUrl: '${CANVAS_BASE_URL}'
        ltiSecret: '${MATH_PLACEMENT_SECRET}'
    
    environments:
        development:
            dataSources:
                dataSource:
                    username: '${DB_USERNAME}'
                    password: '${DB_PASSWORD}'
    ```
    
3. Build & Run: `grails run-app`

4. Install LTI in Canvas via XML Config
    ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <cartridge_basiclti_link xmlns="http://www.imsglobal.org/xsd/
   imslticc_v1p0"
       xmlns:blti = "http://www.imsglobal.org/xsd/imsbasiclti_v1p0"
       xmlns:lticm ="http://www.imsglobal.org/xsd/imslticm_v1p0"
       xmlns:lticp ="http://www.imsglobal.org/xsd/imslticp_v1p0"
       xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation = "http://www.imsglobal.org/xsd/imslticc_v1p0
   http://www.imsglobal.org/xsd/lti/ltiv1p0/imslticc_v1p0.xsd
       http://www.imsglobal.org/xsd/imsbasiclti_v1p0 http://
   www.imsglobal.org/xsd/lti/ltiv1p0/imsbasiclti_v1p0.xsd
       http://www.imsglobal.org/xsd/imslticm_v1p0 http://
   www.imsglobal.org/xsd/lti/ltiv1p0/imslticm_v1p0.xsd
       http://www.imsglobal.org/xsd/imslticp_v1p0 http://
   www.imsglobal.org/xsd/lti/ltiv1p0/imslticp_v1p0.xsd">
       <blti:launch_url>https://<HOST>:8080/mathplacement/LTI/launch</blti:launch_url>
       <blti:title>Math Placement Tool</blti:title>
       <blti:description>Tool for calculating math placement scores</blti:description>
       <blti:extensions platform="canvas.instructure.com">
         <lticm:property name="privacy_level">public</lticm:property>
         <lticm:options name="course_navigation">
           <lticm:property name="default">enabled</lticm:property>
           <lticm:property name="enabled">true</lticm:property>
           <lticm:options name="custom_fields">
               <lticm:property name="membership_roles">$Canvas.membership.roles</lticm:property>
           </lticm:options>
         </lticm:options>
       </blti:extensions>
   </cartridge_basiclti_link>
    ```



