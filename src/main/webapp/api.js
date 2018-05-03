import axios from 'axios'

export default {
    fetchCourseQuizzes: function(courseId){
        return axios.get(`/mathplacement/courses/${courseId}/quizzes`).then((response) => { return response })
    },
    fetchSingleQuiz: function(courseId, quizId){
        return axios.get(`/mathplacement/courses/${courseId}/quizzes/${quizId}`).then((response) => { return response })
    }
};