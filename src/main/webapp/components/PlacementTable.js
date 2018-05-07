import React from 'react';
import View from '@instructure/ui-layout/lib/components/View';
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent';
import Table from '@instructure/ui-elements/lib/components/Table';
import IconSpeedGrader from '@instructure/ui-icons/lib/Solid/IconSpeedGrader';
import Tooltip from '@instructure/ui-overlays/lib/components/Tooltip';
import Button from '@instructure/ui-buttons/lib/components/Button';
import Popover, {PopoverContent,PopoverTrigger} from '@instructure/ui-overlays/lib/components/Popover';
import Text from '@instructure/ui-elements/lib/components/Text';
import Pill from '@instructure/ui-elements/lib/components/Pill';

function PlacementTable(props) {
  const {placements, speedGraderUrl, onSpeedGraderClick} = props;
  console.log(speedGraderUrl);
  return (
      <View
          as="div"
          textAlign="start"
          margin="small"
      >
        <Table
            caption={<ScreenReaderContent>List of Placements</ScreenReaderContent>}
        >
          <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">NetID</th>
            <th scope="col">Rubric</th>
            <th scope="col">Placement</th>
            <th scope="col">Feedback</th>
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

function FeedbackPopover(props){
  return(
      <Popover>
        <PopoverTrigger>
          <Pill text={props.feedback}/>
        </PopoverTrigger>
        <PopoverContent>
          <View padding="small" display="inline-block">
            <Text>{props.feedback}</Text>
          </View>
        </PopoverContent>
      </Popover>
  )
}

export default PlacementTable;