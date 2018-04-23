import React,{Component} from "react";
import ApplyTheme from "@instructure/ui-themeable/lib/components/ApplyTheme/index";
import Container from '@instructure/ui-container/lib/components/Container'
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'
import Table from '@instructure/ui-elements/lib/components/Table'
import IconEdit from '@instructure/ui-icons/lib/Line/IconEdit'
import Tooltip from '@instructure/ui-overlays/lib/components/Tooltip'
import Button from '@instructure/ui-buttons/lib/components/Button'
import EditRubricModal from "../components/EditRubricModal";
import api from "../api";
import Loading from "../components/Loading";
import NavigationBar from "../components/NavigationBar";
import { Link } from "react-router-dom"
import Breadcrumb, {BreadcrumbLink} from '@instructure/ui-breadcrumb/lib/components/Breadcrumb'

class RubricEditor extends Component {
    constructor(props){
        super(props);
        this.state = {
            showEditRubricModal: false,
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
            ],
            targetRubric: null,
            quiz: null,
            isLoaded: false
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

    render() {
        const { error, isLoaded, quiz, showEditRubricModal } = this.state;
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
                    <EditRubricModal show={showEditRubricModal} onDismiss={this.handleEditRubricClose}/>
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
            margin="small"
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