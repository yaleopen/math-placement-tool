import axios from 'axios'

export default {
  fetchCourseQuizzes: (courseId) => {
    return axios.get(`/mathplacement/courses/${courseId}/quizzes`).then((response) => {
      return response
    })
  },
  fetchSingleQuiz: (courseId, quizId) => {
    return axios.get(`/mathplacement/courses/${courseId}/quizzes/${quizId}`).then((response) => {
      return response
    })
  },
  fetchQuizQuestions: (courseId, quizId) => {
    return axios.get(`/mathplacement/courses/${courseId}/quizzes/${quizId}/questions`).then((response) => {
      return response
    })
  }
};