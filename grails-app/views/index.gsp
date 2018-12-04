<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Math Placement Tool</title>
    </head>

    <body>
        <div id="root"></div>
        <g:javascript>
            sessionStorage.courseId = ${session.courseId};
            sessionStorage.userRole = '${session.userRole}';
            sessionStorage.isCoursePublished = ${session.isCoursePublished};
        </g:javascript>
        <asset:javascript src="bundle.js"/>
    </body>
</html>
