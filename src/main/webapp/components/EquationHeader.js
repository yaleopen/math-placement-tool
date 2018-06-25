import React from 'react';
import Button from '@instructure/ui-buttons/lib/components/Button';
import Flex, {FlexItem} from '@instructure/ui-layout/lib/components/Flex';
import IconPlus from '@instructure/ui-icons/lib/Line/IconPlus';
import JoinConditionRadio from "./JoinConditionRadio";

function EquationHeader(props) {
  const {joinType, joinRadioName, showJoinCondition, onNewEquationClick, onEquationJoinConditionChange, isQuizPublished} = props;
  return (
      <Flex padding="small 0">
        <FlexItem grow shrink>
          <Button
              onClick={onNewEquationClick}
              margin="0"
              disabled={isQuizPublished}
          >
            <IconPlus/> Equation
          </Button>
        </FlexItem>
        <FlexItem>
          {showJoinCondition &&
          <JoinConditionRadio
              joinType={joinType}
              name={joinRadioName}
              onChange={onEquationJoinConditionChange}
              isQuizPublished={isQuizPublished}
          />
          }
        </FlexItem>
      </Flex>
  )
}

export default EquationHeader;