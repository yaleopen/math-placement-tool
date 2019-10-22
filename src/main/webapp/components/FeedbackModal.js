import React from 'react';
import { Text, Heading } from '@instructure/ui-elements';
import { Modal } from '@instructure/ui-overlays';
import { Button } from '@instructure/ui-buttons';

function FeedbackModal(props){
  return(
      <Modal
          open={props.show}
          onDismiss={props.onDismiss}
          size="small"
          label="Feedback Modal"
          shouldCloseOnDocumentClick={false}
      >
        <Modal.Header>
          <Heading>Placement Feedback</Heading>
        </Modal.Header>
        <Modal.Body>
          <Text>{props.feedback}</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onDismiss}>Close</Button>
        </Modal.Footer>
      </Modal>
  )
}

export default FeedbackModal;