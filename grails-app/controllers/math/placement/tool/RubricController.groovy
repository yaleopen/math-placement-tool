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
                [id: equation.id, rule: jsonSlurper.parseText(equation.rule), priority: equation.priority]
            }
            [id: rubric.id, quizId: rubric.quizId, courseId: rubric.courseId,
             title: rubric.title, placement: rubric.placement, feedback: rubric.feedback,
             equationJoinType: rubric.equationJoinType, equations: equations, isDefault: rubric.isDefault]
        }
        respond collectedRubrics.groupBy {rubric -> rubric.quizId}
    }

    def create(ClientRubricWrapper createRubricRq) {
        def rubric = new Rubric()
        def isFirstRubric = Rubric.findAllByCourseIdAndQuizId(params.courseId as String, params.quizId as String).isEmpty()
        rubric.with{
            quizId = params.quizId
            courseId = params.courseId
            title = createRubricRq.rubric.title
            placement = createRubricRq.rubric.placement
            feedback = createRubricRq.rubric.feedback
            equationJoinType = createRubricRq.rubric.equationJoinType
            isDefault = isFirstRubric
            priority = createRubricRq.rubric.priority
        }
        createRubricRq.rubric.newEquations.eachWithIndex{rule, index ->
            rubric.addToEquations(new Equation(rule: rule, priority: index))
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
        updateRubricRq.rubric.newEquations.eachWithIndex{rule, index ->
            rubric.addToEquations(new Equation(rule: rule, priority: updateRubricRq.rubric.existingEquations.size() + index))
        }
        updateRubricRq.rubric.existingEquations.each{equation->
            def parsedEquation = jsonSlurper.parseText(equation)
            rubricEquationsToDelete.removeAll{it == parsedEquation.id as Integer}
            def equationToUpdate = Equation.get(parsedEquation.id as Integer)
            equationToUpdate.rule = JsonOutput.toJson(parsedEquation.rule)
            equationToUpdate.priority = parsedEquation.priority as Integer
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
        def rubricsForPriorityChange = Rubric.findAllByCourseIdAndQuizIdAndPriorityGreaterThan(rubric.courseId,rubric.quizId,rubric.priority)
        rubricsForPriorityChange.each{rubricToUpdate ->
            rubricToUpdate.priority = rubricToUpdate.priority - 1
            rubricToUpdate.save(flush:true)
        }
        rubric.delete(flush:true)
        respond listRubrics(rubric.courseId, rubric.quizId)
    }

    def makeDefault() {
        def rubric = Rubric.get(params.rubricId as Integer)
        def existingDefault = Rubric.findByCourseIdAndQuizIdAndIsDefault(rubric.courseId, rubric.quizId, true)
        if(existingDefault){
            existingDefault.isDefault = false
            existingDefault.save(flush:true)
        }
        rubric.isDefault = true
        rubric.save(flush:true)
        respond listRubrics(rubric.courseId, rubric.quizId)
    }

    def reorder() {
        def rqJson = request.JSON
        String courseId = params.courseId
        String quizId = params.quizId
        def droppedIndex = rqJson.rubricAPriority as Integer
        def originalIndex = rqJson.rubricBPriority as Integer
        def rubricToMove = Rubric.findByCourseIdAndQuizIdAndPriority(courseId, quizId, originalIndex)
        rubricToMove.priority = droppedIndex

        if(originalIndex > droppedIndex){
            def rubricsToShift = Rubric.findAllByCourseIdAndQuizIdAndPriorityLessThanAndPriorityGreaterThanEquals(courseId, quizId, originalIndex,droppedIndex)
            rubricsToShift.each{rubric ->
                rubric.priority = rubric.priority + 1
                rubric.save(flush:true)
            }
        }
        else{
            def rubricsToShift = Rubric.findAllByCourseIdAndQuizIdAndPriorityGreaterThanAndPriorityLessThanEquals(courseId, quizId, originalIndex,droppedIndex)
            rubricsToShift.each{rubric ->
                rubric.priority = rubric.priority - 1
                rubric.save(flush:true)
            }
        }
        
        rubricToMove.save(flush:true)
        respond listRubrics(courseId, quizId)
    }

    def reorderEquations() {
        def rqJson = request.JSON
        String courseId = params.courseId
        String quizId = params.quizId
        def droppedIndex = rqJson.equationAPriority as Integer
        def originalIndex = rqJson.equationBPriority as Integer
        def equationId = rqJson.equationId as Integer
        def equationToMove = Equation.get(equationId)
        def rubric = equationToMove.rubric
        equationToMove.priority = droppedIndex

        if(originalIndex > droppedIndex){
            def equationsToShift = Equation.findAllByRubricAndPriorityLessThanAndPriorityGreaterThanEquals(rubric, originalIndex,droppedIndex)
            equationsToShift.each{equation ->
                equation.priority = equation.priority + 1
                equation.save(flush:true)
            }
        }
        else{
            def equationsToShift = Equation.findAllByRubricAndPriorityGreaterThanAndPriorityLessThanEquals(rubric, originalIndex,droppedIndex)
            equationsToShift.each{equation ->
                equation.priority = equation.priority - 1
                equation.save(flush:true)
            }
        }

        equationToMove.save(flush:true)
        respond listRubrics(courseId, quizId)
    }

    def clone() {
        def rubric = Rubric.get(params.rubricId as Integer)
        def quizRubricCount = Rubric.countByCourseIdAndQuizId(rubric.courseId, rubric.quizId)
        def clonedRubric = new Rubric()
        clonedRubric.with{
            quizId = rubric.quizId
            courseId = rubric.courseId
            title = "${rubric.title} - CLONE"
            placement = rubric.placement
            feedback = rubric.feedback
            equationJoinType = rubric.equationJoinType
            isDefault = false
            priority = quizRubricCount
        }
        rubric.equations.each{equation ->
            clonedRubric.addToEquations(new Equation(rule: equation.rule, priority: equation.priority))
        }
        clonedRubric.save(flush:true)
        respond listRubrics(rubric.courseId, rubric.quizId)
    }

    private static def listRubrics(courseId, quizId){
        def jsonSlurper = new JsonSlurper()
        def rubrics = Rubric.findAllByCourseIdAndQuizId(courseId, quizId)
        return rubrics.collect{rubric ->
            def equations = rubric.equations.collect{equation ->
                [id: equation.id, rule: jsonSlurper.parseText(equation.rule), priority: equation.priority]
            }
            equations.sort{it.priority}
            [id: rubric.id, quizId: rubric.quizId, courseId: rubric.courseId,
             title: rubric.title, placement: rubric.placement, feedback: rubric.feedback,
             equationJoinType: rubric.equationJoinType, equations: equations, isDefault: rubric.isDefault]
        }
    }
}
