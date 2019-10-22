import React from 'react';
import { Button } from '@instructure/ui-buttons';
import { Flex } from '@instructure/ui-layout';
import { IconPlusLine } from '@instructure/ui-icons';
import JoinConditionRadio from "./JoinConditionRadio";

function EquationHeader(props) {
  const {joinType, joinRadioName, showJoinCondition, onNewEquationClick, onEquationJoinConditionChange, isQuizPublished} = props;
  return (
      <Flex padding="small 0">
        <Flex.Item grow shrink>
          <Button
              onClick={onNewEquationClick}
              margin="0"
              disabled={isQuizPublished}
          >
            <IconPlusLine/> Equation
          </Button>
        </Flex.Item>
        <Flex.Item>
          {showJoinCondition &&
          <JoinConditionRadio
              joinType={joinType}
              name={joinRadioName}
              onChange={onEquationJoinConditionChange}
              isQuizPublished={isQuizPublished}
          />
          }
        </Flex.Item>
      </Flex>
  )
}

export default EquationHeader;