package math.placement.tool

class QuizController {

    static responseFormats = ['json', 'html']

    def quizService

    def list(){
        def quizzes = quizService.listQuizzesInCourse(params.courseId as String)
        if(quizzes){
            respond quizzes
        }
        else{
            respond([errorMessage: "Error Retrieving Quizzes"], status: 500)
        }
    }

    def getOne(){
        def quiz = quizService.getSingleQuiz(params.courseId as String, params.quizId as String)
        if(quiz){
            respond quiz
        }
        else{
            respond([errorMessage: "Error Retrieving Quiz"], status: 500)
        }
    }
}
