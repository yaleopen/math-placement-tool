import React, {Component} from 'react';
import { ApplyTheme } from '@instructure/ui-themeable';
import { View } from '@instructure/ui-layout';
import api from "../api";
import Loading from "../components/Loading";
import NavigationBar from "../components/NavigationBar";
import {Link} from "react-router-dom";
import { Breadcrumb } from '@instructure/ui-breadcrumb';
import StudentTable from "../components/StudentTable";
import axios from "axios/index";
import jsonLogic from "json-logic-js";
import FeedbackModal from "../components/FeedbackModal";

class StudentHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      placements: [],
      rubrics: [],
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
        //set default rubric if existing
        if(quizRubrics){
          const defaultRubric = quizRubrics.find(rubric => rubric.isDefault);
          if(defaultRubric){
            placedRubric = defaultRubric
          }
        }
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
        [api.listSubmissionsForUser(sessionStorage.courseId),
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
            <StudentTable placements={placements}/>
          </View>
        </ApplyTheme>
    );
  }
}

export default StudentHome;