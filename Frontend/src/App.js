import "./App.css";
import Login from "./components/login";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Register from "./components/register";
import Home from "./components/home";
import { useEffect } from "react";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route
        path="/home"
        element={
          !localStorage.getItem("token") ? <Navigate to="/login" /> : <Home />
        }
      ></Route>
    </Routes>
  );
}

export default App;
