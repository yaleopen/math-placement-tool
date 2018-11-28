import React, {Component} from 'react';
import IconEdit from '@instructure/ui-icons/lib/Line/IconEdit';
import Tooltip from '@instructure/ui-overlays/lib/components/Tooltip';
import Button from '@instructure/ui-buttons/lib/components/Button';
import DeleteRubricPopover from "./DeleteRubricPopover";
import IconMarkAsRead from '@instructure/ui-icons/lib/Solid/IconMarkAsRead';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import IconCopy from '@instructure/ui-icons/lib/Line/IconCopy';

const rubricSource = {
  beginDrag(props) {
    return {
      id: props.id,
      originalIndex: props.findRubric(props.id).index,
    }
  },
  endDrag(props, monitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();

    if(monitor.didDrop()) {
      const droppedIndex = props.findRubric(droppedId).index;
      if(droppedIndex !== originalIndex){
        props.onRubricDrop({ id: droppedId, droppedIndex, originalIndex });
      }
    }
  },

};

const rubricTarget = {
  hover (props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId !== overId) {
      const { index: overIndex } = props.findRubric(overId);
      props.onRubricMove(draggedId, overIndex);
    }
  }
};

class RubricTableRow extends Component {
  render() {
    const {rubric,
      onEditRubricOpen,
      onRubricDelete,
      onRubricDefault,
      connectDragSource,
      connectDropTarget,
      onCloneRubric, isQuizPublished} = this.props;
    const isDefaultRubric = rubric.isDefault;
    return connectDragSource(connectDropTarget(
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
            <Tooltip tip="Clone">
              <Button
                  variant="icon"
                  onClick={onCloneRubric.bind(this,rubric.id)}
                  disabled={isQuizPublished}
              >
                <IconCopy />
              </Button>
            </Tooltip>
            <Tooltip tip="Edit">
              <Button
                  variant="icon"
                  onClick={onEditRubricOpen.bind(this,rubric)}
              >
                <IconEdit />
              </Button>
            </Tooltip>
            <DeleteRubricPopover onContentSubmit={onRubricDelete.bind(this,rubric.id)} isQuizPublished={isQuizPublished} />
          </td>
        </tr>
    ))
  }
}

export default flow(
    DragSource('rubric', rubricSource, (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })),
    DropTarget('rubric', rubricTarget, connect => ({
      connectDropTarget: connect.dropTarget(),
    })))(RubricTableRow);