import React from 'react'
import Flex, {FlexItem} from '@instructure/ui-layout/lib/components/Flex'
import JoinConditionRadio from "./JoinConditionRadio";

function RuleFooter(props) {
  const {joinType, joinRadioName, equationId, equationType, onRuleJoinChange} = props;
  return (
      <Flex justifyItems="end" padding="xx-small">
        <FlexItem>
          <JoinConditionRadio
              joinType={joinType}
              name={joinRadioName}
              onChange={onRuleJoinChange.bind(this, equationId, equationType, joinType)}
          />
        </FlexItem>
      </Flex>
  )
}

export default RuleFooter;