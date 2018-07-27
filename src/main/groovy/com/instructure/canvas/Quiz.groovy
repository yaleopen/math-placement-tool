package com.instructure.canvas

import groovy.transform.CompileStatic

@CompileStatic
class Quiz {
    String id
    String title
    String html_url
    String mobile_url
    String preview_url
    String description
    String quiz_type
    String assignment_group_id
    String time_limit
    Boolean shuffle_answers
    String hide_results
    Boolean show_correct_answers
    Boolean show_correct_answers_last_attempt
    String show_correct_answers_at
    String hide_correct_answers_at
    Boolean one_time_results
    String scoring_policy
    String allowed_attempts
    Boolean one_question_at_a_time
    String question_count
    String points_possible
    Boolean cant_go_back
    String access_code
    String ip_filter
    String due_at
    String lock_at
    String unlock_at
    Boolean published
    Boolean unpublishable
    Boolean locked_for_user
    def lock_info
    String lock_explanation
    String speed_grader_url
    String quiz_extensions_url
    def permissions
    def all_dates
    String version_number
    List<String> question_types
    Boolean anonymous_submissions
    Integer submission_count
    List<String> complete_userids
    String assignment_id
}
