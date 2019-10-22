import React from 'react';
import { Grid } from '@instructure/ui-layout';

function NavigationBar(props) {
  const {breadcrumbs} = props;
  return (
      <Grid vAlign="middle" colSpacing="none">
        <div style={{borderBottom: "0.0625rem solid #C7CDD1", paddingBottom: "0.125rem"}}>
          <Grid.Row>
            <Grid.Col>
              {breadcrumbs}
            </Grid.Col>
          </Grid.Row>
        </div>
      </Grid>
  )
}

export default NavigationBar;