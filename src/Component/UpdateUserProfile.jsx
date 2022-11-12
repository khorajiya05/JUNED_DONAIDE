import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getProfileDataActionThunk, updateProfileDataActionThunk } from "../ReduxStore/profileData/profileData.actions.async";
import "react-notifications/lib/notifications.css";
import { IMAGE_BASE_URL } from "../Config";
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
  },
};
const UpdateUserProfile = (porps) => {

  const dispatch = useDispatch();

  const { showModal, closeModal, setShowMmodal } = porps;
  const { profileData, loading } = useSelector((state) => state.profileData);
  const { UserID } = useSelector((state) => state.auth?.loginData);

  // let phoneRegExp = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/i;

  const [uploadedProfileImage, setUploadedProfileImage] = useState(null);
  const [profileImageAPI, setProfileImageAPI] = useState(() => process.env.PUBLIC_URL + "/Images/guest-user.jpg");

  const changeHandlerImage = (event) => {
    formik.setFieldValue("profilePicture", event.target.files[0]);
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      setUploadedProfileImage(event.target.files[0])
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
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const profileDataSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required."),
    lastName: Yup.string().required("Last name is required."),
    phone: Yup.string().required("Phone number is required."),
    profilePicture: Yup.string(),
    dateOfBirth: Yup.string(),
    profileId: Yup.string(),
  });

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: profileDataSchema,
    initialValues: {
      firstName: profileData?.firstName || "",
      lastName: profileData?.lastName || "",
      phone: profileData?.phone || "",
      profilePicture: profileData?.profilePicture || "",
      dateOfBirth: profileData?.dateOfBirth || "",
      profileId: profileData?.profileId || UserID || "",
    },

    onSubmit: (values) => {
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      dispatch(updateProfileDataActionThunk(values, config))
      setShowMmodal(false);
    },
  });

  useEffect(() => {
    dispatch(getProfileDataActionThunk(UserID))
  }, [dispatch, UserID]);

  useEffect(() => {
    if (profileData) {
      setProfileImageAPI(() => IMAGE_BASE_URL + profileData?.profilePicture);
    }
  }, [profileData])
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
            <h5 className="mb-0"> Update Profile</h5>
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
                        {uploadedProfileImage !== null || uploadedProfileImage ? (
                          <div className="">
                            <img
                              alt="not fount"
                              width={"100%"}
                              src={URL.createObjectURL(uploadedProfileImage)
                              }
                            />
                            <br />
                          </div>
                        ) : (
                          <div className="">
                            <img
                              alt="not fount"
                              width={"100%"}
                              src={profileImageAPI ? profileImageAPI : ""}
                            />
                            <br />
                          </div>)
                        }

                        <input
                          type="file"
                          accept="image/*"
                          name="myImage"
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
                              onChange={(e) => { formik.handleChange(e); console.log(e.target.value) }}
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
                          <div className="form-group mb-3 position-relative password-field">
                            <label className="form-label">DOB</label>
                            <input
                              type="date"
                              className="form-control cstm-field"
                              name="dateOfBirth"
                              value={formik.values.dateOfBirth}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
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
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateUserProfile;
