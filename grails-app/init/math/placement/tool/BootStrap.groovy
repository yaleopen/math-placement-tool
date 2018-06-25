package math.placement.tool

class BootStrap {

    def init = { servletContext ->
        def allRubrics = Rubric.list()
        def quizIds = allRubrics.quizId
        quizIds.each{quizId ->
            def quizRubrics = allRubrics.findAll{it.quizId == quizId}
            quizRubrics.each{rubric->
                rubric.equations.eachWithIndex{ Equation equation, int i ->
                    equation.priority = i
                }
                rubric.save(flush:true)
            }
        }
    }
    def destroy = {
    }
}
