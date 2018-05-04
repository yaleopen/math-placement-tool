package math.placement.tool

class Equation {

    String rule

    static belongsTo = [rubric: Rubric]

    static constraints = {
    }

    static mapping = {
        version false
        rule type: 'text'
    }
}
