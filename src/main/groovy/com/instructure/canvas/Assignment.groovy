package com.instructure.canvas

import groovy.transform.CompileStatic

@CompileStatic
class Assignment {
    // the ID of the assignment
    String id
    // the name of the assignment
    String name
    // the assignment description, in an HTML fragment
    String description
    // The time at which this assignment was originally created
    String created_at
    // The time at which this assignment was last modified in any way
    String updated_at
    // the due date for the assignment. returns null if not present. NOTE: If this
    // assignment has assignment overrides, this field will be the due date as it
    // applies to the user requesting information from the API.
    String due_at
    // the lock date (assignment is locked after this date). returns null if not
    // present. NOTE: If this assignment has assignment overrides, this field will be
    // the lock date as it applies to the user requesting information from the API.
    String lock_at
    // the unlock date (assignment is unlocked after this date) returns null if not
    // present NOTE: If this assignment has assignment overrides, this field will be
    // the unlock date as it applies to the user requesting information from the API.
    String unlock_at
    // whether this assignment has overrides
    Boolean has_overrides
    // (Optional) all dates associated with the assignment, if applicable
    def all_dates
    // the ID of the course the assignment belongs to
    String course_id
    // the URL to the assignment's web page
    String html_url
    // the URL to download all submissions as a zip
    String submissions_download_url
    // the ID of the assignment's group
    String assignment_group_id
    // Boolean flag indicating whether the assignment requires a due date based on the
    // account level setting
    Boolean due_date_required
    // Allowed file extensions, which take effect if submission_types includes
    // 'online_upload'.
    def allowed_extensions
    // An integer indicating the maximum length an assignment's name may be
    String max_name_length
    // Boolean flag indicating whether or not Turnitin has been enabled for the
    // assignment. NOTE: This flag will not appear unless your account has the Turnitin
    // plugin available
    Boolean turnitin_enabled
    // Boolean flag indicating whether or not VeriCite has been enabled for the
    // assignment. NOTE: This flag will not appear unless your account has the VeriCite
    // plugin available
    Boolean vericite_enabled
    // Settings to pass along to turnitin to control what kinds of matches should be
    // considered. originality_report_visibility can be 'immediate', 'after_grading',
    // 'after_due_date', or 'never' exclude_small_matches_type can be null, 'percent',
    // 'words' exclude_small_matches_value: - if type is null, this will be null also -
    // if type is 'percent', this will be a number between 0 and 100 representing match
    // size to exclude as a percentage of the document size. - if type is 'words', this
    // will be number > 0 representing how many words a match must contain for it to be
    // considered NOTE: This flag will not appear unless your account has the Turnitin
    // plugin available
    def turnitin_settings
    // If this is a group assignment, boolean flag indicating whether or not students
    // will be graded individually.
    Boolean grade_group_students_individually
    // (Optional) assignment's settings for external tools if submission_types include
    // 'external_tool'. Only url and new_tab are included (new_tab defaults to false).
    // Use the 'External Tools' API if you need more information about an external
    // tool.
    def external_tool_tag_attributes
    // Boolean indicating if peer reviews are required for this assignment
    Boolean peer_reviews
    // Boolean indicating peer reviews are assigned automatically. If false, the
    // teacher is expected to manually assign peer reviews.
    Boolean automatic_peer_reviews
    // Integer representing the amount of reviews each user is assigned. NOTE: This key
    // is NOT present unless you have automatic_peer_reviews set to true.
    String peer_review_count
    // String representing a date the reviews are due by. Must be a date that occurs
    // after the default due date. If blank, or date is not after the assignment's due
    // date, the assignment's due date will be used. NOTE: This key is NOT present
    // unless you have automatic_peer_reviews set to true.
    String peer_reviews_assign_at
    // Boolean representing whether or not members from within the same group on a
    // group assignment can be assigned to peer review their own group's work
    Boolean intra_group_peer_reviews
    // The ID of the assignment’s group set, if this is a group assignment. For group
    // discussions, set group_category_id on the discussion topic, not the linked
    // assignment.
    String group_category_id
    // if the requesting user has grading rights, the number of submissions that need
    // grading.
    String needs_grading_count
    // if the requesting user has grading rights and the
    // 'needs_grading_count_by_section' flag is specified, the number of submissions
    // that need grading split out by section. NOTE: This key is NOT present unless you
    // pass the 'needs_grading_count_by_section' argument as true.  ANOTHER NOTE: it's
    // possible to be enrolled in multiple sections, and if a student is setup that way
    // they will show an assignment that needs grading in multiple sections
    // (effectively the count will be duplicated between sections)
    def needs_grading_count_by_section
    // the sorting order of the assignment in the group
    String position
    // (optional, present if Sync Grades to SIS feature is enabled)
    Boolean post_to_sis
    // (optional, Third Party unique identifier for Assignment)
    String integration_id
    // (optional, Third Party integration data for assignment)
    String integration_data
    // whether the assignment is muted
    Boolean muted
    // the maximum points possible for the assignment
    String points_possible
    // the types of submissions allowed for this assignment list containing one or more
    // of the following: 'discussion_topic', 'online_quiz', 'on_paper', 'none',
    // 'external_tool', 'online_text_entry', 'online_url', 'online_upload'
    // 'media_recording'
    def submission_types
    // If true, the assignment has been submitted to by at least one student
    Boolean has_submitted_submissions
    // The type of grading the assignment receives; one of 'pass_fail', 'percent',
    // 'letter_grade', 'gpa_scale', 'points'
    String grading_type
    // The id of the grading standard being applied to this assignment. Valid if
    // grading_type is 'letter_grade' or 'gpa_scale'.
    String grading_standard_id
    // Whether the assignment is published
    Boolean published
    // Whether the assignment's 'published' state can be changed to false. Will be
    // false if there are student submissions for the assignment.
    Boolean unpublishable
    // Whether the assignment is only visible to overrides.
    Boolean only_visible_to_overrides
    // Whether or not this is locked for the user.
    Boolean locked_for_user
    // (Optional) Information for the user about the lock. Present when locked_for_user
    // is true.
    def lock_info
    // (Optional) An explanation of why this is locked for the user. Present when
    // locked_for_user is true.
    String lock_explanation
    // (Optional) id of the associated quiz (applies only when submission_types is
    // ['online_quiz'])
    String quiz_id
    // (Optional) whether anonymous submissions are accepted (applies only to quiz
    // assignments)
    Boolean anonymous_submissions
    // (Optional) the DiscussionTopic associated with the assignment, if applicable
    def discussion_topic
    // (Optional) Boolean indicating if assignment will be frozen when it is copied.
    // NOTE: This field will only be present if the AssignmentFreezer plugin is
    // available for your account.
    Boolean freeze_on_copy
    // (Optional) Boolean indicating if assignment is frozen for the calling user.
    // NOTE: This field will only be present if the AssignmentFreezer plugin is
    // available for your account.
    Boolean frozen
    // (Optional) Array of frozen attributes for the assignment. Only account
    // administrators currently have permission to change an attribute in this list.
    // Will be empty if no attributes are frozen for this assignment. Possible frozen
    // attributes are: title, description, lock_at, points_possible, grading_type,
    // submission_types, assignment_group_id, allowed_extensions, group_category_id,
    // notify_of_update, peer_reviews NOTE: This field will only be present if the
    // AssignmentFreezer plugin is available for your account.
    def frozen_attributes
    // (Optional) If 'submission' is included in the 'include' parameter, includes a
    // Submission object that represents the current user's (user who is requesting
    // information from the api) current submission for the assignment. See the
    // Submissions API for an example response. If the user does not have a submission,
    // this key will be absent.
    QuizSubmission submission
    // (Optional) If true, the rubric is directly tied to grading the assignment.
    // Otherwise, it is only advisory. Included if there is an associated rubric.
    Boolean use_rubric_for_grading
    // (Optional) An object describing the basic attributes of the rubric, including
    // the point total. Included if there is an associated rubric.
    def rubric_settings
    // (Optional) A list of scoring criteria and ratings for each rubric criterion.
    // Included if there is an associated rubric.
    def rubric
    // (Optional) If 'assignment_visibility' is included in the 'include' parameter,
    // includes an array of student IDs who can see this assignment.
    def assignment_visibility
    // (Optional) If 'overrides' is included in the 'include' parameter, includes an
    // array of assignment override objects.
    def overrides
    // (Optional) If true, the assignment will be omitted from the student's final
    // grade
    Boolean omit_from_final_grade
}
