import { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { modalAct } from "../../ReduxStore/Actions/modalActs";
import { useFormik } from "formik";
import GroupService from "../../Services/GroupService";
import { useLocation, useNavigate } from "react-router-dom";
import { getJoinGroupMemDetail } from "../../ReduxStore/Actions/joinGroupAction";
import 'react-phone-number-input/style.css'
import * as Yup from "yup";

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

  let dispatch = useDispatch();
  let location = useLocation();
  const navigate = useNavigate();

  const modalReducer = useSelector((state) => state.modalReducer);
  const search = location.search;
  const getSiteID = new URLSearchParams(search).get("id") ? new URLSearchParams(search).get("id") : localStorage.getItem("paramsSiteID");

  let [selectedImg, setSelectedImg] = useState(null);
  const [passwordType, setPasswordType] = useState("password");
  let [coverImage, setCoverImage] = useState(null);
  let [, setMemberDetails] = useState({});
  const [erroeMessage, setErrorMessage] = useState([]);

  const togglePassword = (e) => {
    e.preventDefault()
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  /**
   * handleChange picture
   * @param {*} event 
   */
  const changeHandlerImage = (event) => {
    formik.setFieldValue("profilePicture", event.target.files[0])
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = () => {
      setCoverImage(URL.createObjectURL(event.target.files[0]));
      setSelectedImg(event.target.files[0]);
    };
  };

  /**
  * phone number validation
  */
  let validatePhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  /**
 * validatoin schema for formik form
 */
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required."),
    lastName: Yup.string().required("Last name is required."),
    email: Yup.string().email().required("Email is required."),
    phoneNo: Yup.string().min(14, "Phone number is not valid").required("Phone number is required."),
    password: Yup.string()
      .required('Please Enter your password')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
    profilePicture: Yup.string()
  });

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      password: "",
      profilePicture: ""
    },

    onSubmit: async (values, { resetForm }) => {
      const value = {}
      value.GroupID = modalReducer.groupId;
      value.CommunityID = getSiteID;
      value.FirstName = values.firstName;
      value.LastName = values.lastName;
      value.Phone = values.phoneNo;
      value.Email = values.email;
      value.GroupAccessStatus = "Pending";
      value.RoleID = 5;
      value.Password = values.password;
      if (selectedImg) {
        value.ProfilePicture = selectedImg;
      }

      const foundUser = await GroupService.getGroupMembersDetailsByEmailId(values?.email, getSiteID);
      if (Number(foundUser.data.statusCode) === Number(404)) {
        const config = {
          headers: { "content-type": "multipart/form-data" },
        };
        const res = await GroupService.CreateGroupMember(value, config);
        if (res.data.statusCode === 200) {
          dispatch(modalAct({ status: !modalReducer.status, groupId: null }));
          localStorage.setItem("groupID", values.GroupID);
          dispatch(getJoinGroupMemDetail(res.data.data));
          localStorage.setItem("groupMembersID", res.data.data.groupMembersID);
          setMemberDetails(res.data.data);
          setTimeout(() => {
            setErrorMessage([]);
            setSelectedImg(null);
            setCoverImage(null);
            resetForm();
            navigate("/login")
          }, [1000]);
        }
        if (res.data.statusCode === 208) {
          setErrorMessage(res.data.message)
        }
      } else {
        setErrorMessage("Email is already registered");
      }
    },
  });

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
                        accept="image/*"
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
                            onChange={(e) => formik.handleChange(e)}
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
                            type="text"
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
                            onselectstart={() => false}
                            onPaste={(e) => {
                              e.preventDefault()
                              return false
                            }}
                            onCopy={() => false}
                            onCut={() => false}
                            onDrag={() => false}
                            onDrop={() => false}
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
                onClick={() => {
                  dispatch(modalAct({ status: !modalReducer.status, groupId: null }))
                  setErrorMessage([]);
                  setSelectedImg(null);
                  setCoverImage(null);
                }}
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
