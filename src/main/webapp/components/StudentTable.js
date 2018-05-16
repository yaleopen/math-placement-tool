import React from 'react';
import View from '@instructure/ui-layout/lib/components/View';
import Table from '@instructure/ui-elements/lib/components/Table';
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent';
import Button from '@instructure/ui-buttons/lib/components/Button';
import IconFeedback from '@instructure/ui-icons/lib/Line/IconFeedback';
import IconWarning from '@instructure/ui-icons/lib/Solid/IconWarning';
import Tooltip from '@instructure/ui-overlays/lib/components/Tooltip';

function StudentTableRow(props) {
  const {placement, onFeedbackModalOpen} = props;
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
        <td style={{textAlign:'center'}}>{placement.rubric &&
          <Tooltip tip="View Feedback">
            <Button onClick={onFeedbackModalOpen.bind(this,placement.rubric.feedback)} variant="icon">
              <IconFeedback/>
            </Button>
          </Tooltip>}
        </td>
      </tr>
  )
}

function StudentTable(props) {
  const {placements, onFeedbackModalOpen} = props;
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
            <th scope="col" style={{textAlign:'center'}}>Feedback</th>
          </tr>
          </thead>
          <tbody>
          {placements.map((placement,index) => <StudentTableRow key={`studentTableRow${index}`} placement={placement} onFeedbackModalOpen={onFeedbackModalOpen}/>)}
          </tbody>
        </Table>
      </View>
  );
}

export default StudentTable;