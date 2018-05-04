import React, {Component} from 'react'
import Button from '@instructure/ui-buttons/lib/components/Button'
import Modal, {ModalHeader, ModalBody, ModalFooter} from '@instructure/ui-overlays/lib/components/Modal'
import Heading from '@instructure/ui-elements/lib/components/Heading'
import update from 'immutability-helper'
import Equation from '../components/Equation'
import CloseModalButton from "../components/CloseModalButton";
import EquationHeader from "../components/EquationHeader";
import RubricTextInputs from "../components/RubricTextInputs";

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
      newEquations: [...this.state.newEquations, {
        id: `newEquation${this.state.newEquations.length}`,
        rule: {
          'and': []
        }
      }]
    })
  };

  handleEquationJoinConditionChange = (event, value) => {
    this.setState({
      equationJoinType: value
    })
  };

  handleNewCreditRuleClick = (equationId, equationType, ruleJoinType) => {
    const equations = equationType === 'new' ? this.state.newEquations : this.state.equations;
    const equationIndex = equations.findIndex(equation => equation.id === equationId);
    const creditRuleTemplate = [{"==": [{'+': []}, 0]}];
    const updatedEquations = update(equations, {[equationIndex]: {rule: {[ruleJoinType]: {$push: creditRuleTemplate}}}});
    if (equationType === 'new') {
      this.setState({
        newEquations: updatedEquations
      })
    }
    else if (equationType === 'existing') {
      this.setState({
        equations: updatedEquations
      })
    }
  };

  handleNewAnswerRuleClick = (equationId, equationType, ruleJoinType) => {
    const equations = equationType === 'new' ? this.state.newEquations : this.state.equations;
    const equationIndex = equations.findIndex(equation => equation.id === equationId);
    const answerRuleTemplate = [{"==": [{'var': ''}, '']}];
    const updatedEquations = update(equations, {[equationIndex]: {rule: {[ruleJoinType]: {$push: answerRuleTemplate}}}});
    if (equationType === 'new') {
      this.setState({
        newEquations: updatedEquations
      })
    }
    else if (equationType === 'existing') {
      this.setState({
        equations: updatedEquations
      })
    }
  };

  handleCreditRuleQuestionChange = (equationId, equationType, ruleIndex, ruleOperator, ruleJoinType, event, options) => {
    const equations = equationType === 'new' ? this.state.newEquations : this.state.equations;
    const equationIndex = equations.findIndex(equation => equation.id === equationId);
    const updatedOptions = options.map(option => {
      return {"var": option.id};
    });
    const updatedEquations = update(equations, {[equationIndex]: {rule: {[ruleJoinType]: {[ruleIndex]: {[ruleOperator]: {0: {'+': {$set: updatedOptions}}}}}}}});
    if (equationType === 'new') {
      this.setState({
        newEquations: updatedEquations
      })
    }
    else if (equationType === 'existing') {
      this.setState({
        equations: updatedEquations
      })
    }
  };

  handleAnswerRuleQuestionChange = (equationId, equationType, ruleIndex, ruleOperator, ruleJoinType, event, option) => {
    const equations = equationType === 'new' ? this.state.newEquations : this.state.equations;
    const equationIndex = equations.findIndex(equation => equation.id === equationId);
    const updatedEquations = update(equations, {[equationIndex]: {rule: {[ruleJoinType]: {[ruleIndex]: {[ruleOperator]: {0: {'var': {$set: option ? option.id : ''}}}}}}}});
    if (equationType === 'new') {
      this.setState({
        newEquations: updatedEquations
      })
    }
    else if (equationType === 'existing') {
      this.setState({
        equations: updatedEquations
      })
    }
  };

  handleOperatorChange = (equationId, equationType, ruleIndex, ruleOperator, ruleJoinType, event, option) => {
    const equations = equationType === 'new' ? this.state.newEquations : this.state.equations;
    const equationIndex = equations.findIndex(equation => equation.id === equationId);
    const rule = equations[equationIndex].rule[ruleJoinType][ruleIndex];
    const updatedRule = {[option.id]:rule[ruleOperator]};
    const updatedEquations = update(equations, {[equationIndex]: {rule: {[ruleJoinType]: {$splice: [[[ruleIndex], 1, updatedRule]]}}}});
    if (equationType === 'new') {
      this.setState({
        newEquations: updatedEquations
      })
    }
    else if (equationType === 'existing') {
      this.setState({
        equations: updatedEquations
      })
    }
  };

  handleAnswerSelectChange = (equationId, equationType, ruleIndex, ruleOperator, ruleJoinType, event, option) => {
    const equations = equationType === 'new' ? this.state.newEquations : this.state.equations;
    const equationIndex = equations.findIndex(equation => equation.id === equationId);
    const updatedEquations = update(equations, {[equationIndex]: {rule: {[ruleJoinType]: {[ruleIndex]: {[ruleOperator]: {1: {$set: option}}}}}}});
    if (equationType === 'new') {
      this.setState({
        newEquations: updatedEquations
      })
    }
    else if (equationType === 'existing') {
      this.setState({
        equations: updatedEquations
      })
    }
  };

  handleCreditInputChange = (equationId, equationType, ruleIndex, ruleOperator, ruleJoinType, event, numberAsString, parsedNumber) => {
    const equations = equationType === 'new' ? this.state.newEquations : this.state.equations;
    const equationIndex = equations.findIndex(equation => equation.id === equationId);
    const updatedEquations = update(equations, {[equationIndex]: {rule: {[ruleJoinType]: {[ruleIndex]: {[ruleOperator]: {1: {$set: parsedNumber ? parsedNumber : 0}}}}}}});
    if (equationType === 'new') {
      this.setState({
        newEquations: updatedEquations
      })
    }
    else if (equationType === 'existing') {
      this.setState({
        equations: updatedEquations
      })
    }
  };

  handleRuleJoinChange = (equationId, equationType, ruleJoinType, event, value) => {
    const equations = equationType === 'new' ? this.state.newEquations : this.state.equations;
    const equationIndex = equations.findIndex(equation => equation.id === equationId);
    const updatedEquation = {[value]: equations[equationIndex].rule[ruleJoinType]};
    const updatedEquations = update(equations, {[equationIndex]: {rule: {$set: updatedEquation}}});
    if (equationType === 'new') {
      this.setState({
        newEquations: updatedEquations
      })
    }
    else if (equationType === 'existing') {
      this.setState({
        equations: updatedEquations
      })
    }
  };

  handleDeleteEquationClick = (equationId, equationType) => {
    const equations = equationType === 'new' ? this.state.newEquations : this.state.equations;
    const equationIndex = equations.findIndex(equation => equation.id === equationId);
    const updatedEquations = update(equations, {$splice: [[[equationIndex], 1]]});
    if (equationType === 'new') {
      this.setState({
        newEquations: updatedEquations
      })
    }
    else if (equationType === 'existing') {
      this.setState({
        equations: updatedEquations
      })
    }
  };

  handleDeleteRuleClick = (equationId, equationType, ruleIndex, ruleJoinType) => {
    const equations = equationType === 'new' ? this.state.newEquations : this.state.equations;
    const equationIndex = equations.findIndex(equation => equation.id === equationId);
    const updatedEquations = update(equations, {[equationIndex]: {rule: {[ruleJoinType]: {$splice: [[[ruleIndex], 1]]}}}});
    console.log(updatedEquations);
    if (equationType === 'new') {
      this.setState({
        newEquations: updatedEquations
      })
    }
    else if (equationType === 'existing') {
      this.setState({
        equations: updatedEquations
      })
    }
  };

  render() {
    const {show, onDismiss, heading, submitText, questions, questionGroups} = this.props;
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
              questions={questions}
              questionGroups={questionGroups}
              onNewCreditRuleClick={this.handleNewCreditRuleClick}
              onNewAnswerRuleClick={this.handleNewAnswerRuleClick}
              onCreditRuleQuestionChange={this.handleCreditRuleQuestionChange}
              onAnswerRuleQuestionChange={this.handleAnswerRuleQuestionChange}
              onAnswerSelectChange={this.handleAnswerSelectChange}
              onCreditInputChange={this.handleCreditInputChange}
              onOperatorChange={this.handleOperatorChange}
              onRuleJoinChange={this.handleRuleJoinChange}
              onDeleteEquationClick={this.handleDeleteEquationClick}
              onDeleteRuleClick={this.handleDeleteRuleClick}
          />
      )
    });
    const pendingEquations = newEquations.map((equation, index) => {
      const joinType = Object.keys(equation.rule)[0];
      const rules = equation.rule[joinType];
      return (
          <Equation
              key={`newEquation${index}`}
              equation={equation}
              equationType="new"
              joinType={joinType}
              rules={rules}
              questions={questions}
              questionGroups={questionGroups}
              onNewCreditRuleClick={this.handleNewCreditRuleClick}
              onNewAnswerRuleClick={this.handleNewAnswerRuleClick}
              onCreditRuleQuestionChange={this.handleCreditRuleQuestionChange}
              onAnswerRuleQuestionChange={this.handleAnswerRuleQuestionChange}
              onAnswerSelectChange={this.handleAnswerSelectChange}
              onCreditInputChange={this.handleCreditInputChange}
              onOperatorChange={this.handleOperatorChange}
              onRuleJoinChange={this.handleRuleJoinChange}
              onDeleteEquationClick={this.handleDeleteEquationClick}
              onDeleteRuleClick={this.handleDeleteRuleClick}
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
              <RubricTextInputs
                  onTextChange={this.handleTextChange}
                  title={title}
                  placement={placement}
                  feedback={feedback}
              />
              <EquationHeader
                  onNewEquationClick={this.handleNewEquationClick}
                  onEquationJoinConditionChange={this.handleEquationJoinConditionChange}
                  joinType={equationJoinType}
                  joinRadioName="equationHeaderRadio"
                  showJoinCondition={equationCount > 1}
              />
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

export default RubricModal;
