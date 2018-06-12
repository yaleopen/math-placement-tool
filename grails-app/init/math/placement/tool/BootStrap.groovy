package math.placement.tool

class BootStrap {

    def init = { servletContext ->
        def allRubrics = Rubric.list()
        def quizIds = allRubrics.quizId
        quizIds.each{quizId ->
            def quizRubrics = allRubrics.findAll{it.quizId == quizId}
            quizRubrics.eachWithIndex{rubric,index ->
                rubric.priority = index
                rubric.save(flush:true)
            }
        }
    }
    def destroy = {
    }
}
