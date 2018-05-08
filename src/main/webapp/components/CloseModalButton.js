import React from 'react';
import CloseButton from '@instructure/ui-buttons/lib/components/CloseButton';

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