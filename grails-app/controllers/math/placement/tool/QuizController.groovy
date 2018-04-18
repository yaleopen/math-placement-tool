package math.placement.tool

class QuizController {

    static responseFormats = ['json', 'html']

    def quizService
    def quizQuestionService
    def quizSubmissionService

    def list(){
        def quizzes = quizService.listQuizzesInCourse(params.courseId as String)
        if(quizzes != null){
            respond quizzes
        }
        else{
            respond([errorMessage: "Error Retrieving Quizzes"], status: 500)
        }
    }

    def getOne(){
        def quiz = quizService.getSingleQuiz(params.courseId as String, params.quizId as String)
        if(quiz != null){
            respond quiz
        }
        else{
            respond([errorMessage: "Error Retrieving Quiz"], status: 500)
        }
    }

    def listQuestions(){
        def quizQuestions = quizQuestionService.listQuizQuestions(params.courseId as String, params.quizId as String)
        if(quizQuestions != null){
            respond quizQuestions
        }
        else{
            respond([errorMessage: "Error Retrieving Quiz Questions"], status: 500)
        }
    }

    def listSubmissions(){
        def quizSubmissions = quizSubmissionService.listQuizSubmissions(params.courseId as String, params.quizId as String)
        if(quizSubmissions != null){
            respond quizSubmissions
        }
        else{
            respond([errorMessage: "Error Retrieving Quiz Submissions"], status: 500)
        }
    }


}
