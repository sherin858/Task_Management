import axios from "axios";
import { useEffect, useState } from "react";
import ViewModal from "../view-modal";
import EditModal from "../edit-Modal";
import AddModal from "../add-modal";
import Navbar from "../navbar";
function Home() {
  const [myTasks, setMyTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "" });
  const [addTask, setAddTask] = useState(false);
  const [daletedTask, setDeletedTask] = useState(null);
  const [taskToView, setTaskToView] = useState({});
  const [taskToEdit, setTaskToEdit] = useState({ title: "" });
  const [trackingEnabled, setTrackingEnabled] = useState(true);
  const [trackedTaskId, setTrackedTaskId] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [stopTimer, setStopTimer] = useState(null);
  const [displayedTasks, setDisplayedTasks] = useState([]);
  useEffect(() => {
    axios.get("tasks").then((res) => {
      setMyTasks(res.data);
      setDisplayedTasks(res.data);
    });
  }, []);
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
  useEffect(() => {
    if (daletedTask) {
      axios
        .delete(`tasks/${daletedTask.id}`)
        .then(() => window.location.reload());
    }
  }, [daletedTask]);
  const clockIn = (id) => {
    setTrackingEnabled(false);
    setTrackedTaskId(id);
  };
  useEffect(() => {
    if (trackedTaskId) {
      axios
        .post(`tasks/clock-in/${trackedTaskId}`)
        .then(() => setStartTime(Date.now()));
    }
  }, [trackedTaskId]);

  useEffect(() => {
    if (startTime) {
      const intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [startTime]);
  function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = (minutes % 60).toString().padStart(2, "0");
    const formattedSeconds = (seconds % 60).toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }
  const clockOut = () => {
    setStopTimer(true);
  };
  useEffect(() => {
    if (stopTimer) {
      axios.post(`tasks/clock-out/${trackedTaskId}`).then(() => {
        window.location.reload();
      });
    }
  }, [stopTimer]);
  const search = (e) => {
    const title = e.target.value;
    if (title !== "") {
      const filteredTasks = myTasks.filter((task) =>
        task.title.includes(title)
      );
      setDisplayedTasks(filteredTasks);
    } else {
      setDisplayedTasks(myTasks);
    }
  };
  const formattedTime = formatTime(elapsedTime);
  return (
    <>
      <Navbar />
      <div className="container">
        {startTime && (
          <h1 style={{ textAlign: "center", width: "100%" }}>
            {formattedTime}
          </h1>
        )}

        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="mb-5"
        >
          <input
            class="form-control"
            type="text"
            placeholder="Search By Title"
            style={{ width: "200px" }}
            onChange={search}
          />
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add+
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th>Mark as Done</th>
              <th scope="col">STATUS</th>
              <th scope="col">TITLE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {displayedTasks.map((task, index) => (
              <tr key={index}>
                <td scope="row">{index + 1}</td>
                <td>
                  {task.status == "complete" ? (
                    <div className="text-success">
                      <i class="bi bi-check-circle"></i>
                    </div>
                  ) : (
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      style={{
                        cursor:
                          !trackingEnabled && task.id !== trackedTaskId
                            ? ""
                            : "pointer",
                      }}
                      disabled={!trackingEnabled && task.id !== trackedTaskId}
                      onChange={clockOut}
                    />
                  )}
                </td>
                <td>{task.status}</td>
                <td>{task.title}</td>
                <td style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => clockIn(task.id)}
                    disabled={!trackingEnabled || task.status == "complete"}
                  >
                    Track
                  </button>
                  <button
                    type="button"
                    className="btn btn-info "
                    data-bs-toggle="modal"
                    data-bs-target="#viewModal"
                    onClick={() => {
                      setTaskToView(task);
                    }}
                  >
                    Show
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                    onClick={() => {
                      setTaskToEdit(task);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => setDeletedTask(task)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
        {/* <AddModal /> */}
        <ViewModal modalData={taskToView} />
        <EditModal task={{ taskToEdit, setTaskToEdit }} />
      </div>
    </>
  );
}

export default Home;
