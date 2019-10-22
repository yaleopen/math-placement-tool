import React from 'react';
import { Button } from '@instructure/ui-buttons';
import { Flex } from '@instructure/ui-layout'
import { IconPlusLine, IconTrashLine } from '@instructure/ui-icons';

function RuleHeader(props) {
  const {onNewCreditRuleClick, equation, equationType, ruleJoinType, onNewAnswerRuleClick,
    onDeleteEquationClick, isQuizPublished} = props;
  return (
      <Flex padding="xx-small">
        <Flex.Item grow shrink>
          <Button
              onClick={onNewCreditRuleClick.bind(this, equation.id, equationType, ruleJoinType)}
              disabled={isQuizPublished}
              size="small"
              margin="0 xx-small 0 0"
          >
            <IconPlusLine/> Credit Rule
          </Button>
          <Button
              onClick={onNewAnswerRuleClick.bind(this, equation.id, equationType, ruleJoinType)}
              disabled={isQuizPublished}
              size="small"
              margin="0 xx-small 0 0"
          >
            <IconPlusLine/> Answer Rule
          </Button>
        </Flex.Item>
        <Flex.Item>
          <Button
              onClick={onDeleteEquationClick.bind(this, equation.id, equationType)}
              disabled={isQuizPublished}
              variant="icon"
              margin="0"
          >
            <IconTrashLine style={{color: '#EE0612'}}/>
          </Button>
        </Flex.Item>
      </Flex>
  )
}

export default RuleHeader;