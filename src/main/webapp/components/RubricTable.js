import React from 'react'
import View from '@instructure/ui-layout/lib/components/View'
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent'
import Table from '@instructure/ui-elements/lib/components/Table'
import IconEdit from '@instructure/ui-icons/lib/Line/IconEdit'
import IconTrash from '@instructure/ui-icons/lib/Line/IconTrash'
import Tooltip from '@instructure/ui-overlays/lib/components/Tooltip'
import Button from '@instructure/ui-buttons/lib/components/Button'

function RubricTable(props) {
  const {rubrics, onEditRubricOpen, onRubricDelete} = props;
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
                    />
                )
              })
          }
          </tbody>
        </Table>
      </View>
  )
}

function RubricTableRow(props) {
  const {rubric, onEditRubricOpen, onRubricDelete} = props;
  return (
      <tr>
        <td>{rubric.title}</td>
        <td>{rubric.placement}</td>
        <td style={{whiteSpace: "nowrap", textAlign: "center"}}>
          <Tooltip tip="Edit">
            <Button variant="icon" onClick={onEditRubricOpen.bind(this,rubric)}>
              <IconEdit />
            </Button>
          </Tooltip>
          <Tooltip tip="Delete">
            <Button
                variant="icon"
                onClick={onRubricDelete.bind(this,rubric.id)}
                disabled={sessionStorage.isCoursePublished === 'true'}
            >
              <IconTrash style={{color: '#EE0612'}}/>
            </Button>
          </Tooltip>
        </td>
      </tr>
  )
}

export default RubricTable;