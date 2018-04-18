import React from 'react'
import Container from '@instructure/ui-container/lib/components/Container'
import Table from '@instructure/ui-elements/lib/components/Table'
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'
import IconPublish from '@instructure/ui-icons/lib/Solid/IconPublish'
import Button from '@instructure/ui-buttons/lib/components/Button'
import Badge from '@instructure/ui-elements/lib/components/Badge'
import { Link } from "react-router-dom"

function QuizTableRow() {
    return (
        <tr>
            <td><IconPublish title="Published" style={{color: '#00AC18'}}/></td>
            <td>
                <Link to={`/rubrics`}>
                    <Button variant="link">Test Quiz</Button>
                </Link>
            </td>
            <td style={{whiteSpace: "nowrap", textAlign: "center"}}>
                <Badge standalone count={6} />
            </td>
            <td style={{whiteSpace: "nowrap", textAlign: "center"}}>
                <Badge standalone count={2} />
            </td>
        </tr>
    )
}

function QuizTable() {
    return (
        <Container
            as="div"
            size="auto"
            textAlign="start"
            margin="small"
        >
            <Table
                caption={<ScreenReaderContent>List of Quizzes</ScreenReaderContent>}
            >
                <thead>
                <tr>
                    <th width="1"/>
                    <th/>
                    <th width="1" scope="col">Questions</th>
                    <th width="1" scope="col">Submissions</th>
                </tr>
                </thead>
                <tbody>
                    <QuizTableRow/>
                </tbody>
            </Table>
        </Container>
    );
}

export default QuizTable;