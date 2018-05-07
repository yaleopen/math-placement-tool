import React from 'react'
import View from '@instructure/ui-layout/lib/components/View'
import Table from '@instructure/ui-elements/lib/components/Table'
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'
import IconPublish from '@instructure/ui-icons/lib/Solid/IconPublish'
import Button from '@instructure/ui-buttons/lib/components/Button'
import Badge from '@instructure/ui-elements/lib/components/Badge'

function StudentTableRow(props) {
  const {quiz} = props;
  return (
      <tr>
      </tr>
  )
}

function StudentTable(props) {
  const {quizzes} = props;
  return (
      <View
          as="div"
          textAlign="start"
          margin="small"
      >
        <Table
            caption={<ScreenReaderContent>List of Students Placements</ScreenReaderContent>}
        >
          <thead>
          <tr>
            <th width="1"/>
            <th scope="col">Quiz</th>
            <th width="1" scope="col">Placement</th>
            <th width="1" scope="col">Feedback</th>
          </tr>
          </thead>
          <tbody>
          {quizzes.map((quiz) => <StudentTableRow key={quiz.id} quiz={quiz}/>)}
          </tbody>
        </Table>
      </View>
  );
}

export default StudentTable;