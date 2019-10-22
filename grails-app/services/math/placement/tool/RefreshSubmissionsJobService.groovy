package math.placement.tool

import grails.gorm.transactions.Transactional
import groovy.util.logging.Slf4j
import org.springframework.beans.factory.annotation.Value
import org.springframework.scheduling.annotation.Scheduled

import java.text.SimpleDateFormat

@Slf4j
@Transactional
class RefreshSubmissionsJobService {

    boolean lazyInit = false

    def quizService
    def quizQuestionService
    def quizSubmissionService
    def submissionService

    @Value('${canvas.placementCourseId}')
    String courseId

    @Scheduled(fixedDelay = 600000L)
    void refreshSubmissions() {
        log.info "START: Refreshing Submissions"
        def quizzes = quizService.listQuizzesInCourse(courseId)
        quizzes.retainAll{it.published}
        quizzes.each { quiz ->
            def quizSubmissions = quizSubmissionService.listQuizSubmissions(courseId, quiz.id as String)
            def submissions = submissionService.listAssignmentSubmissions(courseId, quiz.assignment_id as String)
            def userPlacementData = PlacementData.findAllByQuizId(quiz.id as String)
            if (quizSubmissions != null) {
                //only check complete submissions
                quizSubmissions.retainAll {
                    def userId = it.user_id as String
                    it.workflow_state == 'complete' && (!userPlacementData.userId.contains(userId) || (userPlacementData.userId.contains(userId) && !userPlacementData.find{it.userId == userId}.finishedAt))
                }
                def submissionDataList = submissions.collect { it.submission_history[0] }
                def quizQuestions = quizQuestionService.listQuizQuestions(courseId, quiz.id as String)
                //workaround for canvas api bug returning wrong dataset
                def allSubmissionQuestionIds = submissionDataList.submission_data.question_id.flatten().unique()
                allSubmissionQuestionIds.removeAll { quizQuestions.id.unique().contains(it) }
                allSubmissionQuestionIds.each { missingQuestionId ->
                    def missingQuestion = quizQuestionService.getSingleQuizQuestion(courseId, quiz.id as String, missingQuestionId as String)
                    quizQuestions.add(missingQuestion)
                }
                quizSubmissions.each { quizSubmission ->
                    def submissionData = submissionDataList.find { it.id == quizSubmission.id }.submission_data
                    def placementData = [:]
                    submissionData.each { submissionItem ->
                        //check if group question
                        def question = quizQuestions.find { it.id as String == submissionItem.question_id as String }
                        if (question.quiz_group_id) {
                            def existingData = placementData["question_group_${question.quiz_group_id}"]
                            placementData["question_group_${question.quiz_group_id}"] = existingData ? ((existingData as Integer) + submissionItem.points) as String : submissionItem.points as String
                        } else {
                            placementData["question_${question.id}_answer"] = "answer_" + submissionItem.answer_id
                            placementData["question_${question.id}_points"] = submissionItem.points as String
                        }
                    }
                    if(userPlacementData.userId.contains(quizSubmission.user_id as String)){
                        def pdToUpdate = userPlacementData.find{it.userId == quizSubmission.user_id as String}
                        pdToUpdate.finishedAt = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'").parse(quizSubmission.finished_at)
                        pdToUpdate.save(flush: true, failOnError: true)
                    }
                    else {
                        def savedPlacementData = new PlacementData(userId: quizSubmission.user_id, quizId: quiz.id as String, finishedAt: new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'").parse(quizSubmission.finished_at), userPlacements: placementData).save(flush: true, failOnError: true)
                    }
                }
            }
        }
        log.info "END: Refreshing Submissions"
    }
}
