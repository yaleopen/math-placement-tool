package com.instructure.canvas

import groovy.transform.CompileDynamic
import groovy.transform.CompileStatic
import org.grails.web.json.JSONElement

@CompileStatic
class CanvasAPIParser {

    @CompileDynamic
    static Quiz quizFromJsonElement(JSONElement json){
        Quiz quiz = new Quiz()
        quiz.with{
            id = json.id
            title = json.title
            quiz_type = json.quiz_type
            question_count = json.question_count
            published = json.published
            unpublishable = json.unpublishable
            assignment_id = json.assignment_id
            speed_grader_url = json.speed_grader_url
        }
        quiz
    }

    @CompileDynamic
    static QuizGroup quizGroupFromJsonElement(JSONElement json){
        QuizGroup quizGroup = new QuizGroup()
        quizGroup.with{
            id = json.id
            quiz_id = json.quiz_id
            name = json.name
            pick_count = json.pick_count
            question_points = json.question_points
            position = json.position
        }
        quizGroup
    }

    @CompileDynamic
    static QuizSubmission quizSubmissionFromJsonElement(JSONElement json){
        QuizSubmission quizSubmission = new QuizSubmission()
        quizSubmission.with{
            id = json.id
            user_id = json.user_id
            workflow_state = json.workflow_state
            submission_history = json.submission_history
        }
        quizSubmission
    }
}
