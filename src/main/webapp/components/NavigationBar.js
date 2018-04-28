import React from 'react'
import Grid, {GridRow,GridCol} from '@instructure/ui-layout/lib/components/Grid'

function NavigationBar(props){
    return(
        <Grid vAlign="middle" colSpacing="none" >
            <div style={{borderBottom:"0.0625rem solid #C7CDD1", paddingBottom:"0.125rem"}}>
                <GridRow>
                    <GridCol>
                        {props.breadcrumbs}
                    </GridCol>
                </GridRow>
            </div>
        </Grid>
    )
}

export default NavigationBar;