import React from 'react';
import Button from '@instructure/ui-buttons/lib/components/Button';
import View from '@instructure/ui-layout/lib/components/View';
import IconX from '@instructure/ui-icons/lib/Line/IconX';
import Grid, {GridRow, GridCol} from '@instructure/ui-layout/lib/components/Grid';
import Select from '@instructure/ui-forms/lib/components/Select';
import NumberInput from '@instructure/ui-forms/lib/components/NumberInput';
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent';
import Badge from '@instructure/ui-elements/lib/components/Badge';
import IconCheck from '@instructure/ui-icons/lib/Line/IconCheck';

function Rule(props) {
  const {rule, equationId, equationType, ruleIndex, ruleJoinType, questions, questionGroups, onCreditRuleQuestionChange,
    onAnswerRuleQuestionChange, onOperatorChange, onAnswerSelectChange, onCreditInputChange, onDeleteRuleClick} = props;
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
  return (
      <View
          as="div"
          margin="0"
          padding="xx-small"
      >

        <Grid vAlign="middle" rowSpacing="small" colSpacing="small">
          <GridRow>
            <GridCol>
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
              />
            </GridCol>
            <GridCol width={2}>
              <RuleOperatorSelect
                  ruleType={ruleType}
                  operator={ruleOperator}
                  equationId={equationId}
                  equationType={equationType}
                  ruleIndex={ruleIndex}
                  ruleJoinType={ruleJoinType}
                  onChange={onOperatorChange}
              />
            </GridCol>
            <GridCol width={2}>
              {ruleType === 'credit' ?
                  <RuleCreditInput
                      criteria={ruleCriteriaValue}
                      equationId={equationId}
                      equationType={equationType}
                      ruleIndex={ruleIndex}
                      ruleOperator={ruleOperator}
                      ruleJoinType={ruleJoinType}
                      onChange={onCreditInputChange}
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
                  />
              }
            </GridCol>
            <GridCol width="auto">
              <Button
                  onClick={onDeleteRuleClick.bind(this, equationId, equationType, ruleIndex, ruleJoinType)}
                  disabled={sessionStorage.isCoursePublished === 'true'}
                  variant="icon"
                  margin="0"
              >
                <IconX/>
              </Button>
            </GridCol>
          </GridRow>
        </Grid>
      </View>
  )
}

function RuleOperatorSelect(props) {
  const {ruleType, operator, equationId, equationType, ruleIndex, ruleJoinType, onChange} = props;
  return (
      <Select
          value={operator}
          readOnly={sessionStorage.isCoursePublished === 'true'}
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
  const {criteria, equationId, equationType, ruleIndex, ruleOperator, ruleJoinType, onChange} = props;
  return (
      <NumberInput
          min={0}
          value={criteria}
          readOnly={sessionStorage.isCoursePublished === 'true'}
          onChange={onChange.bind(this, equationId, equationType, ruleIndex, ruleOperator, ruleJoinType)}
          showArrows={false}
          label={<ScreenReaderContent>Rule Credit Input</ScreenReaderContent>}
      />
  )
}

function RuleAnswerSelect(props) {
  const {criteria, answers, equationId, equationType, ruleIndex, ruleOperator, ruleJoinType, onChange} = props;
  const options = answers.map((answer) => {
    return <option key={answer.id} value={`answer_${answer.id}`} icon={answer.weight === 100 ? GreenIconCheck : RedIconX}>{answer.text}</option>
  });
  return (
      <Select
          value={criteria}
          readOnly={sessionStorage.isCoursePublished === 'true'}
          onChange={onChange.bind(this, equationId, equationType, ruleIndex, ruleOperator, ruleJoinType)}
          label={<ScreenReaderContent>Rule Answer Select</ScreenReaderContent>}
      >
        {options}
      </Select>
  )
}

function GreenIconCheck(){
  return(
      <IconCheck title="Correct" style={{color: '#00AC18'}}/>
  )
}

function RedIconX(){
  return(
      <IconX title="Incorrect" style={{color: '#EE0612'}}/>
  )
}

function QuizQuestionSelect(props) {
  let questionTips = {};
  const {equationId, equationType, ruleIndex, ruleType, ruleOperator, ruleJoinType, questionIds, questions, questionGroups, onChange} = props;
  const options = [];
  questions.forEach((question) => {
    options.push(<option key={`question_${question.id}`} value={ruleType === 'credit' ? `question_${question.id}.points` : `question_${question.id}.answer`}>{`Q${question.position}`}</option>);
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
          readOnly={sessionStorage.isCoursePublished === 'true'}
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

export default Rule;