package com.instructure.canvas

import groovy.transform.CompileDynamic
import groovy.transform.CompileStatic
import org.grails.web.json.JSONElement

@CompileStatic
class QuizParser {

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
            speedgrader_url = json.speedgrader_url
        }
        quiz
    }
}
