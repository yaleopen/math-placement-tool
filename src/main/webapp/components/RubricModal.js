import React, {Component} from 'react';
import CloseButton from '@instructure/ui-buttons/lib/components/CloseButton';
import Button from '@instructure/ui-buttons/lib/components/Button';
import Modal, {ModalHeader, ModalBody, ModalFooter} from '@instructure/ui-overlays/lib/components/Modal';
import Heading from '@instructure/ui-elements/lib/components/Heading';
import Select from '@instructure/ui-forms/lib/components/Select';
import TextInput from '@instructure/ui-forms/lib/components/TextInput';
import Grid, {GridRow, GridCol} from '@instructure/ui-layout/lib/components/Grid';
import NumberInput from '@instructure/ui-forms/lib/components/NumberInput';
import ScreenReaderContent from '@instructure/ui-a11y/lib/components/ScreenReaderContent';
import Flex, {FlexItem} from '@instructure/ui-layout/lib/components/Flex'
import IconPlus from '@instructure/ui-icons/lib/Line/IconPlus'
import RadioInputGroup from '@instructure/ui-forms/lib/components/RadioInputGroup'
import RadioInput from '@instructure/ui-forms/lib/components/RadioInput'
import View from '@instructure/ui-layout/lib/components/View'
import IconX from '@instructure/ui-icons/lib/Line/IconX'
import Tooltip from '@instructure/ui-overlays/lib/components/Tooltip'
import IconTrash from '@instructure/ui-icons/lib/Line/IconTrash'
import update from 'immutability-helper'

class RubricModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.rubric && this.props.rubric.title,
      placement: this.props.rubric && this.props.rubric.placement,
      feedback: this.props.rubric && this.props.rubric.feedback,
      equationJoinType: this.props.equationJoinType,
      equations: this.props.equations ? this.props.equations : [],
      newEquations: []
    };
  }

  handleTextChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  };

  handleNewEquationClick = () => {
    this.setState({
      newEquations:[...this.state.newEquations,{
        id: `newEquation${this.state.newEquations.length}`,
        rule: {
          'and': []
        }
      }]
    })
  };

  handleNewCreditRuleClick = (equationId, equationType, ruleJoinType) => {
    const equations = equationType === 'new' ? this.state.newEquations : this.state.equations;
    const equationIndex = equations.findIndex(equation => equation.id === equationId);
    const creditRuleTemplate = [{"==" : [ {'+':[]}, 0] }];
    const updatedEquations = update(equations, {[equationIndex]: {rule: {[ruleJoinType]: {$push: creditRuleTemplate}}}});
    console.log(updatedEquations);
    if(equationType === 'new'){
      this.setState({
        newEquations: updatedEquations
      })
    }
    else if(equationType === 'existing'){
      this.setState({
        equations: updatedEquations
      })
    }
  };

  handleCreditRuleQuestionChange = (equationId, equationType, ruleIndex, ruleOperator, ruleJoinType, event, options) => {
    const equations = equationType === 'new' ? this.state.newEquations : this.state.equations;
    const equationIndex = equations.findIndex(equation => equation.id === equationId);
    const updatedOptions = options.map(option => {
      return {"var":option.id};
    });
    const updatedEquations = update(equations, {[equationIndex]: {rule: {[ruleJoinType]: {[ruleIndex]: {[ruleOperator]: {0: {'+': {0: {$set: updatedOptions}}}}}}}}});
    if(equationType === 'new'){
      this.setState({
        newEquations: updatedEquations
      })
    }
    else if(equationType === 'existing'){
      this.setState({
        equations: updatedEquations
      })
    }
  };

  render() {
    const {show, onDismiss, heading, submitText} = this.props;
    const {title, placement, feedback, equations, newEquations, equationJoinType} = this.state;
    const existingEquations = equations.map((equation) => {
      const joinType = Object.keys(equation.rule)[0];
      const rules = equation.rule[joinType];
      return (
          <Equation
              key={`equation${equation.id}`}
              equation={equation}
              equationType="existing"
              joinType={joinType}
              rules={rules}
              onNewCreditRuleClick={this.handleNewCreditRuleClick}
              onCreditRuleQuestionChange={this.handleCreditRuleQuestionChange}
          />
      )
    });
    const pendingEquations = newEquations.map((equation,index) => {
      const joinType = Object.keys(equation.rule)[0];
      const rules = equation.rule[joinType];
      return (
          <Equation
              key={`newEquation${index}`}
              equation={equation}
              equationType="new"
              joinType={joinType}
              rules={rules}
              onNewCreditRuleClick={this.handleNewCreditRuleClick}
              onCreditRuleQuestionChange={this.handleCreditRuleQuestionChange}
          />
      )
    });
    const equationCount = equations.length + newEquations.length;
    return (
        <div>
          <Modal
              open={show}
              onDismiss={onDismiss}
              size="large"
              label="Rubric Modal"
              shouldCloseOnDocumentClick={false}
          >
            <ModalHeader>
              <CloseModalButton onDismiss={onDismiss}/>
              <Heading>{heading}</Heading>
            </ModalHeader>
            <ModalBody>
              <RubricTextInputFields
                  onTextChange={this.handleTextChange}
                  title={title}
                  placement={placement}
                  feedback={feedback}
              />
              <EquationHeader onNewEquationClick={this.handleNewEquationClick} joinType={equationJoinType} showJoinCondition={equationCount > 1}/>
              {existingEquations}
              {pendingEquations}
            </ModalBody>
            <ModalFooter>
              <Button onClick={onDismiss}>Close</Button>&nbsp;
              <Button onClick={onDismiss} variant="primary">{submitText}</Button>
            </ModalFooter>
          </Modal>
        </div>
    );
  }
}

function RubricTextInputFields(props) {
  return (
      <Grid colSpacing="large" rowSpacing="small">
        <GridRow>
          <GridCol>
            <TextInput
                onChange={props.onTextChange}
                name="title"
                label="Title"
                value={props.title}
            />
          </GridCol>
          <GridCol>
            <TextInput
                onChange={props.onTextChange}
                name="placement"
                label="Course Placement"
                value={props.placement}
            />
          </GridCol>
        </GridRow>
        <GridRow>
          <GridCol>
            <TextInput
                onChange={props.onTextChange}
                name="feedback"
                label="Feedback"
                value={props.feedback}
            />
          </GridCol>
        </GridRow>
      </Grid>
  );
}

function CloseModalButton(props) {
  return (
      <CloseButton
          placement="end"
          offset="medium"
          variant="icon"
          onClick={props.onDismiss}
      >
        Close
      </CloseButton>
  );
}

function JoinConditionRadio(props) {
  return (
      <RadioInputGroup
          layout="inline"
          name={props.name}
          defaultValue={props.joinType}
          description=""
          variant="toggle"
          disabled={props.disabled}>
        <RadioInput label="And" value="and"/>
        <RadioInput label="Or" value="or"/>
      </RadioInputGroup>
  )
}

function RuleOperatorSelect(props) {
  return (
      <Select defaultOption={props.operator} label={<ScreenReaderContent>Rule Operator Select</ScreenReaderContent>}>
        <option value="==">=</option>
        <option disabled={props.ruleType === 'answer'} value="<=">&lt;=</option>
        <option disabled={props.ruleType === 'answer'} value=">=">&gt;=</option>
      </Select>
  )
}

function RuleCreditInput(props) {
  return (
      <NumberInput
          defaultValue={props.criteria}
          showArrows={false}
          label={<ScreenReaderContent>Rule Credit Input</ScreenReaderContent>}
      />
  )
}

function RuleAnswerSelect(props) {
  return (
      <Select defaultOption={props.criteria} label={<ScreenReaderContent>Rule Answer Select</ScreenReaderContent>}>
        <option value="a">A</option>
        <option value="b">B</option>
        <option value="c">C</option>
      </Select>
  )
}

function QuizQuestionSelect(props) {
  const questions = {
    q1: "student selected answer (B)",
    q2: "student selected answer (A)",
    q3: "student selected answer (D)",
    q4: "student selected answer (C)",
    q5: "student selected answer (E)"
  };
  const {equationId, equationType, ruleIndex, ruleOperator, ruleJoinType} = props;
  return (
      <Select
          label={<ScreenReaderContent>Quiz Question Select</ScreenReaderContent>}
          value={props.ruleType === 'credit' ? props.questionIds : props.questionIds[0]}
          editable
          formatSelectedOption={option => {
            return (
                <Tooltip tip={questions[option.value]}>
                  {option.label}
                </Tooltip>
            )
          }
          }
          multiple={props.ruleType === 'credit'}
          onChange={props.onChange.bind(this,equationId, equationType, ruleIndex, ruleOperator, ruleJoinType)}
      >
        <option value="q1">Q1</option>
        <option value="q2">Q2</option>
        <option value="q3">Q3</option>
        <option value="q4">Q4</option>
        <option value="q5">Q5</option>
      </Select>
  )
}


function RuleHeader(props) {
  return (
      <Flex padding="xx-small">
        <FlexItem grow shrink>
          <Button onClick={props.onNewCreditRuleClick.bind(this, props.equation.id, props.equationType, props.ruleJoinType)} margin="0 xx-small 0 0">
            <IconPlus/> Credit Rule
          </Button>
          <Button margin="0 xx-small 0 0">
            <IconPlus/> Answer Rule
          </Button>
        </FlexItem>
        <FlexItem>
          <Button variant="icon" margin="0">
            <IconTrash style={{color: '#EE0612'}}/>
          </Button>
        </FlexItem>
      </Flex>
  )
}

function RuleFooter(props) {
  return (
      <Flex justifyItems="end" padding="xx-small">
        <FlexItem>
          <JoinConditionRadio joinType={props.joinType} name="radio1"/>
        </FlexItem>
      </Flex>
  )
}

function EquationHeader(props) {
  return (
      <Flex padding="small 0">
        <FlexItem grow shrink>
          <Button onClick={props.onNewEquationClick} margin="0">
            <IconPlus/> Equation
          </Button>
        </FlexItem>
        <FlexItem>
          {props.showJoinCondition &&
          <JoinConditionRadio joinType={props.joinType} name="radio0"/>
          }
        </FlexItem>
      </Flex>
  )
}

function Rule(props) {
  const ruleOperator = Object.keys(props.rule)[0];
  const ruleValue = props.rule[ruleOperator];
  const ruleVariable = ruleValue[0];
  const ruleCriteriaValue = ruleValue[1];
  const ruleVariableKey = Object.keys(ruleVariable)[0];
  const ruleVariableValue = ruleVariable[ruleVariableKey];
  const ruleType = ruleVariableKey === 'var' ? 'answer' : 'credit';
  let questionIds = null;
  if (ruleType === 'credit') {
    questionIds = ruleVariableValue.reduce((accumulator, currentValue) => accumulator.concat(currentValue.var), []);
  }
  else {
    questionIds = [ruleVariableValue]
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
                  equationId={props.equationId}
                  equationType={props.equationType}
                  ruleIndex={props.ruleIndex}
                  ruleOperator={ruleOperator}
                  ruleJoinType={props.ruleJoinType}
                  onChange={props.onCreditRuleQuestionChange}
              />
            </GridCol>
            <GridCol width={2}>
              <RuleOperatorSelect ruleType={ruleType} operator={ruleOperator}/>
            </GridCol>
            <GridCol width={2}>
              {ruleType === 'credit' ? <RuleCreditInput criteria={ruleCriteriaValue}/> :
                  <RuleAnswerSelect criteria={ruleCriteriaValue}/>}
            </GridCol>
            <GridCol width="auto">
              <Button variant="icon" margin="0">
                <IconX/>
              </Button>
            </GridCol>
          </GridRow>
        </Grid>
      </View>
  )
}

function Equation(props) {
  return (
      <View
          as="div"
          margin="0 0 small 0"
          padding="xx-small"
          background="default"
          borderWidth="small"
      >
        <RuleHeader
            equation={props.equation}
            equationType={props.equationType}
            ruleJoinType={props.joinType}
            onNewCreditRuleClick={props.onNewCreditRuleClick}
        />
        {props.rules.map((rule, index) => {
          return(
              <Rule
                  key={`rule${index}`}
                  rule={rule}
                  ruleIndex={index}
                  equationId={props.equation.id}
                  equationType={props.equationType}
                  ruleJoinType={props.joinType}
                  onCreditRuleQuestionChange={props.onCreditRuleQuestionChange}
              />
          )
        })}
        {props.rules.length > 1 && <RuleFooter joinType={props.joinType}/>}
      </View>
  )
}

export default RubricModal;
