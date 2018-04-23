import React from 'react'
import Spinner from '@instructure/ui-elements/lib/components/Spinner'
import Overlay from '@instructure/ui-overlays/lib/components/Overlay'
import Mask from '@instructure/ui-overlays/lib/components/Mask'

function Loading(props) {
    return (
        <Overlay
            open={props.isLoading}
            transition="fade"
            onDismiss={() => { this.setState({ open: false })}}
            label="Loading"
            shouldReturnFocus
        >
            <Mask>
                <div style={{textAlign: "center"}}><Spinner title="Loading" size="large" margin="0 0 0 medium" /></div>
            </Mask>
        </Overlay>
    )
}

export default Loading;