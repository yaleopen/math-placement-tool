import React from 'react';
import {CSVLink} from 'react-csv';
import View from '@instructure/ui-layout/lib/components/View';
import IconDownload from '@instructure/ui-icons/lib/Line/IconDownload';
import Button from '@instructure/ui-buttons/lib/components/Button';
import TextInput from '@instructure/ui-forms/lib/components/TextInput';
import Checkbox from '@instructure/ui-forms/lib/components/Checkbox';
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent';
import Grid, {GridCol,GridRow} from '@instructure/ui-layout/lib/components/Grid';

function PlacementCSV(props) {
  const {quizName,placements} = props;
  const csvData =[
    ['Login ID', 'Last Name', 'First Name', 'Rubric', 'Placement', 'Feedback']
  ];
  placements.forEach((placement) => {
    const splitName = placement.student.sortable_name.split(',');
    csvData.push([
      placement.student.login_id,
      splitName[0],
      splitName[1],
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
      <View
          as="div"
          margin="small"
      >
        <Grid startAt="medium" vAlign="middle" colSpacing="none" rowSpacing="small">
          <GridRow>
            <GridCol>
              <SearchBox filterText={filterText} onFilterTextChange={onFilterTextChange}/>
            </GridCol>
            <GridCol width="auto">
              <PlacementCSV quizName={quizName} placements={placements}/>
            </GridCol>
          </GridRow>
          <GridRow>
            <GridCol>
              <IncompleteFilter filterIncomplete={filterIncomplete} onFilterIncompleteChange={onFilterIncompleteChange}/>
            </GridCol>
          </GridRow>
        </Grid>
      </View>
  )
}

export default PlacementSummaryNavigation;