import React from 'react';
import { CloseButton } from '@instructure/ui-buttons';

function CloseModalButton(props) {
  const {onDismiss} = props;
  return (
      <CloseButton
          placement="end"
          offset="medium"
          variant="icon"
          onClick={onDismiss}
      >
        Close
      </CloseButton>
  );
}

export default CloseModalButton;