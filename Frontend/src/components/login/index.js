import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
function Login() {
  const initialValues = { password: "", email: "" };
  const [user, setUser] = useState(initialValues);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const submit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };
  useEffect(() => {
    if (isSubmitted) {
      axios.post("users/login", user).then((res) => {
        let token = res.data;
        localStorage.setItem("token", token);
        navigate("/home");
        window.location.reload();
      });
    }
  }, [isSubmitted]);
  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={submit}>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  name="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  value={user.email}
                  onChange={handleChange}
                />
                <label className="form-label" htmlFor="email">
                  Email address
                </label>
              </div>

              <div className="form-outline mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  value={user.password}
                  onChange={handleChange}
                />
                <label className="form-label" htmlFor="password">
                  Password
                </label>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <Link to="/" className="link-danger">
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
