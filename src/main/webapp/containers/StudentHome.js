import React, {Component} from 'react';
import View from '@instructure/ui-layout/lib/components/View';
import ApplyTheme from '@instructure/ui-themeable/lib/components/ApplyTheme';
import api from "../api";
import Loading from "../components/Loading";
import NavigationBar from "../components/NavigationBar";
import {Link} from "react-router-dom";
import Breadcrumb, {BreadcrumbLink} from '@instructure/ui-breadcrumb/lib/components/Breadcrumb';
import StudentTable from "../components/StudentTable";
import axios from "axios/index";
import jsonLogic from "json-logic-js";

class StudentHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      placements: [],
      rubrics: []
    }
  }

  calculatePlacements = (submissions, rubrics) => {
    const placements = [];
    for(const quizId in submissions){
      let quizRubrics = null;
      if(rubrics.hasOwnProperty(quizId)){
        quizRubrics = rubrics[quizId]
      }
      const submission = submissions[quizId];
      if(submission.workflow_state === 'graded' && quizRubrics != null){
        let placedRubric = quizRubrics ? quizRubrics[quizRubrics.length - 1] : null;
        for(const quizRubric of quizRubrics){
          let rubricSatisfied = null;
          quizRubric.equations.forEach((equation) => {
            const rule = equation.rule;
            const data = submission.placement_data;
            const appliedRuleResult = jsonLogic.apply(rule, data);
            if(quizRubric.equationJoinType === 'and'){
              rubricSatisfied = rubricSatisfied != null ? rubricSatisfied && appliedRuleResult : appliedRuleResult;
            }
            else{
              rubricSatisfied = rubricSatisfied != null ? rubricSatisfied || appliedRuleResult : appliedRuleResult;
            }
          });
          if(rubricSatisfied){
            placedRubric = quizRubric;
            break;
          }
        }
        placements.push({quizName: submission.quiz_name, rubric: placedRubric});
      }
      else{
        placements.push({quizName: submission.quiz_name, rubric: null});
      }
    }
    return placements;
  };

  componentDidMount() {
    axios.all(
        [api.listSubmissionsForUser(sessionStorage.courseId, sessionStorage.userId),
          api.listRubricsForCourse(sessionStorage.courseId)
        ])
        .then(axios.spread((submissions,rubrics) => {
          this.setState({
            rubrics: rubrics.data,
            placements: this.calculatePlacements(submissions.data, rubrics.data),
            isLoaded: true
          })
        }));
  }

  render() {
    const {error, isLoaded, placements} = this.state;
    const breadcrumbs = (
        <Breadcrumb size="large" label="You are here:">
          <Link to="/mathplacement"><BreadcrumbLink onClick={() => {
          }}>Placement Calculator</BreadcrumbLink></Link>
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
            <StudentTable placements={placements}/>
          </View>
        </ApplyTheme>
    );
  }
}

export default StudentHome;