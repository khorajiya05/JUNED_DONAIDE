import React from "react";
import { useState } from "react";
// import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router";
import logo from "../Assests/Images/Combo-logo.png";
import GroupService from "../Services/GroupService";
// import jwt_decode from "jwt-decode";

const initialValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  profileImage: "",
  referenceCode: "",
  password: "",
};

export const JoinGroup = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [passwordType, setPasswordType] = useState("password");
  const search = useLocation().search;
  const referenceCode = new URLSearchParams(search).get("referenceCode");


// var encodedString = btoa(string); // Base64 encode the String

  var decodedString = window.atob(referenceCode).split(","); // Base64 decode the Strin


  const [profileImage, setProfileImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState(initialValues);
  const navigate = useNavigate();

  const changeHandlerImage = (event) => {
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      
   
      setSelectedImage(event.target.files[0]);
      setProfileImage(event.target.files[0]);
    };
  };


  const togglePassword = (e) => {
    e.preventDefault()
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    ValidateGroupUserDetails()
    if (name === "phoneNumber") {
      setValues({
        ...values,
        [name]: validatePhoneNumber(value),
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  

  const validateEmail = async (emailId) => {
    const foundUser = await GroupService.getGroupMembersDetailsByEmailId(
      emailId,decodedString[2]
    );
    if (foundUser.data.hasOwnProperty("groupMembersID")) {
      return false;
    } else {
      return true;
    }
  };
  const validatePhoneNumber = (value) => {
    // if input value is falsy eg if the user deletes the input, then just return
    if (!value) return value;

    // clean the input for any non-digit values.
    const phoneNumber = value.replace(/[^\d]/g, "");

    // phoneNumberLength is used to know when to apply our formatting for the phone number
    const phoneNumberLength = phoneNumber.length;

    // we need to return the value with no formatting if its less then four digits
    // this is to avoid weird behavior that occurs if you  format the area code to early
    if (phoneNumberLength < 4) return phoneNumber;

    // if phoneNumberLength is greater than 4 and less the 7 we start to return
    // the formatted number
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }

    // finally, if the phoneNumberLength is greater then seven, we add the last
    // bit of formatting and return it.
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  };
  const AddGroupUserDetails = (e) => {
    const data = {
      ReferenceCode: referenceCode,
      InvitedMemberID: "",
      FirstName: values.firstName,
      LastName: values.lastName,
      Phone: values.phoneNumber,
      Email: values.email,
      Password:values.password,
      ProfilePicture: profileImage,
      GroupAccessStatus: "Approved",
      RoleID : 5,
    };

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    GroupService.inviteMembersViaLink(data,config)
      .then((response) => {
        if (response.data.status === "SUCCESS") {
            // navigate(`/admin-group-detail?groupID=${response.data.groupID}`);
            navigate(`/login`)
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const ValidateGroupUserDetails = async (e) => {
    e.preventDefault();

    //Check user mail aready exist
    let emailAreadyExist = await validateEmail(values.email)

    let passwordRegExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;

    if (!values.firstName || values.firstName.trim() === "") {
      setErrorMessage("Please enter first name .");
    } else if (!values.lastName || values.lastName.trim() === "") {
      setErrorMessage("Please enter last name.");
    } else if (!values.phoneNumber) {
      setErrorMessage("Please enter phone number.");
    } else if (
      !/^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/i.test(values.phoneNumber)
    ) {
      setErrorMessage("Please enter valid phone number.");
    } else if (!values.email) {
      setErrorMessage("Please enter email.");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      setErrorMessage("Please enter valis email like(test@gmail.com).");
    } else if (!emailAreadyExist){
      setErrorMessage("This email is already used.");
    } else if (!values.password) {
      setErrorMessage("Password  is required.");
    } else if (!passwordRegExp.test(values.password)) {
      setErrorMessage(`Min 1 uppercase letter
                            Min 1 lowercase letter.
            Min 1 special character.
            Min 1 number.
            Min 8 characters.
            Max 30 characters.`);
    } else {
      setErrorMessage();
      AddGroupUserDetails();
    }
  };


  return (
    <div>
      <main className="login-bg Create-profile">
        <div className="login-container">
          <div className="login-logo-heading">
            <img src={logo} width={140} alt="logo" />
          </div>

          {/* <div className="login-logo-heading">
            <button>If have account<Link to="/login">Login</Link></button>
          </div> */}

          <div className="login-container-inner">
            <form method="post">
              <div className="login-main-heading">
                <h3>Create Profile</h3>
                <p>Please enter your personal detail below.</p>
              </div>
              <div className="modal-create-group-upld-img mb-3">
                
                <div className="create-group-upld-img">
                  <label className="JoinGroupImage">
                    {selectedImage && (
                      <div className="JoinGroupImage">
                        <img
                          alt="not fount"
                          width={"100%"}
                          src={URL.createObjectURL(selectedImage)}
                        />
                        <br />
                        {/* <button onClick={() => setSelectedImage(null)}> Remove</button> */}
                      </div>
                    )}

                    <input
                      type="file"
                      name="myImage"
                      onChange={(event) => {
                        
                        changeHandlerImage(event);
                      }}
                    />
                  </label>
                </div>
                <span style={{ color: "red" }}>{errorMessage}</span>
              </div>
              <div className="row">
           <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="mb-3 field-set-form">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="form-control cstm-field"
                  placeholder="Enter First Name"
                  value={values.firstName}
                  onChange={handleInputChange}
                />
              </div>
</div>
<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="mb-3 field-set-form">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="form-control cstm-field"
                  placeholder="Enter Last Name"
                  value={values.lastName}
                  onChange={handleInputChange}
                />
              </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="mb-3 field-set-form">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="form-control cstm-field"
                  placeholder="Enter Phone Number"
                  value={values.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="mb-3 field-set-form">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="form-control cstm-field"
                  placeholder="Enter Email"
                  value={values.email}
                  onChange={handleInputChange}
                />
              </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="form-group mb-3 position-relative password-field">
                <label className="form-label">Password</label>
                <input
                onselectstart ={()=>false}
                onPaste={(e)=>{
                  e.preventDefault()
                  return false}}
                onCopy={()=>false}
                onCut={()=>false}
                onDrag={()=>false}
                onDrop={()=>false}
                autoComplete="off"
                type={passwordType}
                  className="form-control cstm-field"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleInputChange}
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
            </div>
            </div>
              <div className="text-center login-cstm-button ">
                <input
                  type="button"
                  value="JOIN"
                  className="btn login-btn w-100"
                  onClick={ValidateGroupUserDetails}
                />
              </div>
              {/* <span style={{ color: color }}>{error}</span> */}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JoinGroup;
