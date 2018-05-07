import React from 'react';
import {CSVLink} from 'react-csv';
import Flex, {FlexItem} from '@instructure/ui-layout/lib/components/Flex';
import IconDownload from '@instructure/ui-icons/lib/Line/IconDownload';
import Button from '@instructure/ui-buttons/lib/components/Button';

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
      <Flex justifyItems="end" margin="small">
        <FlexItem>
          <Button variant="link">
            <IconDownload />
            <CSVLink data={csvData} filename={`placement-summary-${quizName}.csv`}>Download CSV</CSVLink>
          </Button>
        </FlexItem>
      </Flex>

  );
}

export default PlacementCSV;