import React, {Component} from "react";
import ApplyTheme from "@instructure/ui-themeable/lib/components/ApplyTheme/index";
import View from '@instructure/ui-layout/lib/components/View';
import Button from '@instructure/ui-buttons/lib/components/Button';
import RubricModal from "./RubricModal";
import api from "../api";
import Loading from "../components/Loading";
import NavigationBar from "../components/NavigationBar";
import {Link} from "react-router-dom";
import Breadcrumb, {BreadcrumbLink} from '@instructure/ui-breadcrumb/lib/components/Breadcrumb';
import IconPlus from '@instructure/ui-icons/lib/Line/IconPlus';
import RubricTable from "../components/RubricTable";
import axios from "axios";
import Alert from '@instructure/ui-alerts/lib/components/Alert';
import update from 'immutability-helper';
import _ from 'lodash';

class RubricEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewRubricModal: false,
      showEditRubricModal: false,
      quiz: null,
      singleQuestions: [],
      groupQuestions: [],
      equations: [],
      newEquations: [],
      isLoaded: false,
      rubrics: [],
      targetRubric: null,
      showAlert: false,
      alertMessage: '',
      error: false
    }
  }

  componentDidMount() {
    const {quizId} = this.props.match.params;
    axios.all(
        [api.fetchSingleQuiz(sessionStorage.courseId, quizId), api.fetchQuizQuestions(sessionStorage.courseId, quizId),
            api.listRubrics(sessionStorage.courseId, quizId)])
        .then(axios.spread((quizResponse,quizGroupResponse,rubricResponse) => {
          this.setState({
            quiz: quizResponse.data,
            singleQuestions: quizGroupResponse.data.singles,
            groupQuestions: quizGroupResponse.data.groups,
            rubrics: rubricResponse.data,
            isLoaded: true
          })
    }));
  }

  handleEditRubricOpen = (rubric) => {
    this.setState({
      showEditRubricModal: true,
      targetRubric: rubric
    })
  };

  handleEditRubricClose = () => {
    this.setState({
      showEditRubricModal: false,
      targetRubric: null,
      newEquations: []
    })
  };

  handleNewRubricOpen = () => {
    this.setState({
      showNewRubricModal: true,
      targetRubric: null
    })
  };

  handleNewRubricClose = () => {
    this.setState({
      showNewRubricModal: false,
      targetRubric: null,
      newEquations: []
    })
  };

  handleNewRubricSubmit = (rubric) => {
    this.setState({
      isLoaded: false,
      showAlert: false,
    });
    api.createNewRubric(sessionStorage.courseId, this.state.quiz.id, rubric)
        .then((response) => {
          this.setState({
            rubrics: response.data,
            isLoaded: true,
            showNewRubricModal: false,
            showAlert: true,
            alertMessage: 'New Rubric Created',
            error: false
          })
        }).catch(() => {
          this.setState({
            isLoaded: true,
            showNewRubricModal: false,
            showAlert: true,
            alertMessage: 'Error Creating Rubric',
            error: true
          })
        })
  };

  handleSaveRubricSubmit = (rubric) => {
    this.setState({
      isLoaded: false,
      showAlert: false
    });
    api.updateRubric(sessionStorage.courseId, this.state.quiz.id, rubric)
        .then((response) => {
          this.setState({
            rubrics: response.data,
            isLoaded: true,
            showEditRubricModal: false,
            showAlert: true,
            alertMessage: 'Rubric Saved',
            error: false
          })
        }).catch(() => {
          this.setState({
            isLoaded: true,
            showEditRubricModal: false,
            showAlert: true,
            alertMessage: 'Error Saving Rubric',
            error: true
          })
        })
  };

  handleDeleteRubricClick = (rubricId) => {
    this.setState({
      isLoaded: false,
      showAlert: false
    });
    api.deleteRubric(sessionStorage.courseId, this.state.quiz.id, rubricId)
        .then((response) => {
          this.setState({
            rubrics: response.data,
            isLoaded: true,
            showAlert: true,
            alertMessage: 'Rubric Deleted',
            error:false
          })
        }).catch(() => {
          this.setState({
            isLoaded: true,
            showAlert: true,
            alertMessage: 'Error Deleting Rubric',
            error: true
          })
        })
  };

  handleDefaultRubricClick = (rubricId) => {
    this.setState({
      isLoaded: false,
      showAlert: false
    });
    api.makeRubricDefault(sessionStorage.courseId, this.state.quiz.id, rubricId)
        .then((response) => {
          this.setState({
            rubrics: response.data,
            isLoaded: true,
            error:false
          })
        }).catch(() => {
      this.setState({
        isLoaded: true,
        showAlert: true,
        alertMessage: 'Error updating default rubric',
        error: true
      })
    })
  };

  handleRubricMove = (id, atIndex) => {
    const { rubric, index } = this.findRubric(id);
    this.setState(update(this.state, {
      rubrics: {
        $splice: [
          [index, 1],
          [atIndex, 0, rubric],
        ],
      },
    }));
  };

  handleRubricDrop = (reRankedRubric) => {
    this.setState({
      isLoaded: false,
      showAlert: false
    });
    api.swapRubricOrder(sessionStorage.courseId, this.state.quiz.id, reRankedRubric.droppedIndex, reRankedRubric.originalIndex)
        .then((response) => {
          this.setState({
            rubrics: response.data,
            isLoaded: true,
            error:false
          })
        }).catch(() => {
      this.setState({
        isLoaded: true,
        showAlert: true,
        alertMessage: 'Error updating order',
        error: true
      })
    })
  };

  handleCloneRubric = (rubricId) => {
    this.setState({
      isLoaded: false,
      showAlert: false
    });
    api.cloneRubric(sessionStorage.courseId, this.state.quiz.id, rubricId)
        .then((response) => {
          this.setState({
            rubrics: response.data,
            isLoaded: true,
            error:false
          })
        }).catch(() => {
      this.setState({
        isLoaded: true,
        showAlert: true,
        alertMessage: 'Error cloning rubric',
        error: true
      })
    })
  };

  findRubric = (id) => {
    const{rubrics} = this.state;
    const rubric = _.find(rubrics, c => c.id === id) || {};
    return {
      rubric,
      index: rubrics.indexOf(rubric)
    }
  };

  render() {
    const {error, isLoaded, quiz, showEditRubricModal, showNewRubricModal, singleQuestions,
      rubrics, groupQuestions, targetRubric, newEquations, showAlert, alertMessage} = this.state;
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
            <RubricModal
                key="newRubricModal"
                heading="New Rubric"
                isNewRubric={true}
                show={showNewRubricModal}
                questions={singleQuestions}
                questionGroups={groupQuestions}
                rubric={targetRubric}
                newEquations={newEquations}
                priority={rubrics.length}
                submitText="Submit"
                onDismiss={this.handleNewRubricClose}
                onNewRubricSubmit={this.handleNewRubricSubmit}
            />
            <RubricModal
                key="editRubricModal"
                heading="Edit Rubric"
                show={showEditRubricModal}
                questions={singleQuestions}
                questionGroups={groupQuestions}
                rubric={targetRubric}
                newEquations={newEquations}
                submitText="Save Changes"
                onDismiss={this.handleEditRubricClose}
                onSaveRubricSubmit={this.handleSaveRubricSubmit}
                onEquationDrop={this.handleEquationDrop}
            />
            <Button
                margin="small 0"
                disabled={sessionStorage.isCoursePublished === 'true'}
                onClick={this.handleNewRubricOpen}
            >
              <IconPlus/> Rubric
            </Button>
            <RubricTable
                rubrics={rubrics}
                onEditRubricOpen={this.handleEditRubricOpen}
                onRubricDelete={this.handleDeleteRubricClick}
                onRubricDefault={this.handleDefaultRubricClick}
                onRubricMove={this.handleRubricMove}
                onRubricDrop={this.handleRubricDrop}
                onCloneRubric={this.handleCloneRubric}
                findRubric={this.findRubric}
            />
          </View>
        </ApplyTheme>
    );
  }
}

export default RubricEditor;