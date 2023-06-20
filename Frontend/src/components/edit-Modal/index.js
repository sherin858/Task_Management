import { useEffect, useState } from "react";
import axios from "axios";
function EditModal({ task }) {
  const { taskToEdit, setTaskToEdit } = task;
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
  return (
    <div
      className="modal fade"
      id="editModal"
      tabIndex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="editModalLabel">
              Edit Task
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
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
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsSubmitted(true)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
