import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import swal from "sweetalert";
import { register, isEmailExist } from "../../api/auth";
import validateForm from "./util";

const Register = () => {
  const [firstName, setFname] = useState("");
  const [lastName, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      contactNumber: contactNumber,
      password: password,
    };

    const errors = validateForm({ ...newUser, password1: password1 });

    if (errors) {
      swal("Oops..", errors.password, "warning");
      return;
    }
    if (await isEmailExist(email)) {
      swal("Oops..", "Email Already Registered", "warning");
      return;
    }
    if (await register(newUser)) {
      setFname("");
      setLname("");
      setContact("");
      setEmail("");
      setPassword("");
      swal(
        "Success",
        "Registration Successful! Login to proceed..",
        "success",
        {
          button: false,
          timer: 1000,
        }
      ).then(() => navigate("/login"));
    }
  };

  

  return (
    <div>
      <Header />
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="form-group mt-3">
              
              <input
                type="text"
                onChange={(e) => setFname(e.target.value)}
                value={firstName}
                className="form-control mt-1"
                placeholder="Enter FirstName"
                required={true}
              />
            </div>
            <div className="form-group mt-3">
              
              <input
                type="text"
                onChange={(e) => setLname(e.target.value)}
                value={lastName}
                className="form-control mt-1"
                placeholder="Enter LastName"
                required={true}
              />
            </div>
            <div className="form-group mt-3">
              
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="form-control mt-1"
                placeholder="Enter Email"
                required={true}
              />
            </div>
            <div className="form-group mt-3">
              
              <input
                type="tel"
                onChange={(e) => setContact(e.target.value)}
                value={contactNumber}
                className="form-control mt-1"
                placeholder="Enter Contact Number"
                pattern="[0-9]{10}"
                required={true}
              />
            </div>
            <div className="form-group mt-3">
              
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="form-control mt-1"
                placeholder="Password"
                required={true}
              />
            </div>
            <div className="form-group mt-3">
              
              <input
                type="password"
                onChange={(e) => setPassword1(e.target.value)}
                value={password1}
                className="form-control mt-1"
                placeholder="Confirm Password"
                required={true}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
