import React from "react";
import { useState } from "react";
import logo from "../Assests/Images/Combo-logo.png";
import UserService from "../Services/UserServices";
import MembershipService from "../Services/MemberShipService";
import { Link, useNavigate } from "react-router-dom";
export const Forgotpassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [color, setColor] = useState("");

  const ValidateFields = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter email-id.");
      setColor("red");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setError("Please enter valid email-id like(test@gmail.com)");
      setColor("red");
    } else {
      const res = await MembershipService.checkExistingEmailID(email);

      if (res.data.data === null) {
        setError("This email is not exist");
        setColor("red");
      } else {
        setError();
        sendMail();
      }
    }
  };

  const sendMail = (e) => {
    localStorage.setItem("email", email);

    const emailDetails = {
      To: email,
      Type: "ForgotPassword",
    };

    UserService.sendEmail(emailDetails)

      .then((userResponse) => {
        if (userResponse.data.status === "Accepted") {
          setColor("green");

          setError("Mail has been sent to your email-id for reset password.");
        } else {
          setColor("red");
          setError("Something went wrong.");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <main className="login-bg">
      <div className="bg-main-login">
          <div className="singp-link">
                Already have Account ?
              <Link to="/login" className="btn btn-readmore btn-get-started">
              Login {" "}
              <i className="fa fa-long-arrow-right ms-2" aria-hidden="true"></i>
            </Link>
              </div>
             
             
        </div>
        <div className="Login-form">  
        <div className="login-logo-heading">
            <img src={logo} width={140} alt="logo" />
          </div>
        <div className="login-container">
          

          <div className="forgot-password-inner">
            <form method="post">
              <div className="login-main-heading">
                <h2>Forgot <span>Password</span></h2>
                <p>
                  Lost your password? Please enter your email address below to
                  receive a link via email to create a new password.
                </p>
              </div>
              <div className="mb-3 field-set-form">
                <label htmlFor="name" className="form-label">
                  Email
                </label>
                <input
                  type="Email"
                  name="email"
                  className="form-control cstm-field"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="text-center login-cstm-button ">
                <input
                  type="button"
                  value="SUBMIT"
                  className="btn login-btn w-100"
                  onClick={ValidateFields}
                />
              </div>
              <span style={{ color: color }}>{error}</span>
            </form>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
};

export default Forgotpassword;
