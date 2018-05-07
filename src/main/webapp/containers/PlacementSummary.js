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
import PlacementCSV from "../components/PlacementCSV";

class PlacementSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz: null,
      rubrics: [],
      placements: [],
      students: [],
      isLoaded: false
    }
  }

  handleSpeedGraderClick = (url) => {
    window.top.location.href = url;
  };

  calculatePlacements = (submissions, students, rubrics) => {
    const placements = [];
    students.forEach((student) => {
      const submission = submissions.find(submission => submission.user_id === student.id);
      if(submission){
        let placedRubric = rubrics ? rubrics[rubrics.length - 1] : null;
        for(const rubric of rubrics){
          let rubricSatisfied = null;
          rubric.equations.forEach((equation) => {
            const rule = equation.rule;
            const data = submission.placement_data;
            const appliedRuleResult = jsonLogic.apply(rule, data);
            if(rubric.equationJoinType === 'and'){
              rubricSatisfied = rubricSatisfied != null ? rubricSatisfied && appliedRuleResult : appliedRuleResult;
            }
            else{
              rubricSatisfied = rubricSatisfied != null ? rubricSatisfied || appliedRuleResult : appliedRuleResult;
            }
          });
          if(rubricSatisfied){
            placedRubric = rubric;
            break;
          }
        }
        placements.push({student: student, rubric: placedRubric});
      }
      //no submissions
      else{
        placements.push({student: student, rubric: null});
      }
    });
    return placements;
  };

  componentDidMount() {
    const {quizId} = this.props.match.params;
    axios.all(
        [api.fetchSingleQuiz(sessionStorage.courseId, quizId), api.listRubrics(sessionStorage.courseId, quizId),
          api.listStudents(sessionStorage.courseId), api.listSubmissions(sessionStorage.courseId, quizId)
        ])
        .then(axios.spread((quiz,rubrics,students,submissions) => {
          this.setState({
            quiz: quiz.data,
            rubrics: rubrics.data,
            students: students.data,
            placements: this.calculatePlacements(submissions.data, students.data, rubrics.data),
            isLoaded: true
          })
        }));
  }

  render() {
    const {isLoaded, quiz, placements} = this.state;
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
            <PlacementCSV placements={placements}/>
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