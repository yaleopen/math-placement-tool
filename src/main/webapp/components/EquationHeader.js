import React from 'react';
import Button from '@instructure/ui-buttons/lib/components/Button';
import Flex, {FlexItem} from '@instructure/ui-layout/lib/components/Flex';
import IconPlus from '@instructure/ui-icons/lib/Line/IconPlus';
import JoinConditionRadio from "./JoinConditionRadio";

function EquationHeader(props) {
  const {joinType, joinRadioName, showJoinCondition, onNewEquationClick, onEquationJoinConditionChange} = props;
  return (
      <Flex padding="small 0">
        <FlexItem grow shrink>
          <Button
              onClick={onNewEquationClick}
              margin="0"
              disabled={sessionStorage.isCoursePublished === 'true'}
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
          />
          }
        </FlexItem>
      </Flex>
  )
}

export default EquationHeader;