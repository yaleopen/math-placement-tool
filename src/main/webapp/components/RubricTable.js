import React from 'react';
import View from '@instructure/ui-layout/lib/components/View';
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent';
import Table from '@instructure/ui-elements/lib/components/Table';
import RubricTableRow from "./RubricTableRow";

function RubricTable(props) {
  const {rubrics, onEditRubricOpen, onRubricDelete, onRubricDefault, onRubricMove, onRubricDrop, findRubric,
    onCloneRubric} = props;

  return (
      <View
          as="div"
          textAlign="start"
          margin="0"
      >
        <Table
            caption={<ScreenReaderContent>List of Rubrics</ScreenReaderContent>}
        >
          <thead>
          <tr>
            <th width="1">Default</th>
            <th scope="col">Rubric Name</th>
            <th scope="col">Course Placement</th>
            <th width="1"/>
          </tr>
          </thead>
          <tbody>
          {rubrics.map(
              (rubric, index) => {
                return(
                    <RubricTableRow
                        key={`rubric${index}`}
                        rubric={rubric}
                        onEditRubricOpen={onEditRubricOpen}
                        onRubricDelete={onRubricDelete}
                        onRubricDefault={onRubricDefault}
                        index={index}
                        id={rubric.id}
                        onRubricMove={onRubricMove}
                        onRubricDrop={onRubricDrop}
                        onCloneRubric={onCloneRubric}
                        findRubric={findRubric}
                    />
                )
              })
          }
          </tbody>
        </Table>
      </View>
  )
}

export default RubricTable;