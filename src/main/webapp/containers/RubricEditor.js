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

class RubricEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewRubricModal: false,
      showEditRubricModal: false,
      quiz: null,
      isLoaded: false,
      rubrics: []
    }
  }

  componentDidMount() {
    const {quizId} = this.props.match.params;
    api.fetchSingleQuiz(sessionStorage.courseId, quizId).then((response) => {
      this.setState({
        quiz: response.data,
        isLoaded: true
      })
    })
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
    const {error, isLoaded, quiz, showEditRubricModal, showNewRubricModal} = this.state;
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
    const questionGroups = [
      {
        "id": 1666,
        "quiz_id": 11415,
        "name": "Plcmt Group 1",
        "pick_count": 1,
        "question_points": 5,
        "position": 3,
        "assessment_question_bank_id": null
      },
      {
        "id": 1667,
        "quiz_id": 11415,
        "name": "Plcmt Group 2",
        "pick_count": 1,
        "question_points": 5,
        "position": 4,
        "assessment_question_bank_id": null
      }
    ];
    const questions = [
      {
        "matching_answer_incorrect_matches": null,
        "quiz_id": 11415,
        "quiz_group_id": null,
        "variables": null,
        "question_type": "multiple_choice_question",
        "correct_comments_html": "",
        "formulas": null,
        "formula_decimal_places": null,
        "answers": [
          {
            "comments_html": "",
            "comments": "",
            "weight": 100,
            "html": "",
            "id": 2754,
            "text": "Score 5"
          },
          {
            "comments_html": "",
            "comments": "",
            "weight": 0,
            "html": "",
            "id": 2996,
            "text": "Score 4"
          },
          {
            "comments_html": "",
            "comments": "",
            "weight": 0,
            "html": "",
            "id": 5259,
            "text": "Score 3"
          },
          {
            "comments_html": "",
            "comments": "",
            "weight": 0,
            "html": "",
            "id": 6472,
            "text": "Score 2"
          },
          {
            "comments_html": "",
            "comments": "",
            "weight": 0,
            "html": "",
            "id": 304,
            "text": "Score 1"
          },
          {
            "comments_html": "",
            "comments": "",
            "weight": 0,
            "html": "",
            "id": 6641,
            "text": "Score 0"
          },
          {
            "comments_html": "",
            "comments": "",
            "weight": 0,
            "html": "",
            "id": 9757,
            "text": "I didn't take the AP Calculus AB test"
          }
        ],
        "incorrect_comments": "",
        "matches": null,
        "incorrect_comments_html": "",
        "question_text": "<p><span>Did you take the AP Calculus AB test? If so, please enter your </span><br><span>score.</span></p>",
        "assessment_question_id": 200710,
        "answer_tolerance": null,
        "question_name": "Question",
        "points_possible": 5,
        "neutral_comments_html": "",
        "neutral_comments": "",
        "id": 78572,
        "position": 1,
        "correct_comments": ""
      },
      {
        "matching_answer_incorrect_matches": null,
        "quiz_id": 11415,
        "quiz_group_id": null,
        "variables": null,
        "question_type": "multiple_choice_question",
        "correct_comments_html": "",
        "formulas": null,
        "formula_decimal_places": null,
        "answers": [
          {
            "comments_html": "",
            "comments": "",
            "weight": 100,
            "html": "",
            "id": 5688,
            "text": "Score 5"
          },
          {
            "comments_html": "",
            "comments": "",
            "weight": 0,
            "html": "",
            "id": 9321,
            "text": "Score 4"
          },
          {
            "comments_html": "",
            "comments": "",
            "weight": 0,
            "html": "",
            "id": 2277,
            "text": "Score 3"
          },
          {
            "comments_html": "",
            "comments": "",
            "weight": 0,
            "html": "",
            "id": 2938,
            "text": "Score 2"
          },
          {
            "comments_html": "",
            "comments": "",
            "weight": 0,
            "html": "",
            "id": 6324,
            "text": "Score 1"
          },
          {
            "comments_html": "",
            "comments": "",
            "weight": 0,
            "html": "",
            "id": 2359,
            "text": "Score 0"
          },
          {
            "comments_html": "",
            "comments": "",
            "weight": 0,
            "html": "",
            "id": 3652,
            "text": "I didn't take the AP Calculus BC test"
          }
        ],
        "incorrect_comments": "",
        "matches": null,
        "incorrect_comments_html": "",
        "question_text": "<p><span>Did you take the AP Calculus BC test? If so, please enter your </span><br><span>score.</span></p>",
        "assessment_question_id": 200711,
        "answer_tolerance": null,
        "question_name": "Question",
        "points_possible": 1,
        "neutral_comments_html": "",
        "neutral_comments": "",
        "id": 78573,
        "position": 2,
        "correct_comments": ""
      }
    ];
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
                questions={questions}
                questionGroups={questionGroups}
                submitText="Submit"
            />
            <RubricModal
                heading="Edit Rubric"
                show={showEditRubricModal}
                equations={testEquationData.equations}
                equationJoinType={testEquationData.equationJoinType}
                questions={questions}
                questionGroups={questionGroups}
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