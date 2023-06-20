import { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function EditModal({ task, modalOptions }) {
  const { taskToEdit, setTaskToEdit } = task;
  const { showEditModal, setShowEditModal } = modalOptions;
  const { id, title } = taskToEdit;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    task.setTaskToEdit({ ...taskToEdit, [name]: value });
  };

  useEffect(() => {
    if (isSubmitted) {
      axios
        .patch(`tasks/${id}`, task.taskToEdit)
        .then(() => window.location.reload());
    }
  }, [isSubmitted]);
  const handleClose = () => setShowEditModal(false);
  return (
    <Modal show={showEditModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="email">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="form-control form-control-lg"
            value={title}
            onChange={handleChange}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => setIsSubmitted(true)}>
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditModal;
