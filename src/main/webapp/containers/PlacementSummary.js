import React, {Component} from "react";
import ApplyTheme from "@instructure/ui-themeable/lib/components/ApplyTheme/index";
import View from '@instructure/ui-layout/lib/components/View';
import api from "../api";
import Loading from "../components/Loading";
import NavigationBar from "../components/NavigationBar";
import {Link} from "react-router-dom";
import Breadcrumb, {BreadcrumbLink} from '@instructure/ui-breadcrumb/lib/components/Breadcrumb';
import axios from "axios";
import jsonLogic from "json-logic-js";
import PlacementTable from "../components/PlacementTable";

class PlacementSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz: null,
      singleQuestions: [],
      groupQuestions: [],
      rubrics: [],
      placements: [],
      students: [],
      isLoaded: false
    }
  }

  handleSpeedGraderClick = (url) => {
    console.log(url);
    window.top.location.href = url;
  };

  calculatePlacements = (submissions, students, rubrics) => {
    const placements = [];
    students.forEach((student) => {
      const submission = submissions.find(submission => submission.user_id === student.id);
      console.log(submission);
      if(submission){
        rubrics.forEach((rubric) => {
          console.log(rubric);
          let rubricSatisfied = false;
          rubric.equations.forEach((equation) => {
            const rule = equation.rule;
            const data = submission.placement_data;
            console.log(rule);
            console.log(data);
            if(jsonLogic.apply(rule, data)){
              rubricSatisfied = true;
            }
          });
          if(rubricSatisfied){
            placements.push({student: student, rubric: rubric});
          }
        })
      }
      else{
        placements.push({student: student, rubric: null});
      }
    });
    console.log(placements);
    return placements;
  };

  componentDidMount() {
    const {quizId} = this.props.match.params;
    axios.all(
        [api.fetchSingleQuiz(sessionStorage.courseId, quizId), api.fetchQuizQuestions(sessionStorage.courseId, quizId),
          api.listRubrics(sessionStorage.courseId, quizId),api.listStudents(sessionStorage.courseId),
            api.listSubmissions(sessionStorage.courseId, quizId)
        ])
        .then(axios.spread((quiz,questions,rubrics,students,submissions) => {
          this.setState({
            quiz: quiz.data,
            singleQuestions: questions.data.singles,
            groupQuestions: questions.data.groups,
            rubrics: rubrics.data,
            students: students.data,
            placements: this.calculatePlacements(submissions.data, students.data, rubrics.data),
            isLoaded: true
          })
        }));
  }

  render() {
    const {isLoaded, quiz, singleQuestions, rubrics, groupQuestions, placements, students} = this.state;
    const breadcrumbs = (
        <Breadcrumb size="large" label="You are here:">
          <Link to="/mathplacement"><BreadcrumbLink onClick={() => {
          }}>Placement Calculator</BreadcrumbLink></Link>
          <BreadcrumbLink onClick={function () {
          }}>{quiz ? quiz.title : ''}</BreadcrumbLink>
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
            <PlacementTable
                placements={placements}
                onSpeedGraderClick={this.handleSpeedGraderClick.bind(this,quiz && quiz.speed_grader_url)}
            />
          </View>
        </ApplyTheme>
    );
  }
}

export default PlacementSummary;