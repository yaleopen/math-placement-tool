import React, {Component} from "react";
import ApplyTheme from "@instructure/ui-themeable/lib/components/ApplyTheme/index";
import View from '@instructure/ui-layout/lib/components/View'
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'
import Table from '@instructure/ui-elements/lib/components/Table'
import IconEdit from '@instructure/ui-icons/lib/Line/IconEdit'
import Tooltip from '@instructure/ui-overlays/lib/components/Tooltip'
import Button from '@instructure/ui-buttons/lib/components/Button'
import RubricModal from "../components/RubricModal";
import api from "../api";
import Loading from "../components/Loading";
import NavigationBar from "../components/NavigationBar";
import {Link} from "react-router-dom"
import Breadcrumb, {BreadcrumbLink} from '@instructure/ui-breadcrumb/lib/components/Breadcrumb'
import IconPlus from '@instructure/ui-icons/lib/Line/IconPlus'

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
              {"==": [{"var": "q1"}, 'b']}
            ]
          }
        },
        {
          id: "2",
          rule: {
            "or": [
              {"<=": [{'+': [{"var": "q1"}]}, 110]},
              {">=": [{"+": [{"var": "q1"}, {"var": "q2"}]}, 50]},
              {"==": [{"var": "q3"}, 'c']}
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
                submitText="Submit"
            />
            <RubricModal
                heading="Edit Rubric"
                show={showEditRubricModal}
                equations={testEquationData.equations}
                equationJoinType={testEquationData.equationJoinType}
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

function RubricTable(props) {
  return (
      <View
          as="div"
          textAlign="start"
          margin="0"
      >
        <Table
            caption={<ScreenReaderContent>List of Rubrics</ScreenReaderContent>}
        >
          <thead>
          <tr>
            <th scope="col">Rubric Name</th>
            <th scope="col">Course Placement</th>
            <th width="1"/>
          </tr>
          </thead>
          <tbody>
          {props.rubrics.map((rubric,index) => <RubricTableRow key={`rubric${index}`} rubric={rubric} onEditRubricOpen={props.onEditRubricOpen}/>)}

          </tbody>
        </Table>
      </View>
  )
}

function RubricTableRow(props) {
  const {rubric} = props;
  return (
      <tr>
        <td>{rubric.title}</td>
        <td>{rubric.placement}</td>
        <td style={{whiteSpace: "nowrap", textAlign: "center"}}>
          <Tooltip tip="Edit Rubric">
            <Button variant="icon" onClick={props.onEditRubricOpen}>
              <IconEdit title="Edit Rubric"/>
            </Button>
          </Tooltip>
        </td>
      </tr>
  )
}

export default RubricEditor;