import React from 'react'
import Container from '@instructure/ui-container/lib/components/Container'
import Table from '@instructure/ui-elements/lib/components/Table'
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'
import IconPublish from '@instructure/ui-icons/lib/Solid/IconPublish'
import Button from '@instructure/ui-buttons/lib/components/Button'
import Badge from '@instructure/ui-elements/lib/components/Badge'
import { Link } from "react-router-dom"

function QuizTableRow(props) {
    const quiz = props.quiz;
    return (
        <tr>
            <td>{quiz.published && <IconPublish title="Published" style={{color: '#00AC18'}}/>}</td>
            <td>
                <Link to={`/quizzes/${quiz.id}`}>
                    <Button variant="link">{quiz.title}</Button>
                </Link>
            </td>
            <td style={{whiteSpace: "nowrap", textAlign: "center"}}>
                <Badge standalone count={quiz.question_count} />
            </td>
            <td style={{whiteSpace: "nowrap", textAlign: "center"}}>
                <Badge standalone count={2} />
            </td>
        </tr>
    )
}

function QuizTable(props) {
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
                    {props.quizzes.map((quiz) => <QuizTableRow key={quiz.id} quiz={quiz}/>)}
                </tbody>
            </Table>
        </Container>
    );
}

export default QuizTable;