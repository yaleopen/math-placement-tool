import React from 'react'
import View from '@instructure/ui-layout/lib/components/View'
import RuleHeader from "./RuleHeader";
import RuleFooter from "./RuleFooter";
import Rule from "./Rule";

function Equation(props) {
  const {equation, equationType, joinType, questions, questionGroups, rules, onCreditRuleQuestionChange,
    onAnswerRuleQuestionChange, onOperatorChange, onNewCreditRuleClick, onAnswerSelectChange, onCreditInputChange,
    onRuleJoinChange, onNewAnswerRuleClick, onDeleteEquationClick, onDeleteRuleClick} = props;
  return (
      <View
          as="div"
          margin="0 0 small 0"
          padding="xx-small"
          background={"default"}
          borderWidth="small"
      >
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
  )
}

export default Equation;