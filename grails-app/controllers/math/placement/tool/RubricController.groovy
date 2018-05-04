package math.placement.tool

import math.placement.tool.client.ClientRubricWrapper

class RubricController {

    static responseFormats = ['json', 'html']

    def list() {
        def rubrics = Rubric.findAllByCourseIdAndQuizId(params.courseId as String, params.quizId as String)
        respond rubrics.collect{rubric ->
            def equations = rubric.equations.collect{equation ->
                [id: equation.id, rule: equation.rule]
            }
            [id: rubric.id, quizId: rubric.quizId, courseId: rubric.courseId,
             title: rubric.title, placement: rubric.placement, feedback: rubric.feedback,
             equationJoinType: rubric.equationJoinType, equations: equations]
        }
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
        createRubricRq.rubric.equations.each{rule ->
            rubric.addToEquations(new Equation(rule: rule))
        }
        def createdRubric = rubric.save(flush: true)
        def createdEquations = createdRubric.equations.collect{equation ->
            [id: equation.id, rule: equation.rule]
        }
        respond([id: createdRubric.id, quizId: createdRubric.quizId, courseId: createdRubric.courseId,
                 title: createdRubric.title, placement: createdRubric.placement, feedback: createdRubric.feedback,
                 equationJoinType: createdRubric.equationJoinType, equations: createdEquations])
    }

    def update(ClientRubricWrapper updateRubricRq) {
        def rubric = Rubric.get(updateRubricRq.rubric.id as Integer)
        rubric.with{
            title = updateRubricRq.rubric.title
            placement = updateRubricRq.rubric.placement
            feedback = updateRubricRq.rubric.feedback
            equationJoinType = updateRubricRq.rubric.equationJoinType
        }
        def savedRubric = rubric.save(flush:true)
        def updatedEquations = []
        updateRubricRq.rubric.equations.each{equation->
            def equationToUpdate = Equation.get(equation.id as Integer)
            equationToUpdate.rule = equation.rule
            def savedEquation = equationToUpdate.save(flush: true)
            updatedEquations.add([id: savedEquation.id, rule: savedEquation.rule])
        }
        respond([id: savedRubric.id, quizId: savedRubric.quizId, courseId: savedRubric.courseId,
                 title: savedRubric.title, placement: savedRubric.placement, feedback: savedRubric.feedback,
                 equationJoinType: savedRubric.equationJoinType, equations: updatedEquations])
    }

    def delete() {
        def rubric = Rubric.get(params.rubricId as Integer)
        rubric.delete()
        respond rubric
    }

    def deleteEquation() {
        def equation = Equation.get(params.equationId as Integer)
        equation.delete()
        respond equation
    }
}
