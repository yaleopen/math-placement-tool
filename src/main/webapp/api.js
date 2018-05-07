import axios from 'axios';

export default {
  fetchCourseQuizzes: (courseId) => {
    return axios.get(`/mathplacement/courses/${courseId}/quizzes`)
        .then(response => response)
  },
  fetchSingleQuiz: (courseId, quizId) => {
    return axios.get(`/mathplacement/courses/${courseId}/quizzes/${quizId}`)
        .then(response => response)
  },
  fetchQuizQuestions: (courseId, quizId) => {
    return axios.get(`/mathplacement/courses/${courseId}/quizzes/${quizId}/questions`)
        .then(response => response)
  },
  createNewRubric: (courseId, quizId, rubric) => {
    return axios.post(`/mathplacement/courses/${courseId}/quizzes/${quizId}/rubrics`, {rubric: rubric})
        .then(response => response)
  },
  updateRubric: (courseId, quizId, rubric) => {
    return axios.put(`/mathplacement/courses/${courseId}/quizzes/${quizId}/rubrics/${rubric.id}`, {rubric: rubric})
        .then(response => response)
  },
  listRubrics: (courseId, quizId) => {
    return axios.get(`/mathplacement/courses/${courseId}/quizzes/${quizId}/rubrics`)
        .then(response => response)
  },
  listRubricsForCourse: (courseId) => {
    return axios.get(`/mathplacement/courses/${courseId}/rubrics`)
        .then(response => response)
  },
  deleteRubric: (courseId, quizId, rubricId) => {
    return axios.delete(`/mathplacement/courses/${courseId}/quizzes/${quizId}/rubrics/${rubricId}`)
        .then(response => response)
  },
  listStudents: (courseId) => {
    return axios.get(`/mathplacement/courses/${courseId}/students`)
        .then(response => response)
  },
  listSubmissions: (courseId, quizId) => {
    return axios.get(`/mathplacement/courses/${courseId}/quizzes/${quizId}/submissions`)
        .then(response => response)
  },
  listSubmissionsForUser: (courseId, userId) => {
    return axios.get(`/mathplacement/courses/${courseId}/students/${userId}`)
        .then(response => response)
  }
};