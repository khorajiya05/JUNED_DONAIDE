import React, { useState } from "react";
import { AdminHeader } from "../admin-header";
import SideBar from "../SideBar";
import GroupService from "../../Services/GroupService";
import { Tooltip } from "react-bootstrap";
import { OverlayTrigger } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import SendSMSService from "../../Services/SendSMSService";
import UserService from "../../Services/UserServices";
// import compress from "compress-base64";
import CommunityService from "../../Services/CommunityService";
import MembershipService from "../../Services/MemberShipService";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import {INVITATION_URL} from '../../Config'
const InviteMember = () => {
  const [Leftside, setLeftside] = useState(true);
  const [thumbnails, setThumbnails] = useState(null);
  const [videothumbnail, setVideoThumbnails] = useState(null);
  const [userGroup, setUserGroup] = useState([]);
  const [hideSmsDiv, setHdeSmsDiv] = useState(null);
  const [userCommunity, setUserCommunity] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState("");

  const [isComLoaded, setIsComLoaded] = useState(false);
  const [isGrpLoaded, setIsGrpLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // ---------------------- Start group details sections ---------------------
  const search = useLocation().search;
  const getGroupID = new URLSearchParams(search).get("groupID");
  const [groupDetails, setGroupDetails] = useState([]);
  const [renderComp, setRenderComp] = useState(0);
  const [referenceCode, setReferenceCode] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [userGroupMembers, setUserGroupMembers] = useState([]);
  const [communityName, setCommunityName] = useState(null);

  const [phoneNo, setPhoneNo] = useState();

  //===========================Send SMS==============================//
  const initialSMSValues = {
    toNumber: "",
    email: "",
    message: "",
  };

  const [smsDivStatus, setSmsDivStatus] = useState(false);
  const [sendSMSValues, setSendSMSValues] = useState(initialSMSValues);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageBox, setErrorMessageBox] = useState("");
  const [joinedGroupUser, setJoinedGrupUser] = useState("");
  const [sendEmailDivStatus, setSendEmailDivStatus] = useState(false);
  const [attributEName, setAttributName] = useState("toNumber");
  const [allUsers, setAllUsers] = useState([]);
  const [checkInputData, setCheckInputData] = useState(false);
  const [groupPostData, setGroupPostData] = useState([]);

  //------------------------------------ Post Data ------------------------------------------//
  const [postPhotosOrVedioPath, setPostPhotosOrVedioPath] = useState("");

  const userID = localStorage.getItem("userID");

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  let subtitle;

  function Data() {
    setLeftside(!Leftside);
  }

  //--------------------- Clip Copy ----------------------//
  const url = `${INVITATION_URL}join-group?referenceCode=${referenceCode}`;
  // const [copyText, setCopyText] = useState("");

  // //setCopyText(url)
  // const handleCopyText = (e) => {
  //   setCopyText(e.target.value);
  // };

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const copyToClipboard = () => {
    copyTextToClipboard(url);
  };

  let openSMSDiv = (status) => {
    setSmsDivStatus(status);
    setAttributName("toNumber");
    setSendSMSValues({ toNumber: "", message: "" });
    setErrorMessage("");
    setErrorMessageBox("");
    setSendEmailDivStatus(false);
  };

  let validatePhoneNumber = (value) => {
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

  let validateContactInfo = () => {
    let errors = {};

    if (!sendSMSValues.toNumber && attributEName === "toNumber") {
      errorMessage["phonenumber"] = "Please enter phone number.";
    } else if (
      !/^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/i.test(
        sendSMSValues.toNumber
      ) &&
      attributEName === "toNumber"
    ) {
      errorMessage["phonenumber"] = "Please enter valid phone number.";
    } else if (!sendSMSValues.email && attributEName === "email") {
      errorMessage["email"] = "Please enter email.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email) &&
      attributEName === "email"
    ) {
      errorMessage["email"] =
        "Please enter valid email-id like(test@gmail.com)";
    } else if (
      !this.validateEmail(this.state.email) &&
      attributEName === "email"
    ) {
      errorMessage["email"] = "This email is already used.";
    } else {
      errorMessage = {};
      // this.state.contactsubmitted = true;
    }

    setErrorMessage({ errorMessage: errorMessage });

    // if (this.state.contactsubmitted) {
    //   let cssClass1 = "active";
    // }
  };

  const handleInputSMSChange = (e) => {
    const { name, value } = e.target;
    

    setSendSMSValues({
      ...sendSMSValues,
      [name]: name === "toNumber" ? validatePhoneNumber(value) : value,
    });
    
    setErrorMessage("");
  };
const handleCancle=(e)=>{
  const data=sendSMSValues.toNumber

  setSendSMSValues ({...sendSMSValues,data:""
  })

  console.log("cancle",sendSMSValues.toNumber)
  
}
  const ValidateSMSFields = (e) => {
    e.preventDefault();
    let breakAfterDot = sendSMSValues.email.split(".");
    let afterDotStr = breakAfterDot[breakAfterDot.length - 1];
    let afterDotStrLen = breakAfterDot.length - 1;

    const afterDotEmailword = (
      sendSMSValues.email.match(new RegExp(afterDotStr, "g")) || []
    ).length;

    if (attributEName == "toNumber") {
      if (phoneNo === undefined && attributEName == "toNumber") {
        setErrorMessage("Please enter phone number.");
      } else if (
        !isValidPhoneNumber(phoneNo) &&
        attributEName === "toNumber" &&
        phoneNo !== undefined
      ) {
        setErrorMessage("Please enter valid phone number.");
      } else {
        setErrorMessage();
        SendSMS();
      }
    }
    if (attributEName == "email") {
      if (!sendSMSValues.email && attributEName === "email") {
        setErrorMessage("Please enter email.");
      } else if (afterDotStrLen > 1) {
        setErrorMessage("Please enter valid email-id like(test@gmail.com)");
      }
       else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
          sendSMSValues.email
        ) &&
        attributEName === "email"
      ) {
        setErrorMessage("Please enter valid email-id like(test@gmail.com)");
      } else if (
        !validateEmail(sendSMSValues.email) &&
        attributEName === "email"
      ) {
        setErrorMessage("This email is already used.");
      } else {
        setErrorMessage();
        SendEmail();
      }
    }
  };

  const SendSMS = (e) => {
    
    const messagetext =
      "You are invited for join a group.Enter below link to join group  " +
      `${INVITATION_URL}join-group?referenceCode=${referenceCode}`;

      console.log("sendSMSValues.message",sendSMSValues.message)
    SendSMSService.sendSMS(phoneNo, messagetext)
      .then((response) => {
        if (response.data.status === "SUCCESS") {
          setSendEmailDivStatus(false);
          setSmsDivStatus(false);
          setGroupDetails([]);
          setErrorMessage("");
          setErrorMessageBox("");
          setSendSMSValues({ message: "" });
          setAttributName("");
          setPhoneNo();

          NotificationManager.success("Invitation send successfully.");
        } else {
          NotificationManager.error(response.data.message);
        }
      })
      .catch((e) => {
        NotificationManager.error(e.message);
      });
  };

  const SendEmail = (e) => {
    //const referenceCode = groupDetails.groupReferenceCode;
    const url =
    checkInputData === false
      ? `${INVITATION_URL}join-group?referenceCode=${referenceCode}`
      : `${INVITATION_URL}login`;

    const emailDetails = {
      To: sendSMSValues.email,
      Name: groupDetails.groupName,
      Url: url,
      Type: "JoinGroup",
      CommunityName: communityName,
    };
    UserService.sendEmail(emailDetails)
      .then((response) => {
        if (response.data.status === "Accepted") {
          setSendEmailDivStatus(false);
          setSmsDivStatus(false);
          setGroupDetails([]);

          setErrorMessage("");
          setErrorMessageBox("");
          setSendSMSValues({ email: "", message: "" });
          setAttributName("");
          NotificationManager.success("Invitation send successfully.");
        } else {
          NotificationManager.error(response.data.message);
        }
      })
      .catch((e) => {
        NotificationManager.error(e.message);
      });
  };

  let getAllUserData = async () => {
    const res = await MembershipService.getAllProfileDetails();
    const data = res.data;

    const options = data.map((d) => ({
      email: d.email,
    }));
    setAllUsers(options);
  };

  //Check mail already exist in community
  let validateEmail = async(emailId) => {
    const foundUser = await GroupService.getGroupMembersDetailsByEmailId(
      emailId,
      selectedCommunity
    );
    if (foundUser.data !== null) {
      setJoinedGrupUser(foundUser.data);
    }
    if (foundUser.data.statusCode === 404) {
      setCheckInputData(false);
    } else {
      setCheckInputData(true);
    }
  };

  let openSendEmailDiv = (status) => {
    setSendEmailDivStatus(status);
    setAttributName("email");
    setSendSMSValues({ email: "", message: "" });
    setErrorMessage("");
    setErrorMessageBox("");
    setPhoneNo();
    setSmsDivStatus(false);
  };

  const getAllGroupPostDataByGroupIDCommunityID = async () => {
    if (getGroupID !== null) {
      const res1 = await GroupService.getGroupByGroupID(getGroupID);
      const res = await GroupService.getAllGroupPostDataByGroupIDCommunityID(
        getGroupID,
        res1.data.communityID
      );
      setGroupPostData(res.data);
    }
  };

  useEffect(() => {
    getAllGroupPostDataByGroupIDCommunityID();
  }, []);

  const handleCommunityOnChange = (e) => {
    let { value, selectedOptions } = e.target;
    setCommunityName(selectedOptions[0].getAttribute("commu-name"));
    setSelectedCommunity(value);
    setSelectedGroup(selectedGroup);
    setUserGroupMembers(userGroupMembers);
  };

  const handleGroupOnChange = (e) => {
    let { value, selectedOptions } = e.target;

    setSelectedGroup(e.target.value);
    setReferenceCode(selectedOptions[0].getAttribute("data-id"));
    setUserGroupMembers(userGroupMembers);
  };
  const getAllGroupByCommunityID = async () => {
    setIsGrpLoaded(true)
    const res = await GroupService.getAllGroupByCommunityID(selectedCommunity);
    if (res.data.data !== null) {
      if (res.data.length > 0) {
      
        setUserGroup(res.data);
      }
    }
    setIsGrpLoaded(false)
  };

  //Get all user communities according to user id
  const getUserCommunityByUserID = async () => {
     setIsComLoaded(true)
    const res = await CommunityService.getUserCommunityByUserID(userID);
    if (res.data.data !== null) {
      if (res.data.length > 0) {
        setUserCommunity(res.data);
      }
    }
    setIsComLoaded(false)
  };

  //Get all group member
  const getAllGroupMembers = async () => {
    const res = await GroupService.getAllGroupMembers(selectedGroup);
    if (res.data.data !== null) {
      if (res.data.length > 0) {
        setUserGroupMembers(res.data);
      }
    }
  };

  useEffect(() => {
    getUserCommunityByUserID();
    getAllGroupByCommunityID();
    getAllGroupMembers();
    getAllUserData();
  }, [selectedCommunity, selectedGroup]);

  const getCommunityGroupsWithCommunityDetails = async () => {
    setIsLoaded(true);

    const res = await GroupService.getCommunityGroupsWithCommunityDetails(
      userID
    );

    setUserGroup(res.data);
    setIsLoaded(false);
  };
  useEffect(() => {
    if (roleID == 4) {
      getCommunityGroupsWithCommunityDetails();
    }
  }, []);
  const roleID = localStorage.getItem("roleID");
  return (
    <div>
      <AdminHeader Sidebar={Data} />

      <main class="">
        <div class="main-outer-container">
          <div className="dashboard-outer-container">
            <div className="inner-container-template m-0">
              <div
                className={
                  Leftside
                    ? "dashboard-container "
                    : "dashboard-container active"
                }
              >
                <SideBar />

                <div className="right-sidebar">
                  <div className="inner-content-height">
                    <div className="admin-tools-menu">
                      <div className="admin-tools-menu-heading ">
                        <h3>
                        {roleID!=1&& 
                          <Link to="/admin-tools">
                        
                              <i
                                className="fa fa-long-arrow-left me-2"
                                aria-hidden="true"
                              ></i>
                      
                          </Link>}
                          Invite Members
                        </h3>
                      </div>
                      <div className="row rolespermission-inner-box">
                        {roleID != 4 && (
                          <div className="col-md-6">
                            <select
                              class="form-select mb-4 w-100"
                              aria-label="Default select example"
                              value={selectedCommunity}
                              onChange={(e) => handleCommunityOnChange(e)}
                            >
                              <option selected>Select Community</option>
                              {isComLoaded ? (
                                <option selected disabled>
                                  Loding Community....
                                </option>
                              ) : (
                                <>
                                  {userCommunity &&userCommunity.length>0&&
                                    userCommunity.map((data) => (
                                      <option
                                        key={data.communityId}
                                        value={data.communityId}
                                        commu-name={data.communitySiteName}
                                      >
                                        {data.communitySiteName}
                                      </option>
                                    ))}
                                </>
                              )}
                            </select>
                          </div>
                        )}

                        <div className="col-md-6">
                          <select
                            class="form-select"
                            aria-label="Default select example"
                            value={selectedGroup}
                            onChange={(e) => handleGroupOnChange(e)}
                          >
                            <option selected>Select Group</option>
                            {isGrpLoaded ? (
                              <option selected disabled>
                                Loding groups....
                              </option>
                            ) : (
                              <>
                                {userGroup &&
                                  userGroup.map((data) =>
                                    data.groupList ? (
                                      data.groupList.map((item) => (
                                     
                                        <option
                                          value={item.groupID}
                                          key={item.groupID}
                                          data-id={item.groupReferenceCode}
                                        >
                                          {item.groupName}
                                        </option>
                                      ))
                                    ) : (
                                      <option
                                        value={data.groupID}
                                        key={data.groupID}
                                        data-id={data.groupReferenceCode}
                                      >
                                        {data.groupName}
                                      </option>
                                    )
                                  )}
                              </>
                            )}
                          </select>
                        </div>
                      </div>

                      {referenceCode != null && (
                        <>
                          <div className="invite-members-social-media">
                            <h3 className="">
                              Invite Members{" "}
                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip>
                                    Copy Url below to share the group with your
                                    loved ones.
                                  </Tooltip>
                                }
                              >
                                <i class="fa fa-info-circle ms-3"></i>
                              </OverlayTrigger>
                            </h3>
                          </div>
                          <form>
                            <div className="modal-body members-group-lists p-0">
                              <div class="cstm-search members-group-lists-copy-url invite-page">
                                <input
                                  disabled={true}
                                  type="text"
                                  className="members-group-lists-search form-control"
                                  // placeholder={url}
                                  value={url}
                                  // onChange={handleCopyText}
                                />
                                <button
                                  type="button"
                                  class="copy-url-btn copy-invite"
                                  onClick={copyToClipboard}
                                >
                                  Copy
                                </button>
                              </div>

                              <div className="invite-members-social-media">
                                <h3>Invite via social media</h3>
                                <ul className="ul-custom-invite ivite-list row">
                                  <div className="col-md-6">
                                    <li>
                                      <button
                                        class={`buttoncss ${
                                          sendEmailDivStatus
                                            ? ""
                                            : "active-custom"
                                        }`}
                                        type="button"
                                        onClick={() => openSMSDiv(true)}
                                      >
                                        <img
                                          class="imageclass"
                                          src="/Images/sms-icon.png"
                                        />
                                        Send an SMS
                                      </button>
                                    </li>
                                  </div>
                                  <div className="col-md-6">
                                    <li>
                                      <button
                                        class={`${
                                          sendEmailDivStatus
                                            ? "active-custom buttoncss"
                                            : "buttoncss"
                                        }`}
                                        type="button"
                                        onClick={() => openSendEmailDiv(true)}
                                      >
                                        <img
                                          class="imageclass"
                                          src="/Images/gmail.png"
                                        />{" "}
                                        Email
                                      </button>
                                    </li>
                                  </div>
                                </ul>
                              </div>

                              <div className="invite-members-social-media">
                                <h3>
                                  {sendEmailDivStatus
                                    ? "Send an Email"
                                    : "Send an SMS"}
                                </h3>
                                <div className="row invite-member-disable-input">
                                  <div className="col-md-6">
                                    <div className="form-group mb-3 ivite-form">
                                      <label className="form-label">
                                        {sendEmailDivStatus
                                          ? "To Email"
                                          : "To Number"}
                                      </label>
                                      {sendEmailDivStatus ? (
                                        <input
                                          type="text"
                                          className="form-control cstm-field"
                                          placeholder={
                                            sendEmailDivStatus
                                              ? "Enter Email"
                                              : "Enter Number"
                                          }
                                          name={
                                            sendEmailDivStatus
                                              ? "email"
                                              : "toNumber"
                                          }
                                          value={
                                            sendEmailDivStatus
                                              ? sendSMSValues.email
                                              : sendSMSValues.toNumber
                                          }
                                          onChange={handleInputSMSChange}
                                        />
                                      ) : (
                                        <PhoneInput
                                          placeholder="Enter phone number"
                                          value={phoneNo}
                                          name="toNumber"
                                          onChange={setPhoneNo}
                                          error={
                                            phoneNo
                                              ? isValidPhoneNumber(phoneNo)
                                                ? undefined
                                                : "Invalid phone number"
                                              : "Phone number required"
                                          }
                                        />
                                      )}
                                    </div>
                                    <span style={{ color: "red" }}>
                                      {errorMessage}
                                    </span>
                                    
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group mb-3">
                                      <label className="form-label">
                                        {sendEmailDivStatus
                                          ? "Email Message"
                                          : "Message"}
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control cstm-field"
                                        placeholder="Enter Message"
                                        name="message"
                                        disabled
                                        // value={sendSMSValues.message}
                                        value={url}
                                        // onChange={handleInputSMSChange}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="modal-footer mt-3">
                              <button
                                type="button"
                                 onClick={handleCancle}
                                className="cancel-button btn-custom"
                              >
                                Cancel
                              </button>
                              <button
                                type="button"
                                className="save-button btn-custom"
                                onClick={ValidateSMSFields}
                              >
                                Send
                              </button>
                            </div>
                          </form>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="tmplt-footer">
                    <p className="m-0">
                      Copyright © 2022 Donaide. All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <NotificationContainer />
    </div>
  );
};

export default InviteMember;
