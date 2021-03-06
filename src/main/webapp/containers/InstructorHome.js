import React, {Component} from 'react';
import { View } from '@instructure/ui-layout';
import { ApplyTheme } from '@instructure/ui-themeable';
import QuizTable from "../components/QuizTable";
import api from "../api";
import Loading from "../components/Loading";
import NavigationBar from "../components/NavigationBar";
import {Link} from "react-router-dom";
import { Breadcrumb } from '@instructure/ui-breadcrumb';
import update from 'immutability-helper';

class InstructorHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      quizzes: []
    }
  }

  componentDidMount() {
    api.fetchCourseQuizzes(sessionStorage.courseId).then((response) => {
      this.setState({
        isLoaded: true,
        quizzes: response.data
      })
    }).catch((error) => {
      this.setState({
        isLoaded: true,
        error
      })
    })
  }

  handlePublishQuiz = (quizId, publish) => {
    this.setState({
      isLoaded: false
    });
    api.publishQuiz(sessionStorage.courseId, quizId, publish).then((response) => {
      const quizzes = this.state.quizzes;
      const quizIndex = quizzes.findIndex(quiz => quiz.id === quizId);
      const updatedQuizzes = update(quizzes,{[quizIndex]:{$set:response.data}});
      this.setState({
        isLoaded: true,
        quizzes: updatedQuizzes
      })
    }).catch((error) => {
      this.setState({
        isLoaded: true,
        error
      })
    })
  };

  render() {
    const {error, isLoaded, quizzes} = this.state;
    const breadcrumbs = (
        <Breadcrumb size="large" label="You are here:">
          <Link to="/mathplacement"><Breadcrumb.Link onClick={() => {
          }}>Placement Calculator</Breadcrumb.Link></Link>
        </Breadcrumb>
    );
    return (
        <ApplyTheme theme={ApplyTheme.generateTheme('canvas', {
              'ic-brand-primary': '#00356b',
              'ic-brand-button--primary-bgd': '#00356b',
              'ic-link-color': '#286dc0'
            }
        )}
        >
          <View
              as="div"
              textAlign="start"
              margin="small"
          >
            <NavigationBar breadcrumbs={breadcrumbs}/>
            <Loading isLoading={!isLoaded}/>
            <QuizTable quizzes={quizzes} onQuizPublish={this.handlePublishQuiz}/>
          </View>
        </ApplyTheme>
    );
  }
}

export default InstructorHome;