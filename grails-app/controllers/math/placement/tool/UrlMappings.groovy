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
            group "/quizzes", {
                "/"(controller:"quiz", action:"list", method: "GET")
                "/$quizId"(controller:"quiz", action:"getOne", method: "GET")
                "/$quizId/questions"(controller:"quiz", action:"listQuestions", method: "GET")
                "/$quizId/submissions"(controller:"quiz", action:"listSubmissions", method: "GET")
            }
        }
    }
}
