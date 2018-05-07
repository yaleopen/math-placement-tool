import React from 'react';
import {CSVLink} from 'react-csv';
import Flex, {FlexItem} from '@instructure/ui-layout/lib/components/Flex';
import IconDownload from '@instructure/ui-icons/lib/Line/IconDownload';
import Button from '@instructure/ui-buttons/lib/components/Button';

function PlacementCSV(props) {
  const csvData =[
    ['Name', 'NetID', 'Rubric', 'Placement', 'Feedback']
  ];
  props.placements.forEach((placement) => {
    csvData.push([placement.])
  });
  return (
      <Flex justifyItems="end" margin="small">
        <FlexItem>
          <Button variant="link">
            <IconDownload />
            <CSVLink data={csvData} filename="test.csv">Download CSV</CSVLink>
          </Button>
        </FlexItem>
      </Flex>

  );
}

export default PlacementCSV;