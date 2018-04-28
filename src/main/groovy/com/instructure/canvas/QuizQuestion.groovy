package com.instructure.canvas

import groovy.transform.CompileStatic

@CompileStatic
class QuizQuestion {
    String id
    String quiz_id
    String position
    String question_name
    String question_type
    String question_text
    String points_possible
    String correct_comments
    String incorrect_comments
    String neutral_comments
    List<Answer> answers
}
