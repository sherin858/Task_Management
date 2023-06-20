function ViewModal({ modalData }) {
  return (
    <div
      className="modal fade"
      id="viewModal"
      tabIndex="-1"
      aria-labelledby="viewModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="viewModalLabel">
              {modalData.title}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>Title : {modalData.title}</div>
            <div>Status : {modalData.status}</div>
            <div>Time spent : {modalData.timeSpent}</div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewModal;
