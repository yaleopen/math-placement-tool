package math.placement.tool

class Equation {

    String rule
    Integer priority

    static belongsTo = [rubric: Rubric]

    static constraints = {
    }

    static mapping = {
        version false
        rule type: 'text'
    }
}
