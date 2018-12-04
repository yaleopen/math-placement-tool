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
            "/submission"(controller:"quiz", action:"listPlacementDataForUser", method: "GET")
            "/rubrics"(controller:"rubric", action:"listForCourse", method: "GET")
            group "/quizzes", {
                "/"(controller:"quiz", action:"list", method: "GET")
                group "/$quizId", {
                    "/"(controller:"quiz", action:"getOne", method: "GET")
                    "/questions"(controller:"quiz", action:"listQuestions", method: "GET")
                    "/submissions"(controller:"quiz", action:"listSubmissions", method: "GET")
                    "/publish"(controller:"quiz", action:"publishQuiz", method: "PUT")
                    group "/rubrics", {
                        "/"(controller:"rubric", action:"list", method: "GET")
                        "/"(controller:"rubric", action:"create", method: "POST")
                        "/order"(controller:"rubric", action:"reorder", method: "PUT")
                        group "/$rubricId", {
                            "/"(controller:"rubric", action:"update", method: "PUT")
                            "/default"(controller:"rubric", action:"makeDefault", method: "PUT")
                            "/clone"(controller:"rubric", action:"clone", method: "PUT")
                            "/"(controller:"rubric", action:"delete", method: "DELETE")
                            "/equations/order"(controller:"rubric", action:"reorderEquations", method: "PUT")
                        }
                    }
                }
            }
        }
    }
}
