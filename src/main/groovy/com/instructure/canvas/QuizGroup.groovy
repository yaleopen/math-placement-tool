package com.instructure.canvas

import groovy.transform.CompileStatic

@CompileStatic
class QuizGroup {
    // The ID of the question group.
    String id
    // The ID of the Quiz the question group belongs to.
    String quiz_id
    // The name of the question group.
    String name
    // The number of questions to pick from the group to display to the student.
    Integer pick_count
    // The amount of points allotted to each question in the group.
    Integer question_points
    // The ID of the Assessment question bank to pull questions from.
    String assessment_question_bank_id
    // The order in which the question group will be retrieved and displayed.
    String position
}
