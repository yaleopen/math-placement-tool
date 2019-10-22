import React from 'react';
import { Flex } from '@instructure/ui-layout'
import JoinConditionRadio from "./JoinConditionRadio";

function RuleFooter(props) {
  const {joinType, joinRadioName, equationId, equationType, onRuleJoinChange} = props;
  return (
      <Flex justifyItems="end" padding="xx-small">
        <Flex.Item>
          <JoinConditionRadio
              joinType={joinType}
              name={joinRadioName}
              onChange={onRuleJoinChange.bind(this, equationId, equationType, joinType)}
          />
        </Flex.Item>
      </Flex>
  )
}

export default RuleFooter;