import React from 'react';
import { RadioInput, RadioInputGroup } from '@instructure/ui-forms';

function JoinConditionRadio(props) {
  const {joinType, disabled, name, onChange, isQuizPublished} = props;
  return (
      <RadioInputGroup
          layout="inline"
          name={name}
          value={joinType}
          description=""
          variant="toggle"
          disabled={disabled}
          onChange={onChange}
          readOnly={isQuizPublished}
      >
        <RadioInput label="And" value="and"/>
        <RadioInput label="Or" value="or"/>
      </RadioInputGroup>
  )
}

export default JoinConditionRadio;