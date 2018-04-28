import React,{Component} from "react";
import ApplyTheme from "@instructure/ui-themeable/lib/components/ApplyTheme/index";
import Container from '@instructure/ui-container/lib/components/Container'
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'
import Table from '@instructure/ui-elements/lib/components/Table'
import IconEdit from '@instructure/ui-icons/lib/Line/IconEdit'
import Tooltip from '@instructure/ui-overlays/lib/components/Tooltip'
import Button from '@instructure/ui-buttons/lib/components/Button'
import RubricModal from "../components/RubricModal";
import api from "../api";
import Loading from "../components/Loading";
import NavigationBar from "../components/NavigationBar";
import { Link } from "react-router-dom"
import Breadcrumb, {BreadcrumbLink} from '@instructure/ui-breadcrumb/lib/components/Breadcrumb'
import IconPlus from '@instructure/ui-icons/lib/Line/IconPlus'
import Grid, {GridRow,GridCol} from '@instructure/ui-layout/lib/components/Grid'

class RubricEditor extends Component {
    constructor(props){
        super(props);
        this.state = {
            showNewRubricModal: false,
            showEditRubricModal: false,
            quiz: null,
            isLoaded: false,
            rubrics: [
                {
                    title: 'Math 115 - Option 1',
                    placement: 'Math 115',
                    feedback:'We recommend that you take MATH 115, questions can be...',
                    equations: {
                        "and" : [
                            {"<" : [ { "var" : "first" }, 110 ]},
                            {"==" : [ { "var" : "second" }, "apple" ] }
                        ]
                    }

                }
            ]
        }
    }

    componentDidMount(){
        const { quizId } = this.props.match.params;
        api.fetchSingleQuiz(sessionStorage.courseId,quizId).then((response) => {
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
        const { error, isLoaded, quiz, showEditRubricModal, showNewRubricModal } = this.state;
        const breadcrumbs = (
            <Breadcrumb size="large" label="You are here:">
                <Link to="/mathplacement"><BreadcrumbLink onClick={() => {}}>Placement Calculator</BreadcrumbLink></Link>
                <BreadcrumbLink onClick={function () {}}>{quiz ? quiz.title : ''}</BreadcrumbLink>
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
                <Container
                    as="div"
                    size="auto"
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
                        onDismiss={this.handleEditRubricClose}
                        submitText="Save Changes"
                    />
                    <Button margin="small 0" onClick={this.handleNewRubricOpen}>
                        <IconPlus /> Rubric
                    </Button>
                    <RubricTable onEditRubricOpen={this.handleEditRubricOpen}/>
                </Container>
            </ApplyTheme>
        );
    }
}

function RubricTable(props) {
    return (
        <Container
            as="div"
            size="auto"
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
                    <RubricTableRow onEditRubricOpen={props.onEditRubricOpen}/>
                </tbody>
            </Table>
        </Container>
    )
}

function RubricTableRow(props) {
    return (
        <tr>
            <td>Math 115 - Option 1</td>
            <td>Math 115</td>
            <td style={{whiteSpace: "nowrap", textAlign: "center"}}>
                <Tooltip tip="Edit Rubric">
                    <Button variant="icon" onClick={props.onEditRubricOpen}>
                        <IconEdit title="Edit Rubric" />
                    </Button>
                </Tooltip>
            </td>
        </tr>
    )
}

export default RubricEditor;