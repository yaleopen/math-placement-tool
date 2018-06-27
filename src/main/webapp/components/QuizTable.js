import React from 'react';
import View from '@instructure/ui-layout/lib/components/View';
import Table from '@instructure/ui-elements/lib/components/Table';
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent';
import IconPublish from '@instructure/ui-icons/lib/Solid/IconPublish';
import Button from '@instructure/ui-buttons/lib/components/Button';
import Badge from '@instructure/ui-elements/lib/components/Badge';
import {Link} from "react-router-dom";
import UserSubmissionBadge from "./UserSubmissionBadge";

function QuizTableRow(props) {
  const {quiz, onQuizPublish} = props;
  return (
      <tr>
        <td>
          {
              <Button
                  variant="icon"
                  onClick={onQuizPublish.bind(this,quiz.id,!quiz.published)}
              >
                <IconPublish title="Publish" style={quiz.published && {color: '#00AC18'}}/>
              </Button>
          }
        </td>
        <td>
          <Link to={`/quizzes/${quiz.id}/rubrics`}>
            <Button variant="link">{quiz.title}</Button>
          </Link>
        </td>
        <td style={{whiteSpace: "nowrap", textAlign: "center"}}>
          <Badge standalone count={quiz.question_count}/>
        </td>
        <td style={{whiteSpace: "nowrap", textAlign: "center"}}>
          {quiz.submission_count > 0 ?
            <Link to={`/quizzes/${quiz.id}/placements`}>
              <UserSubmissionBadge count={quiz.submission_count} />
            </Link> :
            <UserSubmissionBadge count={quiz.submission_count} />
          }
        </td>
      </tr>
  )
}

function QuizTable(props) {
  const {quizzes, onQuizPublish} = props;
  return (
      <View
          as="div"
          textAlign="start"
          margin="small"
      >
        <Table
            caption={<ScreenReaderContent>List of Quizzes</ScreenReaderContent>}
        >
          <thead>
          <tr>
            <th width="1"/>
            <th scope="col">Quiz Rubrics</th>
            <th width="1" scope="col">Questions</th>
            <th width="1" scope="col">Placements</th>
          </tr>
          </thead>
          <tbody>
          {quizzes.map((quiz) => <QuizTableRow key={quiz.id} quiz={quiz} onQuizPublish={onQuizPublish}/>)}
          </tbody>
        </Table>
      </View>
  );
}

export default QuizTable;