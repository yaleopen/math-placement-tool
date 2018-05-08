import React from 'react';
import View from '@instructure/ui-layout/lib/components/View';
import Table from '@instructure/ui-elements/lib/components/Table';
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent';
import FeedbackPopover from "./FeedbackPopover";
import IconWarning from '@instructure/ui-icons/lib/Solid/IconWarning';
import Tooltip from '@instructure/ui-overlays/lib/components/Tooltip';

function StudentTableRow(props) {
  const {placement} = props;
  return (
      <tr>
        <td>
          {placement.rubric == null &&
            <Tooltip tip="You have not completed this quiz">
              <IconWarning style={{color: '#FC5E13'}}/>
            </Tooltip>
          }
        </td>
        <td>{placement.quizName}</td>
        <td>{placement.rubric && placement.rubric.placement}</td>
        <td>{placement.rubric && <FeedbackPopover feedback={placement.rubric.feedback}/>}</td>
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