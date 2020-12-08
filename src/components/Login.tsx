import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import HomePage from "../pages/Homepage";

function Login() {
  return (
    <div className="col-lg-4 col-container">
      <div className="box login-container">
        <div className="box-header">
          <h3>LogIn</h3>
        </div>
        <div className="box-body" id="loginBox">
          <div className="form-group">
            <label>username</label>
            <input type="text" className="form-control" id="usernameField" />
          </div>
          <div className="form-group">
            <label>password</label>
            <input
              type="password"
              className="form-control"
              id="passwordField"
            />
          </div>
          <div className="form-group text-right">
            <a href="#" className="forgotLink">
              Forgot Password?
            </a>
          </div>
          <div className="form-group">
            <Link
              to="/HomePage"
              id="loginBtn"
              className="btn btn-primary btn-block"
            >
              Log In
            </Link>
          </div>
        </div>
        <div className="box-body d-none" id="OtpBox">
          <p>You'll receive an sms with the OTP number</p>
          <div className="form-group">
            <label>Enter OTP</label>
            <input type="password" className="form-control" id="otpField" />
          </div>
          <div className="form-group text-right">
            <a href="#" className="forgotLink">
              Resend OTP ?
            </a>
          </div>
          <div className="form-group">
            <Link
              to="/HomePage"
              id="confirmBtn"
              className="btn btn-primary btn-block"
            >
              Confirm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
