import React from 'react';
import View from '@instructure/ui-layout/lib/components/View';
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent';
import Table from '@instructure/ui-elements/lib/components/Table';
import IconSpeedGrader from '@instructure/ui-icons/lib/Solid/IconSpeedGrader';
import Tooltip from '@instructure/ui-overlays/lib/components/Tooltip';
import Button from '@instructure/ui-buttons/lib/components/Button';
import IconFeedback from '@instructure/ui-icons/lib/Line/IconFeedback';

function PlacementTable(props) {
  const {placements, onSpeedGraderClick, onColumnSort, filterText, filterIncomplete, onFeedbackModalOpen} = props;
  const rows = [];
  placements.forEach((placement, index) => {
    if(filterIncomplete && placement.rubric != null){
      return;
    }
    const noStudentMatch = placement.student.name.indexOf(filterText) === -1 &&
        placement.student.login_id.indexOf(filterText) === -1;
    const noRubricMatch = placement.rubric != null ? placement.rubric.title.indexOf(filterText) === -1 &&
        placement.rubric.placement.indexOf(filterText) === -1 &&
        placement.rubric.feedback.indexOf(filterText) === -1 : true;
    if(noStudentMatch && noRubricMatch){
      return;
    }
    rows.push(
        <PlacementTableRow
            key={`placement${index}`}
            placement={placement}
            onSpeedGraderClick={onSpeedGraderClick}
            onFeedbackModalOpen={onFeedbackModalOpen}
        />
    )
  });
  return (
      <View
          as="div"
          textAlign="start"
          margin="small"
      >
        <Table
            striped="columns"
            caption={<ScreenReaderContent>List of Placements</ScreenReaderContent>}
        >
          <thead>
          <tr>
            <th scope="col" onClick={onColumnSort.bind(this,'name')} style={{cursor:'pointer'}}>Name</th>
            <th scope="col" onClick={onColumnSort.bind(this,'netid')} style={{cursor:'pointer'}}>NetID</th>
            <th scope="col" onClick={onColumnSort.bind(this,'rubricTitle')} style={{cursor:'pointer'}}>Rubric</th>
            <th scope="col" onClick={onColumnSort.bind(this,'rubricPlacement')} style={{cursor:'pointer'}}>Placement</th>
            <th width="1"/>
          </tr>
          </thead>
          <tbody>
          {rows}
          </tbody>
        </Table>
      </View>
  )
}

function PlacementTableRow(props) {
  const {placement, onSpeedGraderClick, onFeedbackModalOpen} = props;
  return (
      <tr>
        <td>{placement.student.sortable_name}</td>
        <td>{placement.student.login_id}</td>
        <td>{placement.rubric && placement.rubric.title}</td>
        <td>{placement.rubric && placement.rubric.placement}</td>
        <td style={{whiteSpace: "nowrap", textAlign: "center"}}>
          {placement.rubric &&
          <React.Fragment>
            <Tooltip tip="View Feedback">
              <Button onClick={onFeedbackModalOpen.bind(this,placement.rubric.feedback)} variant="icon">
                <IconFeedback/>
              </Button>
            </Tooltip>
            <Tooltip tip="Speed Grader">
              <Button onClick={onSpeedGraderClick} variant="icon">
                <IconSpeedGrader style={{color: '#00AC18'}}/>
              </Button>
            </Tooltip>
          </React.Fragment>
          }
        </td>
      </tr>
  )
}

export default PlacementTable;