import React from 'react';
import { Spinner } from '@instructure/ui-elements';
import { Overlay, Mask } from '@instructure/ui-overlays';

function Loading(props) {
  const {isLoading} = props;
  return (
      <Overlay
          open={isLoading}
          transition="fade"
          onDismiss={() => {
            this.setState({open: false})
          }}
          label="Loading"
          shouldReturnFocus
      >
        <Mask fullscreen={true}>
          <div style={{textAlign: "center"}}><Spinner renderTitle="Loading" size="large" margin="0 0 0 medium"/></div>
        </Mask>
      </Overlay>
  )
}

export default Loading;