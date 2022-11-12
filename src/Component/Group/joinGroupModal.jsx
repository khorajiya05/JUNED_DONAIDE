import React, { useState, useEffect } from "react";
import Modal from "react-modal";

import { useDispatch, useSelector } from "react-redux";

import { modalAct } from "../../ReduxStore/Actions/modalActs";
// import { Formik, Form, Field } from 'formik';
import { useFormik } from "formik";
import GroupService from "../../Services/GroupService";
import { useLocation, useNavigate, Link } from "react-router-dom";

import AdminGroupDetail from "./admin-group-detail";
import { getJoinGroupMemDetail } from "../../ReduxStore/Actions/joinGroupAction";
import MembershipService from "../../Services/MemberShipService";
import 'react-phone-number-input/style.css'
import { setDefaultLocale } from "react-datepicker";

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
    fontSize: "20px",
  },
};

let AddGroupModal = () => {
  const modalReducer = useSelector((state) => state.modalReducer);
  let dispatch = useDispatch();
  let [selectedImg, setSelectedImg] = useState(null);
  const [passwordType, setPasswordType] = useState("password");
  let [coverImage, setCoverImage] = useState(null);

  let [, setMemberDetails] = useState({});
  
  const [, setAllUsers] = useState([]);
  const [erroeMessage,setErrorMessage]=useState([]);
const [data,setData]=useState(false)
  let search = useLocation().search;
  const getSiteID = new URLSearchParams(search).get("id") ?new URLSearchParams(search).get("id"):localStorage.getItem("paramsSiteID");

  const togglePassword = (e) => {
    e.preventDefault()
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const navigate = useNavigate();
  const changeHandlerImage = (event) => {
    formik.setFieldValue("profilePicture",event.target.files[0])
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      setCoverImage(URL.createObjectURL(event.target.files[0]));
      setSelectedImg(e.target.result);
    };
  };

  let getAllUserData = async () => {
    const res = await MembershipService.getAllProfileDetails();
    const data = res.data;

    const options = data.map((d) => ({
      email: d.email,
    }));
    setAllUsers(options);
  };

 

  const validateEmail = async (emailId) => {
    const foundUser = await GroupService.getGroupMembersDetailsByEmailId(
      emailId,getSiteID
    );

    if (foundUser.data.statusCode===400) {
      setData(true)
      return false;
    } else {
      setData(false)
      return true;
    }
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
      phoneNo: "",
      password:"",
      // myImage:""
      profilePicture:""
    },
    onSubmit: async (values) => {
      values.GroupID = modalReducer.groupId;
      values.CommunityID = getSiteID;
      values.FirstName = values.firstName;
      values.LastName = values.lastName;
      values.Phone = values.phoneNo;
      values.Email = values.email;
      // values.ProfilePicture = coverImage;
      values.GroupAccessStatus = "Pending";
      values.RoleID = 5;
      values.Password=values.password

      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      const res = await GroupService.CreateGroupMember(values,config);

      if (res.data.statusCode === 200) {
        dispatch(modalAct({ status: !modalReducer.status, groupId: null }));
        localStorage.setItem("groupID", values.GroupID);
        dispatch(getJoinGroupMemDetail(res.data.data));
        localStorage.setItem("groupMembersID", res.data.data.groupMembersID);
        setMemberDetails(res.data.data);
        setTimeout(() => {
          navigate("/login")
          // navigate("/admin-group-detail?groupID=" + values.GroupID);
        }, [1000]);
      }
      if(res.data.statusCode=== 208){
        setErrorMessage(res.data.message)
      }
    },
    validate: (values) => {
      let errors = {};
      // let phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      let phoneRegExp = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/i;
      let emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let passwordRegExp=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/

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
      } else if (!validateEmail(values.email)) {
        errors.email = "This email is already used.";
      }

      if (!values.phoneNo) {
        errors.phoneNo = "Phone number is required.";
      } else if (!phoneRegExp.test(values.phoneNo)) {
        errors.phoneNo = "Phone number is not valid.";
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

  useEffect(() => {
    getAllUserData();
  }, []);

  return (
    <>
      <Modal
        isOpen={modalReducer.status}
        style={customStyles}
        contentLabel="Example Modal"
        backdrop="static"
      >
         <div className="moda-dialogue-custom">
        <div className="modal-header">
          <h5 className="mb-0"> Create Profile</h5>
          <button
            className="modal-close-btn"
            onClick={() =>
              dispatch(
                modalAct({ status: !modalReducer.status, groupId: null })
              )
            }
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="modal-body-create-grp modal-bodycstm1">
            <div className="modal-body p-0">
              <div className="modal-create-group-upld-img mb-3">
                <div className="create-group-upld-img">
                  <label>
                    {coverImage === null ? (
                      <div className="">
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
              <div className="modal-create-group-name">
                <div className="form-group field-set-form mb-3">
                  <div className="row">
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
                          {formik.touched.firstName && formik.errors.firstName ? (
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
                     {formik.touched.lastName && formik.errors.lastName ? (
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
                      name="phoneNo"
                      value={validatePhoneNumber(formik.values.phoneNo)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                     {formik.touched.phoneNo && formik.errors.phoneNo ? (
                    <div style={customStyles.errorStyle}>
                      {formik.errors.phoneNo}
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
                     <span style={customStyles.errorStyle}>{erroeMessage}</span>
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
                      type={passwordType}
                      className="form-control cstm-field"
                      placeholder="Password"
                      name="password"
                      onselectstart ={()=>false}
                      onPaste={(e)=>{
                        e.preventDefault()
                        return false}}
                      onCopy={()=>false}
                      onCut={()=>false}
                      onDrag={()=>false}
                      onDrop={()=>false}
                      autoComplete="off"
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
                {formik.touched.password && formik.errors.password ? (
                    <div style={customStyles.errorStyle}>
                      {formik.errors.password}
                    </div>
                  ) : null}
                  </div>
                 </div>
                </div>
              </div></div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={() =>
                dispatch(
                  modalAct({ status: !modalReducer.status, groupId: null })
                )
              }
              className="cancel-button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="save-button"
             
            >
              Join Group
            </button>
          </div>
        </form>
        </div>
      </Modal>
      
   
    </>
  );
};

export default AddGroupModal;
