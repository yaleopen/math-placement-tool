package math.placement.tool

class CourseController {

    static responseFormats = ['json', 'html']

    def courseService

    def listStudents() {
        def students = courseService.listStudentsInCourse(params.courseId as String)
        if(students != null){
            respond students
        }
        else{
            respond([errorMessage: "Error Retrieving Students"], status: 500)
        }
    }
}
