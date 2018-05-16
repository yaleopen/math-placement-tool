package math.placement.tool.client

import grails.validation.Validateable

class ClientRubric implements Validateable{
    String id
    String title
    String placement
    String feedback
    List<String> newEquations
    List<String> existingEquations
    String equationJoinType
    Integer priority
}
