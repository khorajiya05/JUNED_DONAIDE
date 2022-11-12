import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import logo from "../Assests/Images/Combo-logo.png";
import { getWithExpiry } from "../utils/helpers/password";
import { loginActionThunk } from "../ReduxStore/auth/auth.actions.async";

export const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getCredentialsData = getWithExpiry("rememberMe");
  const getRememberMe = localStorage.getItem("rememberMe");

  const [passwordType, setPasswordType] = useState("password");
  const [rememberMe, setRememberMe] = useState(Boolean(getRememberMe));
  const loginData = useSelector((state) => state.auth?.loginData);

  /**
   * login validation schema
   */
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Email must be a valid email address.").required("Email field is required."),
    password: Yup.string().required("Password field is required."),
  });

  /**
   * login submit handler
   */
  const formikLogin = useFormik({
    initialValues: {
      email: getCredentialsData?.email || "",
      password: getCredentialsData?.password || "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(
        loginActionThunk(
          {
            email: values.email,
            password: values.password,
          },
          rememberMe
        )
      );
    },
  });

  const { errors, touched } = formikLogin;

  const togglePassword = (e) => {
    e.preventDefault()
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  useEffect(() => {
if(loginData){
  navigate('/admin-tools');
}
  },[loginData])

  return (
    <div>
      <main className="login-bg">

        <div className="bg-main-login">
          <div className="singp-link">
            Dont have Account ?
            <Link to="/onboarding" className="btn btn-readmore btn-get-started">
              Sign Up {" "}
              <i className="fa fa-long-arrow-right ms-2" aria-hidden="true"></i>
            </Link>
          </div>


        </div>
        <div className="Login-form">
          <div className="login-logo-heading">
            <img src={logo} width={140} alt="logo" />
          </div>
          <div className="login-container">


            <div className="login-container-inner">
              <form >
                <div className="login-main-heading">
                  <h2>Welcome <span>Back</span></h2>
                  <p>Please enter your detail below to login.</p>
                </div>

                <div className="mb-3 field-set-form">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control cstm-field"
                    placeholder="Enter Email"
                    onChange={formikLogin.handleChange}
                    onBlur={formikLogin.handleBlur}
                    value={formikLogin.values.email}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        formikLogin.handleSubmit();
                      }
                    }}
                  />
                  {errors.email && touched.email && (<div className="text-danger">{errors.email}</div>)}
                </div>
                <div className="mb-3 field-set-form">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    onCopy={()=>false}
                    onCut={()=>false}
                    onDrag={()=>false}
                    onDrop={()=>false}
                    autoComplete="off"
                    type={passwordType}
                    id="password"
                    name="password"
                    className="form-control cstm-field"
                    placeholder="Enter Password"
                    value={formikLogin.values.password}
                    onChange={formikLogin.handleChange}
                    onBlur={formikLogin.handleBlur}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        formikLogin.handleSubmit();
                      }
                    }}
                  />
                  <button
                    className="btn btn-outline-primary hide-show-eye"
                    onClick={(e) => togglePassword(e)}
                  >
                    {passwordType === "password" ? (
                      <i className="fa fa-eye-slash"></i>
                    ) : (
                      <i className="fa fa-eye"></i>
                    )}
                  </button>
                  {errors.password && touched.password && (<div className="text-danger">{errors.password}</div>)}
                </div>
                <div className="d-flex  align-items-center justify-content-between mb-3">
                  <div className="d-flex  align-items-center position-relative ">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          formikLogin.handleSubmit();
                        }
                      }} className="me-2"
                    />
                    <span className="me-3 clr-lowwhite">Remember me</span>
                  </div>
                  <Link to="/forgotpassword" className="forget-link">
                    Forgot Password?
                  </Link>
                </div>
                <div className="text-center login-cstm-button ">
                  <input
                    className="btn login-btn w-100"
                    type="button"
                    value="LOGIN"
                    onClick={() => formikLogin.handleSubmit()}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        formikLogin.handleSubmit();
                      }
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Login;
