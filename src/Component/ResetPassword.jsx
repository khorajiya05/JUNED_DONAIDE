import React from "react";
import logo from "../Assests/Images/Combo-logo.png";
import { useState } from "react";
import UserService from "../Services/UserServices";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import validator from "validator";


export const Resetpassword = () => {
  const history = useNavigate();
  const search = useLocation().search;

  const id = new URLSearchParams(search).get("id");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [error, setError] = useState("");
  const [color, setColor] = useState("");

  const validateResetPassword = (e) => {
    e.preventDefault();

    if (!password) {
      setError("Please enter password.");
      setColor("red");
    } else if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setError("Please enter valid password.");
      setColor("red");
    } else if (!confirmPassword) {
      setError("Please enter confirm password.");
      setColor("red");
    } else if (confirmPassword !== password) {
      setError("Confirm password is not matched with password.");
      setColor("red");
    } else {
      setError();
      ResetPassword();
    }
  };

  const ResetPassword = (e) => {
    UserService.resetPassword(id, password, confirmPassword)
      .then((userResponse) => {
        if (userResponse.data.status === "SUCCESS") {
          setError("Password reset successfully.");
          setColor("green");
          history("/login");
        } else {
          setError(userResponse.data.message);
          setColor("red");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const togglePassword = (e) => {
    e.preventDefault()
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  return (
    <div>
      <main className="login-bg">
        <div className="login-container">
          <div className="login-logo-heading">
            <img src={logo} width={140} alt="logo" />
          </div>

          <div className="reset-password-inner">
            <form method="post">
              <div className="login-main-heading">
                <h3>Reset Password</h3>

                <p>
                  Your new password must be different from previous used
                  passwords.
                </p>
              </div>

              <div className="mb-3 field-set-form">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type={passwordType}
                  onselectstart={()=>false}
                  onPaste={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                  onCopy={()=>false}
                  onCut={()=>false}
                  onDrag={()=>false}
                  onDrop={()=>false}
                  autoComplete="off"
                  name="password"
                  id="password"
                  className="form-control cstm-field"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                  <button
                  className="btn btn-outline-primary hide-show-eye"
                  onClick={togglePassword}
                >
                  {passwordType === "password" ? (
                    <i className="fa fa-eye-slash"></i>
                  ) : (
                    <i className="fa fa-eye"></i>
                  )}
                </button>
              </div>

              <div className="mb-3 field-set-form">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type={passwordType}
                  onselectstart={()=>false}
                  onPaste={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                  onCopy={()=>false}
                  onCut={()=>false}
                  onDrag={()=>false}
                  onDrop={()=>false}
                  autoComplete="off"
                  name="confirmPassword"
                  id="confirmPassword"
                  className="form-control cstm-field"
                  placeholder="Enter confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                 <button
                  className="btn btn-outline-primary hide-show-eye"
                  onClick={togglePassword}
                >
                  {passwordType === "password" ? (
                    <i className="fa fa-eye-slash"></i>
                  ) : (
                    <i className="fa fa-eye"></i>
                  )}
                </button>
              </div>
              <div className="text-center login-cstm-button ">
                <input
                  type="button"
                  value="RESET PASSWORD"
                  className="btn login-btn w-100"
                  onClick={validateResetPassword}
                />
              </div>
              <span style={{ color: color }}>{error}</span>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Resetpassword;
