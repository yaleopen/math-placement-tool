import React from 'react';
import { View, Grid } from '@instructure/ui-layout';
import { Button } from '@instructure/ui-buttons';
import { ScreenReaderContent } from '@instructure/ui-a11y';
import { Badge } from '@instructure/ui-elements';
import { IconXLine, IconCheckLine, IconHamburgerLine } from '@instructure/ui-icons';
import { Select } from '@instructure/ui-forms';
import { NumberInput } from '@instructure/ui-number-input';
import flow from "lodash/flow";
import { DragSource, DropTarget } from 'react-dnd';

const ruleSource = {
  beginDrag(props) {
    return {
      rule: props.rule,
      originalIndex: props.ruleIndex,
      equationId: props.equationId
    }
  }
};

const ruleTarget = {
  hover(props, monitor) {
    const { rule: draggedRule, originalIndex: atIndex } = monitor.getItem();
    const { rule: overRule, ruleIndex: overIndex } = props;
    if (draggedRule !== overRule && props.equationId === monitor.getItem().equationId) {
      props.onRuleMove(props.equationId, overIndex, draggedRule, atIndex);
    }
  }
};

function Rule(props) {
  const {rule, equationId, equationType, ruleIndex, ruleJoinType, questions, questionGroups, onCreditRuleQuestionChange,
    onAnswerRuleQuestionChange, onOperatorChange, onAnswerSelectChange, onCreditInputChange, onDeleteRuleClick, connectDragSource,
    connectDropTarget, connectDragPreview, isQuizPublished} = props;
  const ruleOperator = Object.keys(rule)[0];
  const ruleValue = rule[ruleOperator];
  const ruleVariable = ruleValue[0];
  const ruleCriteriaValue = ruleValue[1];
  const ruleVariableKey = Object.keys(ruleVariable)[0];
  const ruleVariableValue = ruleVariable[ruleVariableKey];
  const ruleType = ruleVariableKey === 'var' ? 'answer' : 'credit';
  const questionIds = [];
  let answers = null;
  if (ruleType === 'credit') {
    ruleVariableValue.forEach((variable) => {
      questionIds.push(variable.var)
    });
  }
  else {
    questionIds.push(ruleVariableValue);
    const question = questions.find((question) => ruleVariableValue === `question_${question.id}.answer`);
    answers = question ? question.answers : [];
  }
  return connectDragSource && connectDropTarget && connectDragPreview(connectDropTarget(
      <div style={window.chrome && {position:"relative"}}>
      <View
          as="div"
          margin="0"
          padding="xx-small"
      >

        <Grid vAlign="middle" rowSpacing="small" colSpacing="small">
          <Grid.Row>
            <Grid.Col width="auto">
              {connectDragSource(<div style={{display:"inline-block", cursor:"move"}}><IconHamburgerLine/></div>)}
            </Grid.Col>
            <Grid.Col>
              <QuizQuestionSelect
                  ruleType={ruleType}
                  questionIds={questionIds}
                  equationId={equationId}
                  equationType={equationType}
                  ruleIndex={ruleIndex}
                  ruleOperator={ruleOperator}
                  ruleJoinType={ruleJoinType}
                  questions={questions}
                  questionGroups={questionGroups}
                  onChange={ruleType === 'credit' ? onCreditRuleQuestionChange : onAnswerRuleQuestionChange}
                  isQuizPublished={isQuizPublished}
              />
            </Grid.Col>
            <Grid.Col width={2}>
              <RuleOperatorSelect
                  ruleType={ruleType}
                  operator={ruleOperator}
                  equationId={equationId}
                  equationType={equationType}
                  ruleIndex={ruleIndex}
                  ruleJoinType={ruleJoinType}
                  onChange={onOperatorChange}
                  isQuizPublished={isQuizPublished}
              />
            </Grid.Col>
            <Grid.Col width={2}>
              {ruleType === 'credit' ?
                  <RuleCreditInput
                      criteria={ruleCriteriaValue}
                      equationId={equationId}
                      equationType={equationType}
                      ruleIndex={ruleIndex}
                      ruleOperator={ruleOperator}
                      ruleJoinType={ruleJoinType}
                      onChange={onCreditInputChange}
                      isQuizPublished={isQuizPublished}
                  /> :
                  <RuleAnswerSelect
                      criteria={ruleCriteriaValue}
                      answers={answers}
                      equationId={equationId}
                      equationType={equationType}
                      ruleIndex={ruleIndex}
                      ruleOperator={ruleOperator}
                      ruleJoinType={ruleJoinType}
                      onChange={onAnswerSelectChange}
                      isQuizPublished={isQuizPublished}
                  />
              }
            </Grid.Col>
            <Grid.Col width="auto">
              <Button
                  onClick={onDeleteRuleClick.bind(this, equationId, equationType, ruleIndex, ruleJoinType)}
                  disabled={isQuizPublished}
                  variant="icon"
                  margin="0"
              >
                <IconXLine/>
              </Button>
            </Grid.Col>
          </Grid.Row>
        </Grid>
      </View>
      </div>
  ))
}

function RuleOperatorSelect(props) {
  const {ruleType, operator, equationId, equationType, ruleIndex, ruleJoinType, onChange, isQuizPublished} = props;
  return (
      <Select
          value={operator}
          readOnly={isQuizPublished}
          onChange={onChange.bind(this, equationId, equationType, ruleIndex, operator, ruleJoinType)}
          label={<ScreenReaderContent>Rule Operator Select</ScreenReaderContent>}
      >
        <option value="==">=</option>
        <option disabled={ruleType === 'answer'} value="<=">&lt;=</option>
        <option disabled={ruleType === 'answer'} value=">=">&gt;=</option>
      </Select>
  )
}

function RuleCreditInput(props) {
  const {criteria, equationId, equationType, ruleIndex, ruleOperator, ruleJoinType, onChange, isQuizPublished} = props;
  return (
      <NumberInput
          min={0}
          value={criteria.toString()}
          readOnly={isQuizPublished}
          onChange={onChange.bind(this, equationId, equationType, ruleIndex, ruleOperator, ruleJoinType)}
          showArrows={false}
          label={<ScreenReaderContent>Rule Credit Input</ScreenReaderContent>}
      />
  )
}

function RuleAnswerSelect(props) {
  const {criteria, answers, equationId, equationType, ruleIndex, ruleOperator, ruleJoinType, onChange, isQuizPublished} = props;
  const options = answers.map((answer) => {
    return <option key={answer.id} value={`answer_${answer.id}`} icon={answer.weight === 100 ? GreenIconCheck : RedIconX}>{answer.text}</option>
  });
  return (
      <Select
          value={criteria}
          readOnly={isQuizPublished}
          onChange={onChange.bind(this, equationId, equationType, ruleIndex, ruleOperator, ruleJoinType)}
          label={<ScreenReaderContent>Rule Answer Select</ScreenReaderContent>}
      >
        {options}
      </Select>
  )
}

function GreenIconCheck(){
  return(
      <IconCheckLine title="Correct" style={{color: '#00AC18'}}/>
  )
}

function RedIconX(){
  return(
      <IconXLine title="Incorrect" style={{color: '#EE0612'}}/>
  )
}

function QuizQuestionSelect(props) {
  let questionTips = {};
  const {equationId, equationType, ruleIndex, ruleType, ruleOperator, ruleJoinType, questionIds, questions, questionGroups, onChange, isQuizPublished} = props;
  const options = [];
  questions.forEach((question) => {
    options.push(<option key={`question_${question.id}`} value={ruleType === 'credit' ? `question_${question.id}.points` : `question_${question.id}.answer`}>{question.question_name}</option>);
    questionTips[`question_${question.id}.points`] =  question.points_possible
  });
  if(ruleType === 'credit'){
    questionGroups.forEach((questionGroup) => {
      options.push(<option key={`question_group_${questionGroup.id}`} value={`question_group_${questionGroup.id}`}>{questionGroup.name}</option>);
      questionTips[`question_group_${questionGroup.id}`] =  questionGroup.pick_count * questionGroup.question_points
    });
  }
  const value = ruleType === 'credit' ? questionIds : questionIds[0];
  return (
      <Select
          label={<ScreenReaderContent>Quiz Question Select</ScreenReaderContent>}
          value={value}
          readOnly={isQuizPublished}
          editable
          formatSelectedOption={option => {
            return (
                <span>
                  <Badge standalone margin="0 xx-small xxx-small 0" count={questionTips[option.value]}/>
                  {option.label}
                </span>
            )
          }
          }
          multiple={ruleType === 'credit'}
          onChange={onChange.bind(this, equationId, equationType, ruleIndex, ruleOperator, ruleJoinType)}
      >
        {options}
      </Select>
  )
}

export default flow(
    DragSource('rule', ruleSource, (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging(),
    })),
    DropTarget('rule', ruleTarget, connect => ({
      connectDropTarget: connect.dropTarget(),
    })))(Rule);