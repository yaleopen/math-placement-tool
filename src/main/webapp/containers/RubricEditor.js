import React, {Component} from "react";
import ApplyTheme from "@instructure/ui-themeable/lib/components/ApplyTheme/index";
import View from '@instructure/ui-layout/lib/components/View'
import Button from '@instructure/ui-buttons/lib/components/Button'
import RubricModal from "./RubricModal";
import api from "../api";
import Loading from "../components/Loading";
import NavigationBar from "../components/NavigationBar";
import {Link} from "react-router-dom"
import Breadcrumb, {BreadcrumbLink} from '@instructure/ui-breadcrumb/lib/components/Breadcrumb'
import IconPlus from '@instructure/ui-icons/lib/Line/IconPlus'
import RubricTable from "../components/RubricTable";
import axios from "axios";

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
      isLoaded: false,
      rubrics: [],
      targetRubric: null
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
      targetRubric: null
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
      targetRubric: null
    })
  };

  handleNewRubricSubmit = (rubric) => {
    console.log(rubric);
    this.setState({
      isLoaded: false
    });
    api.createNewRubric(sessionStorage.courseId, this.state.quiz.id, rubric)
        .then((response) => {
          console.log(response.data);
          this.setState({
            rubrics: this.state.rubrics.concat(response.data),
            isLoaded: true,
            showNewRubricModal: false
          })
        })
  };

  handleSaveRubricSubmit = (rubric) => {
    console.log(rubric);
    this.setState({
      isLoaded: false
    });
    api.updateRubric(sessionStorage.courseId, this.state.quiz.id, rubric)
        .then((response) => {
          console.log(response.data);
          const rubrics = this.state.rubrics.slice();
          const indexOfRubric = this.state.rubrics.find((oldRubric) => oldRubric.id === rubric.id);
          this.setState({
            rubrics: rubrics.splice(indexOfRubric, 1, response.data),
            isLoaded: true,
            showEditRubricModal: false
          })
        })
  };

  render() {
    const {error, isLoaded, quiz, showEditRubricModal, showNewRubricModal, singleQuestions,
      rubrics, groupQuestions, targetRubric} = this.state;
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
            <RubricModal
                heading="New Rubric"
                isNewRubric={true}
                show={showNewRubricModal}
                questions={singleQuestions}
                questionGroups={groupQuestions}
                rubric={targetRubric}
                submitText="Submit"
                onDismiss={this.handleNewRubricClose}
                onNewRubricSubmit={this.handleNewRubricSubmit}
            />
            <RubricModal
                heading="Edit Rubric"
                show={showEditRubricModal}
                questions={singleQuestions}
                questionGroups={groupQuestions}
                rubric={targetRubric}
                submitText="Save Changes"
                onDismiss={this.handleEditRubricClose}
                onSaveRubricSubmit={this.handleSaveRubricSubmit}
            />
            <Button margin="small 0" onClick={this.handleNewRubricOpen}>
              <IconPlus/> Rubric
            </Button>
            <RubricTable rubrics={rubrics} onEditRubricOpen={this.handleEditRubricOpen}/>
          </View>
        </ApplyTheme>
    );
  }
}

export default RubricEditor;