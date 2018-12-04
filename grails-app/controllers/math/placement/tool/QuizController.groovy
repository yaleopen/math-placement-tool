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
                quiz.submission_count = quizSubmissions.findAll{it.workflow_state == 'complete'}.user_id.unique().size()
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
            //only check complete submissions
            quizSubmissions.retainAll{it.workflow_state == 'complete'}
            def submissionDataList = submissions.collect{it.submission_history[0]}
            def quizQuestions = quizQuestionService.listQuizQuestions(params.courseId as String, params.quizId as String)
            //workaround for canvas api bug returning wrong dataset
            def allSubmissionQuestionIds = submissionDataList.submission_data.question_id.flatten().unique()
            allSubmissionQuestionIds.removeAll{quizQuestions.id.unique().contains(it)}
            allSubmissionQuestionIds.each{missingQuestionId ->
                def missingQuestion = quizQuestionService.getSingleQuizQuestion(params.courseId as String, params.quizId as String, missingQuestionId as String)
                quizQuestions.add(missingQuestion)
            }
            final def result = quizSubmissions.collect {quizSubmission ->
                def submissionData = submissionDataList.find{it.id == quizSubmission.id}.submission_data
                def placementData = [:]
                submissionData.each { submissionItem ->
                    //check if group question
                    def question = quizQuestions.find { it.id as String == submissionItem.question_id as String }
                    if (question.quiz_group_id) {
                        def existingData = placementData["question_group_${question.quiz_group_id}"]
                        placementData["question_group_${question.quiz_group_id}"] = existingData ? existingData + submissionItem.points : submissionItem.points
                    } else {
                        placementData["question_${question.id}"] = [answer: "answer_${submissionItem.answer_id}", points: submissionItem.points]
                    }
                }
                quizSubmission.placement_data = placementData
                quizSubmission
            }
            respond result

        }
        else{
            respond([errorMessage: "Error Retrieving Quiz Submissions"], status: 500)
        }
    }

    def listPlacementDataForUser(){
        def assignments = quizService.listQuizAssignmentsForUser(params.courseId as String, session.userId as String)
        if(assignments != null){
            def result = [:]
            assignments.each{assignment->
                def quizSubmission = assignment.submission
                if(quizSubmission && quizSubmission.workflow_state != 'unsubmitted'){
                    def submission = submissionService.getSingleSubmission(params.courseId as String, assignment.id as String, session.userId as String)
                    def submissionHistory = submission.submission_history[0]
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
