import React, {Component} from 'react';
import Button from '@instructure/ui-buttons/lib/components/Button';
import Modal, {ModalHeader, ModalBody, ModalFooter} from '@instructure/ui-overlays/lib/components/Modal';
import Heading from '@instructure/ui-elements/lib/components/Heading';
import update from 'immutability-helper';
import Equation from '../components/Equation';
import CloseModalButton from "../components/CloseModalButton";
import EquationHeader from "../components/EquationHeader";
import RubricTextInputs from "../components/RubricTextInputs";
import _ from "lodash";

class RubricModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.rubric ? this.props.rubric.title : '',
      placement: this.props.rubric ? this.props.rubric.placement : '',
      feedback: this.props.rubric ? this.props.rubric.feedback : '',
      equationJoinType: this.props.rubric ? this.props.rubric.equationJoinType : 'and',
      equations: this.props.rubric ? this.props.rubric.equations : [],
      newEquations: this.props.newEquations
    };
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      title: nextProps.rubric ? nextProps.rubric.title : '',
      placement: nextProps.rubric ? nextProps.rubric.placement : '',
      feedback: nextProps.rubric ? nextProps.rubric.feedback : '',
      equationJoinType: nextProps.rubric ? nextProps.rubric.equationJoinType : 'and',
      equations: nextProps.rubric ? nextProps.rubric.equations : [],
      newEquations: nextProps.newEquations
    }
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
    const updatedEquations = update(equations, {[equationIndex]: {rule: {[ruleJoinType]: {[ruleIndex]: {[ruleOperator]: {1: {$set: option ? option.id : ''}}}}}}});
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
      const equation = equations.find(equation => equation.id === equationId);
      updatedEquations.forEach((eqToShift) => {
        if(eqToShift.priority > equation.priority){
          eqToShift.priority = eqToShift.priority - 1
        }
      });
      this.setState({
        equations: updatedEquations
      })
    }
  };

  handleDeleteRuleClick = (equationId, equationType, ruleIndex, ruleJoinType) => {
    const equations = equationType === 'new' ? this.state.newEquations : this.state.equations;
    const equationIndex = equations.findIndex(equation => equation.id === equationId);
    const updatedEquations = update(equations, {[equationIndex]: {rule: {[ruleJoinType]: {$splice: [[[ruleIndex], 1]]}}}});
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

  handleEquationMove = (id, atIndex) => {
    const { index } = this.findEquation(id);
    const equations = this.state.equations;
    const updatedEquations = update(equations, {[index]: {priority: {$set: atIndex}}, [atIndex]: {priority: {$set: index}}});
    this.setState({
      equations: updatedEquations.sort((a,b) => a.priority - b.priority)
    });
  };

  findEquation = (id) => {
    const{equations} = this.state;
    const equation = _.find(equations, c => c.id === id) || {};
    return {
      equation,
      index: equations.indexOf(equation)
    }
  };

  handleRuleMove = (equationId, atIndex, rule, ruleIndex) => {
    const { equation, index : eqIndex } = this.findEquation(equationId);
    const eqJoinType = Object.keys(equation.rule)[0];
    const swapRule = equation.rule[eqJoinType][atIndex];
    const updatedEquation = update(equation, {rule: {[eqJoinType]: {[atIndex]: {$set: rule}, [ruleIndex]: {$set: swapRule}}}});
    const equations = this.state.equations;
    const updatedEquations = update(equations, {[eqIndex]: {$set: updatedEquation}});
    this.setState({
      equations: updatedEquations
    });
  };

  render() {
    const {show, onDismiss, heading, submitText, questions, questionGroups, onNewRubricSubmit, onSaveRubricSubmit,
      isNewRubric, priority, isQuizPublished} = this.props;
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
              id={equation.id}
              onEquationMove={this.handleEquationMove}
              findEquation={this.findEquation}
              onRuleMove={this.handleRuleMove}
              isQuizPublished={isQuizPublished}
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
              isQuizPublished={isQuizPublished}
          />
      )
    });
    const equationCount = equations.length + newEquations.length;
    const newRubric = {
      title: title,
      placement: placement,
      feedback: feedback,
      newEquations: newEquations.map(equation => JSON.stringify(equation.rule)),
      equationJoinType: equationJoinType,
      priority: priority
    };
    const editRubric = {
      id: this.props.rubric ? this.props.rubric.id : null,
      title: title,
      placement: placement,
      feedback: feedback,
      newEquations: newEquations.map(equation => JSON.stringify(equation.rule)),
      existingEquations: equations.map(equation => JSON.stringify(equation)),
      equationJoinType: equationJoinType
    };
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
                  isQuizPublished={isQuizPublished}
              />
              <EquationHeader
                  onNewEquationClick={this.handleNewEquationClick}
                  onEquationJoinConditionChange={this.handleEquationJoinConditionChange}
                  joinType={equationJoinType}
                  joinRadioName="equationHeaderRadio"
                  showJoinCondition={equationCount > 1}
                  isQuizPublished={isQuizPublished}
              />
              {existingEquations}
              {pendingEquations}
            </ModalBody>
            <ModalFooter>
              <Button onClick={onDismiss}>Close</Button>&nbsp;
              <Button
                  onClick={isNewRubric ? onNewRubricSubmit.bind(this, newRubric):
                          onSaveRubricSubmit.bind(this, editRubric)}
                  variant="primary"
                  disabled={isQuizPublished}
              >
                {submitText}
              </Button>
            </ModalFooter>
          </Modal>
        </div>
    );
  }
}

export default RubricModal;
