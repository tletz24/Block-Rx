import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ImmunizationEventTable from './ImmunizationEventTable';

function ImmunizationModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h4>Vaccine Event Information</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImmunizationEventTable
            immunizationEvent = {props.immunizationEvent}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default ImmunizationModal;