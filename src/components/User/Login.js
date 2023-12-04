import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../Header/Header";
import swal from "sweetalert";
import { login } from "../../api/auth";

const Login = () => {
  const [userName, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userLogin = {
      userName: userName,
      password: password,
    };

    if (await login(userLogin)) {
      setEmail("");
      setPassword("");
      swal("Login Successful!", " ", "success", {
        button: false,
        timer: 1000,
      }).then(() => navigate("/home"));
      return;
    }

    swal("Invalid Credentials", " ", "warning", {
      button: false,
      timer: 1000,
    }).then(() => navigate("/login"));
  };

  return (
    <div>
      <Header />
      <div className="Auth-form-container">
      <form
        className="Auth-form"
        onSubmit={handleSubmit}
      >
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Login</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
          value={userName}
              className="form-control mt-1"
              placeholder="Enter email"
              required={true}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
          value={password}
              className="form-control mt-1"
              placeholder="Enter password"
              required={true}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
          <p className="forgot-password text-right mt-2">
            <Link to="/reset-password" className="forgotPassword" replace>
          Forgot Password
        </Link>
          </p>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Login;
