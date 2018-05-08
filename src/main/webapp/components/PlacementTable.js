import React from 'react';
import View from '@instructure/ui-layout/lib/components/View';
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent';
import Table from '@instructure/ui-elements/lib/components/Table';
import IconSpeedGrader from '@instructure/ui-icons/lib/Solid/IconSpeedGrader';
import Tooltip from '@instructure/ui-overlays/lib/components/Tooltip';
import Button from '@instructure/ui-buttons/lib/components/Button';
import FeedbackPopover from "./FeedbackPopover";

function PlacementTable(props) {
  const {placements, onSpeedGraderClick, onColumnSort} = props;
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
            <th scope="col" onClick={onColumnSort.bind(this,'rubricFeedback')} style={{cursor:'pointer'}}>Feedback</th>
            <th width="1"/>
          </tr>
          </thead>
          <tbody>
          {placements.map(
              (placement, index) => {
                return(
                    <PlacementTableRow
                        key={`placement${index}`}
                        placement={placement}
                        onSpeedGraderClick={onSpeedGraderClick}
                    />
                )
              })
          }
          </tbody>
        </Table>
      </View>
  )
}

function PlacementTableRow(props) {
  const {placement, onSpeedGraderClick} = props;
  return (
      <tr>
        <td>{placement.student.sortable_name}</td>
        <td>{placement.student.login_id}</td>
        <td>{placement.rubric && placement.rubric.title}</td>
        <td>{placement.rubric && placement.rubric.placement}</td>
        <td>{placement.rubric && <FeedbackPopover feedback={placement.rubric.feedback}/>}</td>
        <td style={{whiteSpace: "nowrap", textAlign: "center"}}>
          {placement.rubric &&
          <Tooltip tip="Speed Grader">
            <Button onClick={onSpeedGraderClick} variant="icon">
              <IconSpeedGrader style={{color: '#00AC18'}}/>
            </Button>
          </Tooltip>
          }
        </td>
      </tr>
  )
}

export default PlacementTable;