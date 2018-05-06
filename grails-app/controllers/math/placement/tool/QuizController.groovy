package math.placement.tool

class QuizController {

    static responseFormats = ['json', 'html']

    def quizService
    def quizQuestionService
    def quizSubmissionService
    def quizQuestionGroupService

    def list(){
        def quizzes = quizService.listQuizzesInCourse(params.courseId as String)
        if(quizzes != null){
            quizzes.each{quiz->
                def quizSubmissions = quizSubmissionService.listQuizSubmissions(params.courseId as String, quiz.id as String)
                quiz.submission_count = quizSubmissions.user_id.unique().size()
            }
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
        //find group questions
        def quizGroupIds = quizQuestions.quiz_group_id.unique()
        quizGroupIds.removeAll{it == null}
        def quizGroups = quizGroupIds.collect{quizGroupId ->
            quizQuestionGroupService.getSingleQuizGroup(params.courseId as String, params.quizId as String, quizGroupId as String)
        }
        //remove group questions
        quizQuestions.removeAll{it.quiz_group_id != null}
        if(quizQuestions != null){
            respond([singles: quizQuestions, groups: quizGroups])
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
