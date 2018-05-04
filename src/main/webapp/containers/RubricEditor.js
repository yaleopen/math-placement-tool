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
      rubrics: []
    }
  }

  componentDidMount() {
    const {quizId} = this.props.match.params;
    axios.all([api.fetchSingleQuiz(sessionStorage.courseId, quizId),api.fetchQuizQuestions(sessionStorage.courseId, quizId)])
        .then(axios.spread((quizResponse,quizGroupResponse) => {
          this.setState({
            quiz: quizResponse.data,
            singleQuestions: quizGroupResponse.data.singles,
            groupQuestions: quizGroupResponse.data.groups,
            isLoaded: true
          })
    }));
  }

  handleEditRubricOpen = () => {
    this.setState({
      showEditRubricModal: true
    })
  };

  handleEditRubricClose = () => {
    this.setState({
      showEditRubricModal: false
    })
  };

  handleNewRubricOpen = () => {
    this.setState({
      showNewRubricModal: true
    })
  };

  handleNewRubricClose = () => {
    this.setState({
      showNewRubricModal: false
    })
  };

  render() {
    const {error, isLoaded, quiz, showEditRubricModal, showNewRubricModal, singleQuestions, groupQuestions} = this.state;
    const breadcrumbs = (
        <Breadcrumb size="large" label="You are here:">
          <Link to="/mathplacement"><BreadcrumbLink onClick={() => {
          }}>Placement Calculator</BreadcrumbLink></Link>
          <BreadcrumbLink onClick={function () {
          }}>{quiz ? quiz.title : ''}</BreadcrumbLink>
        </Breadcrumb>
    );
    const testRubricData = [{
      id: '1',
      title: 'Math 115 - Option 1',
      placement: 'Math 115',
      feedback: 'We recommend that you take MATH 115, questions can be...',
    }];
    const testEquationData = {
      equationJoinType: 'or',
      equations: [
        {
          id: "1",
          rule: {
            "and": [
              {"==": [{"var": "question_78573"}, 'answer_2277']}
            ]
          }
        },
        {
          id: "2",
          rule: {
            "or": [
              {"<=": [{'+': [{"var": "question_group_1666"},{"var": "question_group_1667"}]}, 110]},
              {">=": [{"+": [{"var": "question_group_1666"}, {"var": "question_group_1667"}]}, 50]},
              {"==": [{"var": "question_78572"}, 'answer_6641']}
            ]
          }
        }
      ]
    };
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
                show={showNewRubricModal}
                onDismiss={this.handleNewRubricClose}
                questions={singleQuestions}
                questionGroups={groupQuestions}
                submitText="Submit"
            />
            <RubricModal
                heading="Edit Rubric"
                show={showEditRubricModal}
                equations={testEquationData.equations}
                equationJoinType={testEquationData.equationJoinType}
                questions={singleQuestions}
                questionGroups={groupQuestions}
                rubric={testRubricData[0]}
                onDismiss={this.handleEditRubricClose}
                submitText="Save Changes"
            />
            <Button margin="small 0" onClick={this.handleNewRubricOpen}>
              <IconPlus/> Rubric
            </Button>
            <RubricTable rubrics={testRubricData} onEditRubricOpen={this.handleEditRubricOpen}/>
          </View>
        </ApplyTheme>
    );
  }
}

export default RubricEditor;