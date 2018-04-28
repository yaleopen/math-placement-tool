package math.placement.tool

class Rubric {

    String quizId
    String name
    String placement
    String feedback
    String equation

    static constraints = {
    }

    static mapping = {
        version false
        feedback type: 'text'
        equation type: 'text'
    }
}
