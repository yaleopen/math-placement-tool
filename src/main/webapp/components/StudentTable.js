import React from 'react';
import { View } from '@instructure/ui-layout'
import { IconWarningSolid } from '@instructure/ui-icons';
import { Table } from '@instructure/ui-elements';
import { ScreenReaderContent } from '@instructure/ui-a11y';
import { Tooltip } from '@instructure/ui-overlays';

function StudentTableRow(props) {
  const {placement} = props;
  return (
      <tr>
        <td>
          {placement.rubric == null &&
            <Tooltip tip="You have not completed this quiz">
              <IconWarningSolid style={{color: '#FC5E13'}}/>
            </Tooltip>
          }
        </td>
        <td style={{verticalAlign: "top"}}>{placement.quizName}</td>
        <td style={{verticalAlign: "top"}}>{placement.rubric && placement.rubric.placement}</td>
        <td style={{verticalAlign: "top"}}>{placement.rubric && placement.rubric.feedback}</td>
      </tr>
  )
}

function StudentTable(props) {
  const {placements} = props;
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
            <th scope="col">Placement</th>
            <th scope="col">Feedback</th>
          </tr>
          </thead>
          <tbody>
          {placements.map((placement,index) => <StudentTableRow key={`studentTableRow${index}`} placement={placement}/>)}
          </tbody>
        </Table>
      </View>
  );
}

export default StudentTable;