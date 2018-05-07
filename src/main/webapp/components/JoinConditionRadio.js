import React from 'react'
import RadioInputGroup from '@instructure/ui-forms/lib/components/RadioInputGroup'
import RadioInput from '@instructure/ui-forms/lib/components/RadioInput'

function JoinConditionRadio(props) {
  const {joinType, disabled, name, onChange} = props;
  return (
      <RadioInputGroup
          layout="inline"
          name={name}
          value={joinType}
          description=""
          variant="toggle"
          disabled={disabled}
          onChange={onChange}
          readOnly={sessionStorage.isCoursePublished === 'true'}
      >
        <RadioInput label="And" value="and"/>
        <RadioInput label="Or" value="or"/>
      </RadioInputGroup>
  )
}

export default JoinConditionRadio;