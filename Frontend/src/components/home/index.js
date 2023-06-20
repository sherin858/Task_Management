import axios from "axios";
import { useEffect, useState } from "react";
import ViewModal from "../view-modal";
import EditModal from "../edit-Modal";
import AddModal from "../add-modal";
import Navbar from "../navbar";
import { Button } from "react-bootstrap";
function Home() {
  const [myTasks, setMyTasks] = useState([]);
  const [daletedTask, setDeletedTask] = useState(null);
  const [taskToView, setTaskToView] = useState({});
  const [taskToEdit, setTaskToEdit] = useState({ title: "" });
  const [trackingEnabled, setTrackingEnabled] = useState(true);
  const [trackedTaskId, setTrackedTaskId] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [stopTimer, setStopTimer] = useState(null);
  const [displayedTasks, setDisplayedTasks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  useEffect(() => {
    axios.get("tasks").then((res) => {
      setMyTasks(res.data);
      setDisplayedTasks(res.data);
    });
  }, []);
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
            className="form-control"
            type="text"
            placeholder="Search By Title"
            style={{ width: "200px" }}
            onChange={search}
          />
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            Add+
          </Button>
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
                      <i className="bi bi-check-circle"></i>
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
                  <Button
                    variant="info"
                    onClick={() => {
                      setTaskToView(task);
                      setShowViewModal(true);
                    }}
                  >
                    Show
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setTaskToEdit(task);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => setDeletedTask(task)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <AddModal modalOptions={{ showAddModal, setShowAddModal }} />
        <ViewModal
          modalData={taskToView}
          modalOptions={{ showViewModal, setShowViewModal }}
        />
        <EditModal
          task={{ taskToEdit, setTaskToEdit }}
          modalOptions={{ showEditModal, setShowEditModal }}
        />
      </div>
    </>
  );
}

export default Home;
