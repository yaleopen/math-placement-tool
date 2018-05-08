package math.placement.tool

import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import math.placement.tool.client.ClientRubricWrapper

class RubricController {

    static responseFormats = ['json', 'html']

    def list() {
        respond listRubrics(params.courseId as String, params.quizId as String)
    }

    def listForCourse() {
        def jsonSlurper = new JsonSlurper()
        def rubrics = Rubric.findAllByCourseId(params.courseId as String)
        def collectedRubrics = rubrics.collect{rubric ->
            def equations = rubric.equations.collect{equation ->
                [id: equation.id, rule: jsonSlurper.parseText(equation.rule)]
            }
            [id: rubric.id, quizId: rubric.quizId, courseId: rubric.courseId,
             title: rubric.title, placement: rubric.placement, feedback: rubric.feedback,
             equationJoinType: rubric.equationJoinType, equations: equations]
        }
        respond collectedRubrics.groupBy {rubric -> rubric.quizId}
    }

    def create(ClientRubricWrapper createRubricRq) {
        def rubric = new Rubric()
        rubric.with{
            quizId = params.quizId
            courseId = params.courseId
            title = createRubricRq.rubric.title
            placement = createRubricRq.rubric.placement
            feedback = createRubricRq.rubric.feedback
            equationJoinType = createRubricRq.rubric.equationJoinType
        }
        createRubricRq.rubric.newEquations.each{rule ->
            rubric.addToEquations(new Equation(rule: rule))
        }
        def createdRubric = rubric.save(flush: true)
        respond listRubrics(createdRubric.courseId, createdRubric.quizId)
    }

    def update(ClientRubricWrapper updateRubricRq) {
        def jsonSlurper = new JsonSlurper()
        def rubric = Rubric.get(updateRubricRq.rubric.id as Integer)
        def rubricEquationsToDelete = rubric.equations.id
        rubric.with{
            title = updateRubricRq.rubric.title
            placement = updateRubricRq.rubric.placement
            feedback = updateRubricRq.rubric.feedback
            equationJoinType = updateRubricRq.rubric.equationJoinType
        }
        updateRubricRq.rubric.newEquations.each{rule ->
            rubric.addToEquations(new Equation(rule: rule))
        }
        updateRubricRq.rubric.existingEquations.each{equation->
            def parsedEquation = jsonSlurper.parseText(equation)
            rubricEquationsToDelete.removeAll{it == parsedEquation.id as Integer}
            def equationToUpdate = Equation.get(parsedEquation.id as Integer)
            equationToUpdate.rule = JsonOutput.toJson(parsedEquation.rule)
            equationToUpdate.save(flush: true)
        }
        //delete equations
        rubricEquationsToDelete.each{id->
            def equation = Equation.get(id)
            rubric.removeFromEquations(equation)
            equation.delete()
        }
        def savedRubric = rubric.save(flush:true)
        respond listRubrics(savedRubric.courseId, savedRubric.quizId)
    }

    def delete() {
        def rubric = Rubric.get(params.rubricId as Integer)
        rubric.delete(flush:true)
        respond listRubrics(rubric.courseId, rubric.quizId)
    }

    private static def listRubrics(courseId, quizId){
        def jsonSlurper = new JsonSlurper()
        def rubrics = Rubric.findAllByCourseIdAndQuizId(courseId, quizId)
        return rubrics.collect{rubric ->
            def equations = rubric.equations.collect{equation ->
                [id: equation.id, rule: jsonSlurper.parseText(equation.rule)]
            }
            [id: rubric.id, quizId: rubric.quizId, courseId: rubric.courseId,
             title: rubric.title, placement: rubric.placement, feedback: rubric.feedback,
             equationJoinType: rubric.equationJoinType, equations: equations]
        }
    }
}
