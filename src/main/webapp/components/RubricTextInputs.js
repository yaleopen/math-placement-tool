import React from 'react'
import TextInput from '@instructure/ui-forms/lib/components/TextInput'
import Grid, {GridRow, GridCol} from '@instructure/ui-layout/lib/components/Grid'

function RubricTextInputs(props) {
  const {title, placement, feedback, onTextChange} = props;
  return (
      <Grid colSpacing="large" rowSpacing="small">
        <GridRow>
          <GridCol>
            <TextInput
                onChange={onTextChange}
                readOnly={sessionStorage.isCoursePublished === 'true'}
                name="title"
                label="Title"
                value={title}
            />
          </GridCol>
          <GridCol>
            <TextInput
                onChange={onTextChange}
                readOnly={sessionStorage.isCoursePublished === 'true'}
                name="placement"
                label="Course Placement"
                value={placement}
            />
          </GridCol>
        </GridRow>
        <GridRow>
          <GridCol>
            <TextInput
                onChange={onTextChange}
                readOnly={sessionStorage.isCoursePublished === 'true'}
                name="feedback"
                label="Feedback"
                value={feedback}
            />
          </GridCol>
        </GridRow>
      </Grid>
  );
}

export default RubricTextInputs;