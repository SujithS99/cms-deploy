import React from 'react';
import { Modal, ModalBody, Form, Col, FormGroup, Label } from 'reactstrap';

function ConfirmationModal(props) {
  let styles= {
    'fontWeight': "bold",
    'fontSize': '26px'
  }

  return (
    <Modal
      isOpen={props.isOpen}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalBody>
        <Form>
          <FormGroup style={{"textAlign": "center"}}>
            <Col sm={90}>
              <Label style={styles}>{props.responseMessage}</Label>
            </Col>
          </FormGroup>
        </Form>
      </ModalBody>
    </Modal>
  );
}

export default ConfirmationModal
