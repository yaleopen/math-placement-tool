package math.placement.tool

class Rubric {

    String quizId
    String courseId
    String title
    String placement
    String feedback
    String equationJoinType
    Boolean isDefault
    Integer priority

    static hasMany = [equations: Equation]

    static constraints = {
    }

    static mapping = {
        version false
        feedback type: 'text'
        sort "priority"
        equations sort: 'priority'
    }
}
