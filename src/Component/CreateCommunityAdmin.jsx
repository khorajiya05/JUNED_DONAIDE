import React, { useState } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import SiteService from "../Services/CommunityService";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  errorStyle: {
    color: "red",
  },
};
const CreateCommunityAdmin = (porps) => {
  const { showModal, closeModal, setShowMmodal, userCommunity, roleID } = porps;

  const [coverImage, setCoverImage] = useState(null);

  const [erroeMessage, setErrorMessage] = useState([]);
  // const [values, setValues] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const validateEmail = (email) => {
    const foundUser = this.state.allUsers.find(({ email }) => email === email);
    if (foundUser) {
      return false;
    } else {
      return true;
    }
  };
  const changeHandlerImage = (event) => {
    formik.setFieldValue("profilePicture", event.target.files[0]);

    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      setCoverImage(URL.createObjectURL(event.target.files[0]));
    };
  };

  let validatePhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;

    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      communityID: "",
      profilePicture: "",
    },
    onSubmit: async (values) => {
      const roleid = roleID != 1 ? 3 : 1;
      const isMasterAdmin = roleID != 1 ? false : true;
      values.communityID = values.communityID;
      values.firstName = values.firstName;
      values.lastName = values.lastName;
      values.phone = values.phone;
      values.email = values.email;

      values.createdDate = new Date();
      values.roleID = roleid;
      values.roleID = roleid;
      values.password = values.password;
      values.createdBy = localStorage.getItem("userID");
      values.adminID = localStorage.getItem("userID");
      values.address = "";
      values.dob = "";
      values.isMasterAdmin=isMasterAdmin

      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      const res = await SiteService.AddCommunityAdminDetails(values, config);
      if (res.data) {
        NotificationManager.success("Community admin created successfully.");
        setShowMmodal(false);
      }
      if (res.data.statusCode === 208) {
        setErrorMessage(res.data.message);
      }
    },
    validate: (values) => {
      let errors = {};

      let phoneRegExp = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/i;
      let emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let passwordRegExp =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
      if (roleID != 1) {
        if (!values.communityID) {
          errors.communityID = "Please select community.";
        }
      }

      if (!values.firstName) {
        errors.firstName = "First name is required.";
      }
      if (!values.lastName) {
        errors.lastName = "Last name is required.";
      }
      if (!values.email) {
        errors.email = "Email is required field";
      } else if (!emailRegExp.test(values.email)) {
        errors.email = "Eamil is not valid.";
      }

      if (!values.phone) {
        errors.phone = "Phone number is required.";
      } else if (!phoneRegExp.test(values.phone)) {
        errors.phone = "Phone number is not valid.";
      }
      if (!values.password) {
        errors.password = "Password  is required.";
      } else if (!passwordRegExp.test(values.password)) {
        errors.password = `Min 1 uppercase letter
                        Min 1 lowercase letter.
        Min 1 special character.
        Min 1 number.
        Min 8 characters.
        Max 30 characters.`;
      }
      return errors;
    },
  });

  return (
    <div>
      <Modal
        style={customStyles}
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        backdrop="static"
      >
        <div className="moda-dialogue-custom">
          <div className="modal-header">
            <h5 className="mb-0">
              {roleID != 1 ? "Create Community Admin" : "Create Master Admin"}{" "}
            </h5>
            <button className="modal-close-btn" onClick={closeModal}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
          <div>
            <form onSubmit={formik.handleSubmit}>
              <div className="modal-body-create-grp modal-bodycstm1">
                <div className="modal-body p-0">
                  <div className="modal-create-group-upld-img mb-3">
                    <div className="create-group-upld-img Custom-profile-image">
                      <label>
                        {coverImage === null ? (
                          <div className="Profile-image">
                            <img
                              alt="Profile Pic"
                              width={"100%"}
                              src={`${process.env.PUBLIC_URL}/Images/guest-user.jpg`}
                            />
                          </div>
                        ) : (
                          coverImage !== null && (
                            <div className="">
                              <img
                                alt="not fount"
                                width={"100%"}
                                src={coverImage}
                              />
                            </div>
                          )
                        )}
                        <input
                          type="file"
                          name="myImage"
                          value={formik.values.myImage}
                          onChange={(event) => {
                            changeHandlerImage(event);
                          }}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="modal-body-create-name">
                    <div className="form-group field-set-form mb-3">
                      <div className="row">
                        {roleID != 1 && (
                          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="form-group mb-3">
                              <label className="form-label">Community</label>
                              <select
                                className="create-community"
                                name="communityID"
                                value={formik.values.communityID}
                                onChange={formik.handleChange}
                              >
                                <option value="default">
                                  Select Community
                                </option>
                                {userCommunity && userCommunity.length > 0 ? (
                                  userCommunity.map((option) => (
                                    <option
                                      key={option.communityId}
                                      value={option.communityId}
                                    >
                                      {option.communitySiteName}
                                    </option>
                                  ))
                                ) : (
                                  <>
                                    {isLoading === true ? (
                                      <div className="spinner-container">
                                        <div className="loading-spinner"></div>
                                      </div>
                                    ) : (
                                      <h1 style={{ textAlign: "center" }}>
                                        No Community
                                      </h1>
                                    )}
                                  </>
                                )}
                              </select>
                              {formik.touched.communityID &&
                              formik.errors.communityID ? (
                                <div style={customStyles.errorStyle}>
                                  {formik.errors.communityID}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        )}

                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                          <div className="form-group mb-3">
                            <label className="form-label">First Name</label>
                            <input
                              type="text"
                              className="form-control cstm-field"
                              placeholder="Enter First Name"
                              name="firstName"
                              value={formik.values.firstName}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.firstName &&
                            formik.errors.firstName ? (
                              <div style={customStyles.errorStyle}>
                                {formik.errors.firstName}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                          <div className="form-group mb-3">
                            <label className="form-label">Last Name</label>
                            <input
                              type="text"
                              className="form-control cstm-field"
                              placeholder="Enter Last Name"
                              name="lastName"
                              value={formik.values.lastName}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.lastName &&
                            formik.errors.lastName ? (
                              <div style={customStyles.errorStyle}>
                                {formik.errors.lastName}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                          <div className="form-group mb-3">
                            <label className="form-label">Phone Number</label>
                            <input
                              type="text"
                              className="form-control cstm-field"
                              placeholder="Enter Phone Number"
                              name="phone"
                              value={validatePhoneNumber(formik.values.phone)}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.phone && formik.errors.phone ? (
                              <div style={customStyles.errorStyle}>
                                {formik.errors.phone}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                          <div className="form-group mb-3">
                            <label className="form-label">Email</label>
                            <input
                              //   disabled={modelStatus}
                              type="email"
                              className="form-control cstm-field"
                              placeholder="Enter Email"
                              name="email"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            <span style={customStyles.errorStyle}>
                              {erroeMessage}
                            </span>
                            {formik.touched.email && formik.errors.email ? (
                              <div style={customStyles.errorStyle}>
                                {formik.errors.email}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                          <div className="form-group mb-3 position-relative password-field">
                            <label className="form-label">Password</label>
                            <input
                              onselectstart={()=>false}
                              onpaste="return false;"
                              onCopy={()=>false}
                              onCut={()=>false}
                              onDrag={()=>false}
                              onDrop={()=>false}
                              autoComplete="off"
                              type={passwordType}
                              className="form-control cstm-field"
                              placeholder="Password"
                              name="password"
                              value={formik.values.password}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
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
                            {formik.touched.password &&
                            formik.errors.password ? (
                              <div style={customStyles.errorStyle}>
                                {formik.errors.password}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => closeModal()}
                  className="cancel-button"
                >
                  Cancel
                </button>
                <button type="submit" className="save-button">
                
                  {roleID !=1 ?"Create Community Admin":"Create Master Admin"} 
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <NotificationContainer />
    </div>
  );
};

export default CreateCommunityAdmin;
