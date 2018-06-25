import React from 'react';
import IconTrash from '@instructure/ui-icons/lib/Line/IconTrash';
import Button from '@instructure/ui-buttons/lib/components/Button';
import Flex, {FlexItem} from '@instructure/ui-layout/lib/components/Flex';
import IconPlus from '@instructure/ui-icons/lib/Line/IconPlus';

function RuleHeader(props) {
  const {onNewCreditRuleClick, equation, equationType, ruleJoinType, onNewAnswerRuleClick,
    onDeleteEquationClick, isQuizPublished} = props;
  return (
      <Flex padding="xx-small">
        <FlexItem grow shrink>
          <Button
              onClick={onNewCreditRuleClick.bind(this, equation.id, equationType, ruleJoinType)}
              disabled={isQuizPublished}
              size="small"
              margin="0 xx-small 0 0"
          >
            <IconPlus/> Credit Rule
          </Button>
          <Button
              onClick={onNewAnswerRuleClick.bind(this, equation.id, equationType, ruleJoinType)}
              disabled={isQuizPublished}
              size="small"
              margin="0 xx-small 0 0"
          >
            <IconPlus/> Answer Rule
          </Button>
        </FlexItem>
        <FlexItem>
          <Button
              onClick={onDeleteEquationClick.bind(this, equation.id, equationType)}
              disabled={isQuizPublished}
              variant="icon"
              margin="0"
          >
            <IconTrash style={{color: '#EE0612'}}/>
          </Button>
        </FlexItem>
      </Flex>
  )
}

export default RuleHeader;