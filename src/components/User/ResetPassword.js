import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import swal from "sweetalert";
import { isEmailExist, resetPassword } from "../../api/auth";
import validateForm from "./util";

const ResetPassword = () => {
  const [userName, setEmail] = useState("");
  const [contactNumber, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      userName: userName,
      contactNumber: contactNumber,
      password: password,
    };

    const errors = validateForm({ ...userData, password1: password1 });

    if (errors) {
      swal("Oops..", errors.password, "warning");
      return;
    }
    if (!(await isEmailExist(userName))) {
      swal("Oops..", "Email not registered!", "error");
      return;
    }
    if (await resetPassword(userData)) {
      setContact("");
      setEmail("");
      setPassword("");
      swal("Success", "Password Updated! Login to proceed..", "success", {
        button: false,
        timer: 1000,
      }).then(() => navigate("/login"));
      return;
    }
    swal("Oops..", "Error changing password", "error");
  };

  return (
    <div>
      <Header />
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Reset Password</h3>
            <div className="form-group mt-3">
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={userName}
                className="form-control mt-1"
                placeholder="Enter Email"
                required={true}
              />
            </div>
            <div className="form-group mt-3">
              <input
                type="text"
                onChange={(e) => setContact(e.target.value)}
                value={contactNumber}
                className="form-control mt-1"
                placeholder="Enter ContactNumber"
                required={true}
              />
            </div>
            <div className="form-group mt-3">
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="form-control  mt-1"
                placeholder="Enter New Password"
                required={true}
              />
            </div>
            <div className="form-group mt-3">
              <input
                type="password"
                onChange={(e) => setPassword1(e.target.value)}
                value={password1}
                className="form-control  mt-1"
                placeholder="Confirm New Password"
                required={true}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-warning">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
