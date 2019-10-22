import React from 'react';
import {CSVLink} from 'react-csv';
import { View, Grid } from '@instructure/ui-layout';
import { IconDownloadLine } from '@instructure/ui-icons';
import { Button } from '@instructure/ui-buttons';
import { TextInput } from '@instructure/ui-text-input';
import { Checkbox } from '@instructure/ui-forms';
import { ScreenReaderContent } from '@instructure/ui-a11y';
import moment from 'moment';

function PlacementCSV(props) {
  const {quizName,placements} = props;
  const csvData =[
    ['Login ID', 'Email Address', 'Canvas User ID', 'Last Name', 'First Name', 'Date Submitted', 'Rubric', 'Placement', 'Feedback']
  ];
  placements.forEach((placement) => {
    const splitName = placement.student.sortable_name.split(',');
    csvData.push([
      placement.student.login_id,
      placement.student.email,
      placement.student.id,
      splitName[0],
      splitName[1],
      placement.finishedAt ? `${moment(placement.finishedAt).format("MMM D, YYYY h:mm A")} UTC` : '',
      placement.rubric && placement.rubric.title,
      placement.rubric && placement.rubric.placement,
      placement.rubric && placement.rubric.feedback
    ])
  });
  return (
      <div>
        <Button variant="icon" margin="0" readOnly>
          <IconDownloadLine title="Accessible Button Label" />
        </Button>
        <CSVLink uFEFF={false} data={csvData} filename={`placement-summary-${quizName}.csv`}>Download CSV</CSVLink>
      </div>
  );
}

function SearchBox(props) {
  return(
      <TextInput
          label={<ScreenReaderContent>Search placements...</ScreenReaderContent>}
          placeholder="Search placements..."
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
      <View
          as="div"
          margin="small"
      >
        <Grid startAt="medium" vAlign="middle" colSpacing="none" rowSpacing="small">
          <Grid.Row>
            <Grid.Col>
              <SearchBox filterText={filterText} onFilterTextChange={onFilterTextChange}/>
            </Grid.Col>
            <Grid.Col width="auto">
              <PlacementCSV quizName={quizName} placements={placements}/>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col>
              <IncompleteFilter filterIncomplete={filterIncomplete} onFilterIncompleteChange={onFilterIncompleteChange}/>
            </Grid.Col>
          </Grid.Row>
        </Grid>
      </View>
  )
}

export default PlacementSummaryNavigation;