import React from 'react';
import { TextInput } from '@instructure/ui-text-input';
import { Grid } from '@instructure/ui-layout';

function RubricTextInputs(props) {
  const {title, placement, feedback, onTextChange, isQuizPublished} = props;
  return (
      <Grid colSpacing="large" rowSpacing="small">
        <Grid.Row>
          <Grid.Col>
            <TextInput
                onChange={onTextChange}
                readOnly={isQuizPublished}
                name="title"
                label="Title"
                value={title}
            />
          </Grid.Col>
          <Grid.Col>
            <TextInput
                onChange={onTextChange}
                readOnly={isQuizPublished}
                name="placement"
                label="Course Placement"
                value={placement}
            />
          </Grid.Col>
        </Grid.Row>
        <Grid.Row>
          <Grid.Col>
            <TextInput
                onChange={onTextChange}
                readOnly={isQuizPublished}
                name="feedback"
                label="Feedback"
                value={feedback}
            />
          </Grid.Col>
        </Grid.Row>
      </Grid>
  );
}

export default RubricTextInputs;