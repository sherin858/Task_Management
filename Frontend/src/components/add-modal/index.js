import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
function AddModal({ modalOptions }) {
  const [newTask, setNewTask] = useState({ title: "" });
  const [addTask, setAddTask] = useState(false);
  const { showAddModal, setShowAddModal } = modalOptions;
  useEffect(() => {
    if (addTask) {
      axios.post("/tasks", newTask).then(() => window.location.reload());
    }
  }, [addTask]);
  const handleAddTask = (e) => {
    e.preventDefault();
    setAddTask(true);
  };
  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };
  const handleClose = () => setShowAddModal(false);
  return (
    <Modal show={showAddModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="form-control form-control-lg"
            value={newTask.title}
            onChange={handleAddChange}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddTask}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddModal;
