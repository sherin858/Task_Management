function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <nav className="navbar navbar-dark bg-primary mb-5">
      <div className="container-fluid">
        <a className="navbar-brand">
          <i className="bi bi-check-circle"></i> Task
        </a>
        <button
          style={{
            border: "none",
            backgroundColor: "transparent",
            color: "white",
            fontSize: "1.25rem",
          }}
          type="button"
          onClick={logout}
        >
          Log out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
