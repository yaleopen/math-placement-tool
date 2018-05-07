package com.instructure.canvas

import groovy.transform.CompileStatic

@CompileStatic
class QuizSubmission {

    // The ID of the quiz submission.
    String id
    // The ID of the Quiz the quiz submission belongs to.
    String quiz_id
    // The ID of the Student that made the quiz submission.
    String user_id
    // The ID of the Submission the quiz submission represents.
    String submission_id
    // The time at which the student started the quiz submission.
    String started_at
    // The time at which the student submitted the quiz submission.
    String finished_at
    // The time at which the quiz submission will be overdue, and be flagged as a late
    // submission.
    String end_at
    // For quizzes that allow multiple attempts, this field specifies the quiz
    // submission attempt number.
    String attempt
    // Number of times the student was allowed to re-take the quiz over the
    // multiple-attempt limit.
    String extra_attempts
    // Amount of extra time allowed for the quiz submission, in minutes.
    String extra_time
    // The student can take the quiz even if it's locked for everyone else
    Boolean manually_unlocked
    // Amount of time spent, in seconds.
    String time_spent
    // The score of the quiz submission, if graded.
    String score
    // The original score of the quiz submission prior to any re-grading.
    String score_before_regrade
    // For quizzes that allow multiple attempts, this is the score that will be used,
    // which might be the score of the latest, or the highest, quiz submission.
    String kept_score
    // Number of points the quiz submission's score was fudged by.
    String fudge_points
    // Whether the student has viewed their results to the quiz.
    Boolean has_seen_results
    // The current state of the quiz submission. Possible values:
    // ['untaken'|'pending_review'|'complete'|'settings_only'|'preview'].
    String workflow_state
    // Indicates whether the quiz submission is overdue and needs submission
    Boolean overdue_and_needs_submission
    List<QuizQuestion> questions
    List<SubmissionData> submission_data
    List<QuizSubmission> submission_history
    def placement_data
    String quiz_name
}
