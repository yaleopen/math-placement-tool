package math.placement.tool

class QuizController {

    static responseFormats = ['json', 'html']

    def quizService
    def quizQuestionService
    def quizSubmissionService
    def quizQuestionGroupService
    def quizSubmissionQuestionService
    def submissionService

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
        quizQuestions = quizQuestions ? quizQuestions : []
        //find group questions
        def quizGroupIds = quizQuestions.quiz_group_id ? quizQuestions.quiz_group_id.unique() : []
        quizGroupIds.removeAll{it == null}
        def quizGroups = quizGroupIds.collect{quizGroupId ->
            quizQuestionGroupService.getSingleQuizGroup(params.courseId as String, params.quizId as String, quizGroupId as String)
        }
        //remove group questions
        quizQuestions.removeAll{it.quiz_group_id != null}
        if(quizQuestions != null){
            respond([singles: quizQuestions.sort{it.question_name}, groups: quizGroups.sort{it.name}])
        }
        else{
            respond([errorMessage: "Error Retrieving Quiz Questions"], status: 500)
        }
    }

    def listSubmissions(){
        def quiz = quizService.getSingleQuiz(params.courseId as String, params.quizId as String)
        def quizSubmissions = quizSubmissionService.listQuizSubmissions(params.courseId as String, params.quizId as String)
        def submissions = submissionService.listAssignmentSubmissions(params.courseId as String, quiz.assignment_id)
        if(quizSubmissions != null){
            def submissionDataList = submissions.collect{it.submission_history[0]}
            quizSubmissions.each{quizSubmission->
                def quizSubmissionQuestions = quizSubmissionQuestionService.listQuizSubmissionQuestions(quizSubmission.id as String)
                quizSubmission.questions = quizSubmissionQuestions
                quizSubmission.submission_data = submissionDataList.find{it.id == quizSubmission.id}.submission_data
                def placementData = [:]
                quizSubmission.submission_data.each{submissionItem->
                    //check if group question
                    def question = quizSubmission.questions.find{it.id == submissionItem.question_id}
                    if(question.quiz_group_id){
                        def existingData = placementData["question_group_${question.quiz_group_id}"]
                        placementData["question_group_${question.quiz_group_id}"] =  existingData ? existingData + submissionItem.points : submissionItem.points
                    }
                    else{
                        placementData["question_${question.id}"] = [answer: "answer_${submissionItem.answer_id}", points: submissionItem.points]
                    }
                }
                quizSubmission.placement_data = placementData
            }
            respond quizSubmissions
        }
        else{
            respond([errorMessage: "Error Retrieving Quiz Submissions"], status: 500)
        }
    }

    def listPlacementDataForUser(){
        def assignments = quizService.listQuizAssignmentsForUser(params.courseId as String, params.userId as String)
        if(assignments != null){
            def result = [:]
            assignments.each{assignment->
                def quizSubmission = assignment.submission
                if(quizSubmission && quizSubmission.workflow_state != 'unsubmitted'){
                    def submissions = submissionService.listAssignmentSubmissions(params.courseId as String, assignment.id as String)
                    def submissionHistory = submissions.find{it.id == quizSubmission.id}.submission_history[0]
                    def quizSubmissionQuestions = quizSubmissionQuestionService.listQuizSubmissionQuestions(submissionHistory.id as String)
                    quizSubmission.questions = quizSubmissionQuestions
                    quizSubmission.submission_data = submissionHistory.submission_data
                    def placementData = [:]
                    quizSubmission.submission_data.each{submissionItem->
                        //check if group question
                        def question = quizSubmission.questions.find{it.id == submissionItem.question_id}
                        if(question == null){
                            return
                        }
                        if(question.quiz_group_id){
                            def existingData = placementData["question_group_${question.quiz_group_id}"]
                            placementData["question_group_${question.quiz_group_id}"] =  existingData ? existingData + submissionItem.points : submissionItem.points
                        }
                        else{
                            placementData["question_${question.id}"] = [answer: "answer_${submissionItem.answer_id}", points: submissionItem.points]
                        }
                    }
                    quizSubmission.placement_data = placementData
                }
                quizSubmission.quiz_name = assignment.name
                result.put(assignment.quiz_id, quizSubmission)
            }
            respond result
        }
        else{
            respond([errorMessage: "Error Retrieving Student Submissions"], status: 500)
        }
    }

    def publishQuiz(){
        def rqJson = request.JSON
        def quiz = quizService.publishQuiz(params.courseId as String, params.quizId as String, rqJson.publish as Boolean)
        if(quiz != null){
            respond quiz
        }
        else{
            respond([errorMessage: "Error Updating Quiz"], status: 500)
        }
    }
}
