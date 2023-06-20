import { useState, useEffect } from "react";
import axios from "axios";
function AddModal() {
  const [newTask, setNewTask] = useState({ title: "" });
  const [addTask, setAddTask] = useState(false);
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
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add Task
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
                onClick={handleAddTask}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default AddModal;
