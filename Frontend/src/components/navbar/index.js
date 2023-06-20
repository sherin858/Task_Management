function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <nav class="navbar navbar-dark bg-primary mb-5">
      <div class="container-fluid">
        <a class="navbar-brand">
          <i class="bi bi-check-circle"></i> Task
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
