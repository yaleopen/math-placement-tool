import React from 'react';
import {CSVLink} from 'react-csv';
import Flex, {FlexItem} from '@instructure/ui-layout/lib/components/Flex';
import IconDownload from '@instructure/ui-icons/lib/Line/IconDownload';
import Button from '@instructure/ui-buttons/lib/components/Button';
import TextInput from '@instructure/ui-forms/lib/components/TextInput';
import Checkbox from '@instructure/ui-forms/lib/components/Checkbox';
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent';

function PlacementCSV(props) {
  const {quizName,placements} = props;
  const csvData =[
    ['Name', 'NetID', 'Rubric', 'Placement', 'Feedback']
  ];
  placements.forEach((placement) => {
    csvData.push([
      placement.student.sortable_name,
      placement.student.login_id,
      placement.rubric && placement.rubric.title,
      placement.rubric && placement.rubric.placement,
      placement.rubric && placement.rubric.feedback
    ])
  });
  return (
      <Button variant="link">
        <IconDownload />
        <CSVLink data={csvData} filename={`placement-summary-${quizName}.csv`}>Download CSV</CSVLink>
      </Button>
  );
}

function SearchBox(props) {
  return(
      <TextInput
          label={<ScreenReaderContent>Search placements...</ScreenReaderContent>}
          placeholder="Search appt groups..."
          value={props.filterText}
          onChange={props.onFilterTextChange}
          inline
      />
  )
}

function IncompleteFilter(props) {
  return(
      <Checkbox
          label="Only show incomplete students"
          value="medium"
          checked={props.filterIncomplete}
          onChange={props.onFilterIncompleteChange}

      />
  )
}

function PlacementSummaryNavigation(props) {
  const {quizName,placements,filterText,filterIncomplete,onFilterTextChange,onFilterIncompleteChange} = props;
  return (
      <Flex margin="small">
        <FlexItem grow shrink>
          <Flex direction="column">
            <FlexItem>
              <SearchBox filterText={filterText} onFilterTextChange={onFilterTextChange}/>
            </FlexItem>
            <FlexItem margin="x-small 0 0 0">
             <IncompleteFilter filterIncomplete={filterIncomplete} onFilterIncompleteChange={onFilterIncompleteChange}/>
            </FlexItem>
          </Flex>
        </FlexItem>
        <FlexItem>
          <PlacementCSV quizName={quizName} placements={placements}/>
        </FlexItem>
      </Flex>
  )
}

export default PlacementSummaryNavigation;