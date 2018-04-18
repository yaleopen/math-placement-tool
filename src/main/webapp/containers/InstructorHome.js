import React, {Component} from 'react'
import Container from '@instructure/ui-container/lib/components/Container'
import ApplyTheme from '@instructure/ui-themeable/lib/components/ApplyTheme'
import QuizTable from "../components/QuizTable";

class InstructorHome extends Component {
    render() {
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
                    <QuizTable/>
                </Container>
            </ApplyTheme>
        );
    }
}

export default InstructorHome;