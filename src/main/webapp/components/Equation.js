import React from 'react';
import View from '@instructure/ui-layout/lib/components/View';
import RuleHeader from "./RuleHeader";
import RuleFooter from "./RuleFooter";
import Rule from "./Rule";
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import IconHamburger from '@instructure/ui-icons/lib/Line/IconHamburger';

const equationSource = {
  beginDrag(props) {
    return {
      id: props.id,
      originalIndex: props.findEquation(props.id).index,
    }
  },
  canDrag(props) {
    return props.equationType === 'existing'
  }
};

const equationTarget = {
  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId !== overId) {
      const { index: overIndex } = props.findEquation(overId);
      props.onEquationMove(draggedId, overIndex);
    }
  }
};

const Equation = (props) => {
  const {equation, equationType, joinType, questions, questionGroups, rules, onCreditRuleQuestionChange,
    onAnswerRuleQuestionChange, onOperatorChange, onNewCreditRuleClick, onAnswerSelectChange, onCreditInputChange,
    onRuleJoinChange, onNewAnswerRuleClick, onDeleteEquationClick, onDeleteRuleClick, connectDragSource,
    connectDropTarget, connectDragPreview} = props;
  return connectDragSource && connectDropTarget && connectDragPreview(connectDropTarget(
      <div style={window.chrome && {position:"relative"}}>
      <View
          as="div"
          margin="0 0 small 0"
          padding="xx-small"
          background={"default"}
          borderWidth="small"
      >
        {connectDragSource(<div style={{display:"inline-block", cursor:"move"}}><IconHamburger/></div>)}
        <RuleHeader
            equation={equation}
            equationType={equationType}
            ruleJoinType={joinType}
            onNewCreditRuleClick={onNewCreditRuleClick}
            onNewAnswerRuleClick={onNewAnswerRuleClick}
            onDeleteEquationClick={onDeleteEquationClick}
        />
        {rules.map((rule, index) => {
          return (
              <Rule
                  key={`rule${index}`}
                  rule={rule}
                  ruleIndex={index}
                  equationId={equation.id}
                  equationType={equationType}
                  ruleJoinType={joinType}
                  questions={questions}
                  questionGroups={questionGroups}
                  onCreditRuleQuestionChange={onCreditRuleQuestionChange}
                  onAnswerRuleQuestionChange={onAnswerRuleQuestionChange}
                  onAnswerSelectChange={onAnswerSelectChange}
                  onCreditInputChange={onCreditInputChange}
                  onOperatorChange={onOperatorChange}
                  onDeleteRuleClick={onDeleteRuleClick}
              />
          )
        })}
        {rules.length > 1 &&
          <RuleFooter
              joinType={joinType}
              joinRadioName={`ruleJoinRadio${equation.id}`}
              equationId={equation.id}
              equationType={equationType}
              onRuleJoinChange={onRuleJoinChange}
          />
        }
      </View>
      </div>
  ))
};

export default flow(
    DragSource('equation', equationSource, (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging(),
    })),
    DropTarget('equation', equationTarget, connect => ({
      connectDropTarget: connect.dropTarget(),
    })))(Equation);