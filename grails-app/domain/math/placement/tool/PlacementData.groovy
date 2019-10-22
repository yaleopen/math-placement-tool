package math.placement.tool

class PlacementData {

    String userId
    String quizId
    Date finishedAt
    Map userPlacements

    static constraints = {
        userId unique: 'quizId'
        finishedAt nullable: true
    }
}
