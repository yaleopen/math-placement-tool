import React from 'react';
import { View } from '@instructure/ui-layout';
import { Table } from '@instructure/ui-elements';
import RubricTableRow from "./RubricTableRow";
import { ScreenReaderContent } from '@instructure/ui-a11y';

function RubricTable(props) {
  const {rubrics, onEditRubricOpen, onRubricDelete, onRubricDefault, onRubricMove, onRubricDrop, findRubric,
    onCloneRubric, isQuizPublished} = props;

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
                        isQuizPublished={isQuizPublished}
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