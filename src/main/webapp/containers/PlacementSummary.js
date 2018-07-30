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
import PlacementSummaryNavigation from "../components/PlacementSummaryNavigation";
import FeedbackModal from "../components/FeedbackModal";
import Alert from '@instructure/ui-alerts/lib/components/Alert';

class PlacementSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz: null,
      rubrics: [],
      placements: [],
      students: [],
      isLoaded: false,
      filterText: '',
      filterIncomplete: false,
      showFeedbackModal: false,
      feedbackModalText: '',
      showAlert: false,
      alertMessage: '',
      error: false
    }
  }

  handleSpeedGraderClick = (url) => {
    window.top.location.href = url;
  };

  handleFilterTextChange = (e) => {
    this.setState({
      filterText: e.target.value
    });
  };

  handleFilterIncompleteChange = (e) => {
    this.setState({
      filterIncomplete: e.target.checked
    });
  };

  handleFeedbackModalOpen = (feedback) => {
    this.setState({
      showFeedbackModal: true,
      feedbackModalText: feedback
    })
  };

  handleFeedbackModalClose = () => {
    this.setState({
      showFeedbackModal: false,
      feedbackModalText: ''
    })
  };

  handleSortPlacements = (column) => {
    const placements = this.state.placements.slice();
    switch(column) {
      case 'name':
        placements.sort(this.sortPlacementByName);
        break;
      case 'netid':
        placements.sort(this.sortPlacementByNetID);
        break;
      case 'rubricTitle':
        placements.sort(this.sortPlacementByRubricTitle);
        break;
      case 'rubricPlacement':
        placements.sort(this.sortPlacementByRubricPlacement);
        break;
    }
    this.setState({
      placements: placements
    })
  };

  sortPlacementByName = (a, b) => {
    const nameA = a.student ? a.student.sortable_name.toUpperCase() : '';
    const nameB = b.student ? b.student.sortable_name.toUpperCase() : '';
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  };

  sortPlacementByNetID = (a, b) => {
    const nameA = (a.student && a.student.login_id) ? a.student.login_id.toUpperCase() : '';
    const nameB = (b.student && b.student.login_id) ? b.student.login_id.toUpperCase() : '';
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  };

  sortPlacementByRubricTitle = (a, b) => {
    const nameA = a.rubric ? a.rubric.title.toUpperCase() : '';
    const nameB = b.rubric ? b.rubric.title.toUpperCase() : '';
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  };

  sortPlacementByRubricPlacement = (a, b) => {
    const nameA = a.rubric ? a.rubric.placement.toUpperCase() : '';
    const nameB = b.rubric ? b.rubric.placement.toUpperCase() : '';
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  };

  calculatePlacements = (submissions, students, rubrics) => {
    const placements = [];
    students.forEach((student) => {
      const submission = submissions.find(submission => submission.user_id === student.id);
      if(submission){
        let placedRubric = rubrics ? rubrics[rubrics.length - 1] : null;
        //set default rubric if existing
        if(rubrics){
          const defaultRubric = rubrics.find(rubric => rubric.isDefault);
          if(defaultRubric){
            placedRubric = defaultRubric
          }
        }
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
      [ api.fetchSingleQuiz(sessionStorage.courseId, quizId),
        api.listRubrics(sessionStorage.courseId, quizId),
        api.listStudents(sessionStorage.courseId),
        api.listSubmissions(sessionStorage.courseId, quizId)
      ])
      .then(axios.spread((quiz,rubrics,students,submissions) => {
        this.setState({
          quiz: quiz.data,
          rubrics: rubrics.data,
          students: students.data,
          placements: this.calculatePlacements(submissions.data, students.data, rubrics.data),
          isLoaded: true
        })
      }))
      .catch(() => {
        this.setState({
          isLoaded: true,
          showAlert: true,
          alertMessage: 'Error Loading Placement Results',
          error: true
        })
      });
  }

  render() {
    const {isLoaded, quiz, placements, filterText, filterIncomplete, feedbackModalText, showFeedbackModal,
    showAlert, alertMessage, error} = this.state;
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
            {showAlert &&
            <Alert
                variant={error ? 'error' : 'success'}
                margin="small"
                timeout={5000}
            >
              {alertMessage}
            </Alert>
            }
            <FeedbackModal show={showFeedbackModal} feedback={feedbackModalText} onDismiss={this.handleFeedbackModalClose}/>
            <PlacementSummaryNavigation
              placements={placements}
              quizName={quiz && quiz.title}
              filterText={filterText}
              filterIncomplete={filterIncomplete}
              onFilterTextChange={this.handleFilterTextChange}
              onFilterIncompleteChange={this.handleFilterIncompleteChange}
            />
            <PlacementTable
                placements={placements}
                filterText={filterText}
                filterIncomplete={filterIncomplete}
                onColumnSort={this.handleSortPlacements}
                onSpeedGraderClick={this.handleSpeedGraderClick.bind(this,quiz && quiz.speed_grader_url)}
                onFeedbackModalOpen={this.handleFeedbackModalOpen}
            />
          </View>
        </ApplyTheme>
    );
  }
}

export default PlacementSummary;