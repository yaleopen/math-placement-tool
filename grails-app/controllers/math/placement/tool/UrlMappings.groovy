package math.placement.tool

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(view: '/index')

        group "/courses/$courseId", {
            "/students"(controller:"course", action:"listStudents", method: "GET")
            group "/quizzes", {
                "/"(controller:"quiz", action:"list", method: "GET")
                group "/$quizId", {
                    "/"(controller:"quiz", action:"getOne", method: "GET")
                    "/questions"(controller:"quiz", action:"listQuestions", method: "GET")
                    "/submissions"(controller:"quiz", action:"listSubmissions", method: "GET")
                    group "/rubrics", {
                        "/"(controller:"rubric", action:"list", method: "GET")
                        "/"(controller:"rubric", action:"create", method: "POST")
                        group "/$rubricId", {
                            "/"(controller:"rubric", action:"update", method: "PUT")
                            "/"(controller:"rubric", action:"delete", method: "DELETE")
                        }
                    }
                }
            }
        }
    }
}
