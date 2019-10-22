import React from 'react';
import { View } from '@instructure/ui-layout';
import { Button } from '@instructure/ui-buttons';
import { Table } from '@instructure/ui-table';
import { Tooltip } from '@instructure/ui-overlays';
import { IconFeedbackLine, IconSpeedGraderLine } from '@instructure/ui-icons';
import { Pagination } from '@instructure/ui-pagination';

function PlacementTable(props) {
  const {placements, onSpeedGraderClick, onColumnSort, filterText, filterIncomplete, onFeedbackModalOpen, page, onNextPageClick} = props;
  const filterTextLC = filterText.toLowerCase();
  const perPage = 20;
  const startIndex = page * perPage;
  const slicedPlacements = placements.slice(startIndex, startIndex + perPage);
  const pageCount = perPage && Math.ceil(placements.length / perPage);
  return (
      <View
          as="div"
          textAlign="start"
          margin="small"
      >
        <Table
            striped="columns"
            caption="List of Placements"
        >
          <Table.Head>
          <Table.Row>
            <Table.ColHeader id="Name" onClick={onColumnSort.bind(this,'name')} style={{cursor:'pointer'}}>Name</Table.ColHeader>
            <Table.ColHeader id="NetID" onClick={onColumnSort.bind(this,'netid')} style={{cursor:'pointer'}}>NetID</Table.ColHeader>
            <Table.ColHeader id="Rubric" onClick={onColumnSort.bind(this,'rubricTitle')} style={{cursor:'pointer'}}>Rubric</Table.ColHeader>
            <Table.ColHeader id="Placement" onClick={onColumnSort.bind(this,'rubricPlacement')} style={{cursor:'pointer'}}>Placement</Table.ColHeader>
            <Table.ColHeader id="PlacementOptions" width="1"/>
          </Table.Row>
          </Table.Head>
          <Table.Body>
          {(slicedPlacements || []).map((placement, index) => {
              if(filterIncomplete && placement.rubric){
                return;
              }
              const noStudentMatch = placement.student.name.toLowerCase().indexOf(filterTextLC) === -1 &&
                  (placement.student.login_id ? placement.student.login_id.toLowerCase().indexOf(filterTextLC) === -1 : true);
              const noRubricMatch = placement.rubric ?
                  placement.rubric.title.toLowerCase().indexOf(filterTextLC) === -1 &&
                  placement.rubric.placement.toLowerCase().indexOf(filterTextLC) === -1 : true;
              if(noStudentMatch && noRubricMatch){
                return;
              }
              return(
                <Table.Row key={`placement${index}`}>
                  <Table.Cell>{placement.student.sortable_name}</Table.Cell>
                  <Table.Cell>{placement.student.login_id}</Table.Cell>
                  <Table.Cell>{placement.rubric && placement.rubric.title}</Table.Cell>
                  <Table.Cell>{placement.rubric && placement.rubric.placement}</Table.Cell>
                  <Table.Cell style={{whiteSpace: "nowrap", textAlign: "center"}}>
                    {placement.rubric &&
                    <div>
                      <Tooltip tip="View Feedback">
                        <Button onClick={onFeedbackModalOpen.bind(this,placement.rubric.feedback)} variant="icon">
                          <IconFeedbackLine/>
                        </Button>
                      </Tooltip>
                      <Tooltip tip="Speed Grader">
                        <Button onClick={onSpeedGraderClick} variant="icon">
                          <IconSpeedGraderLine style={{color: '#00AC18'}}/>
                        </Button>
                      </Tooltip>
                    </div>
                    }
                  </Table.Cell>
                </Table.Row> 
              )
            })
          }
          </Table.Body>
        </Table>
        {pageCount > 1 && (
          <Pagination
            variant='compact'
            labelNext='Next Page'
            labelPrev='Previous Page'
            margin='large'
          >
            {Array.from(Array(pageCount), (item, index) => (
              <Pagination.Page
                key={index}
                onClick={() => onNextPageClick(index)}
                current={index === page}
              >
                {index + 1}
              </Pagination.Page>
            ))}
          </Pagination>
        )}
      </View>
  )
}

export default PlacementTable;