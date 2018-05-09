import React from 'react';
import View from '@instructure/ui-layout/lib/components/View';
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent';
import Table from '@instructure/ui-elements/lib/components/Table';
import IconEdit from '@instructure/ui-icons/lib/Line/IconEdit';
import Tooltip from '@instructure/ui-overlays/lib/components/Tooltip';
import Button from '@instructure/ui-buttons/lib/components/Button';
import DeleteRubricPopover from "./DeleteRubricPopover";
import IconMarkAsRead from '@instructure/ui-icons/lib/Solid/IconMarkAsRead';

function RubricTable(props) {
  const {rubrics, onEditRubricOpen, onRubricDelete, onRubricDefault} = props;
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
  const {rubric, onEditRubricOpen, onRubricDelete, onRubricDefault} = props;
  const isDefaultRubric = rubric.isDefault;
  return (
      <tr>
        <td style={{whiteSpace: "nowrap", textAlign: "center"}}>
          <Button
              variant="icon"
              onClick={onRubricDefault.bind(this,rubric.id)}
              readOnly={isDefaultRubric}
          >
            <IconMarkAsRead
                style={{color: !isDefaultRubric && '#cccccc'}}
                title={isDefaultRubric ? 'Default' : 'Make Default'}
            />
          </Button>
        </td>
        <td>{rubric.title}</td>
        <td>{rubric.placement}</td>
        <td style={{whiteSpace: "nowrap", textAlign: "center"}}>
          <Tooltip tip="Edit">
            <Button
                variant="icon"
                onClick={onEditRubricOpen.bind(this,rubric)}
            >
              <IconEdit />
            </Button>
          </Tooltip>
          <DeleteRubricPopover onContentSubmit={onRubricDelete.bind(this,rubric.id)} />
        </td>
      </tr>
  )
}

export default RubricTable;