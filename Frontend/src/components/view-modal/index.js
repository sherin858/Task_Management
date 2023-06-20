import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
function ViewModal({ modalData, modalOptions }) {
  const { showViewModal, setShowViewModal } = modalOptions;
  const handleClose = () => setShowViewModal(false);
  return (
    <Modal show={showViewModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalData.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>Title : {modalData.title}</div>
        <div>Status : {modalData.status}</div>
        <div>Time spent : {modalData.timeSpent}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ViewModal;
