import React from 'react';
import Text from '@instructure/ui-elements/lib/components/Text';
import Modal, {ModalHeader, ModalBody, ModalFooter} from '@instructure/ui-overlays/lib/components/Modal';
import Heading from '@instructure/ui-elements/lib/components/Heading';
import Button from '@instructure/ui-buttons/lib/components/Button';

function FeedbackModal(props){
  return(
      <Modal
          open={props.show}
          onDismiss={props.onDismiss}
          size="small"
          label="Feedback Modal"
          shouldCloseOnDocumentClick={false}
      >
        <ModalHeader>
          <Heading>Placement Feedback</Heading>
        </ModalHeader>
        <ModalBody>
          <Text>{props.feedback}</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={props.onDismiss}>Close</Button>
        </ModalFooter>
      </Modal>
  )
}

export default FeedbackModal;