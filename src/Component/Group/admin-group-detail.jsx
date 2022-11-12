import React, { useState } from "react";
import { AdminHeader } from "../admin-header";
import SideBar from "../SideBar/index";
import GroupService from "../../Services/GroupService";
import { isValidPhoneNumber } from "react-phone-number-input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SendSMSService from "../../Services/SendSMSService";
import UserService from "../../Services/UserServices";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import JoinGroupIviteModal from "../JoinGroupIviteModal";



import GroupMedia from "./GroupMedia";
import GroupMemberList from "./GroupMemberList";
import GroupDiscussion from "./GroupDiscussion";
import AboutGroup from "./AboutGroup";
import GroupEvents from "./GroupEvents";
import { renderComponent } from "../../ReduxStore/Actions/renderComponent";
import { getRoleAndPermissionListByID } from "../../ReduxStore/Actions/roleAndPermissionAction";
import { useDispatch, useSelector } from "react-redux";
import {IMAGE_BASE_URL,INVITATION_URL} from '../../Config'


const AdminGroupDetail = () => {
  const [Leftside, setLeftside] = useState(true);
  const [thumbnails, setThumbnails] = useState(null);
  const [videothumbnail, setVideoThumbnails] = useState(null);
  const [postDocument, setPostDocument] = useState(null);
  const [fileName, setFileName] = useState("");
  const [showComments, setShowComment] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const groupMemberID = localStorage.getItem("userID");
  const [likeCount, setLikeCount] = useState(0);
  const [like, setLike] = useState(false);
  const [showEventPage, setShowEventPage] = useState(false);
  let dispatch = useDispatch();
  const userID = localStorage.getItem("userID");
  const roleID = localStorage.getItem("roleID");
  const [phoneNo, setPhoneNo] = useState();
  const [attributEName, setAttributName] = useState("toNumber");
  let { renderCompReducer } = useSelector((state) => state);
  const permission = useSelector(
    (state) => state.roleAndPermision.data.payload
  );

  const navigate = useNavigate();
  const showEventScreen = () => {
    setShowEventPage(!showEventPage);
    navigate("/event-details");
  };

  const showCommentSection = async (postID, showCommentsStatus) => {
    const res = await GroupService.getPostComments(postID);

    if (res.data) {
      setPostComments(res.data);
      setShowComment(showCommentsStatus);
    }
  };

  const AddLike = (postID, communityID, groupID) => {
    localStorage.setItem("postsID", postID);
    setLikeCount(likeCount + 1);
    const date = new Date();
    const data = {
      Like: 1,
      GroupID: groupID,
      CommunityID: communityID,
      IsLikeOrUnlike: true,
      UserID: localStorage.getItem("userID"),
      PostDateTime:
        date.getUTCHours() +
        ":" +
        date.getUTCMinutes() +
        ":" +
        date.getUTCSeconds(),
      PostID: postID,
    };

    GroupService.AddPostLike(data)
      .then((response) => {
        if (response.data.status === "SUCCESS") {
          setRenderComp(renderComp + 1);
          setLike(!like);
          getAllGroupPostDataByGroupIDCommunityID();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpen1, setIsOpen1] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
    setSendEmailDivStatus(false);
    setSmsDivStatus(false);
    setGroupDetails([]);
  }
  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function openModal1() {
    setIsOpen1(true);
  }
  function closeModal1() {
    setIsOpen1(false);
  }
  function afterOpenModal1() {
    subtitle.style.color = "#f00";
  }

  function Data() {
    setLeftside(!Leftside);
  }

  // ---------------------- Start group details sections ---------------------
  const search = useLocation().search;
  const getGroupID = new URLSearchParams(search).get("groupID");
  const [groupDetails, setGroupDetails] = useState([]);
  const [renderComp, setRenderComp] = useState(0);
  const [referenceCode, setReferenceCode] = useState("");
  const [groupMemberDetails, setGroupMemberDetails] = useState({});
  const [checkInputData, setCheckInputData] = useState(false);
  const [isLoadingMedia, setIsLoadingMedia] = useState(false);
  const getGroupByGroupID = async () => {
    const res = await GroupService.getGroupByGroupID(getGroupID);

    setGroupDetails(res.data);
    setReferenceCode(res.data.groupReferenceCode);
  };

  useEffect(() => {
    getGroupByGroupID();
  }, [groupDetails?.groupID, renderComp]);

  //--------------------- Clip Copy ----------------------//

  const url =
    checkInputData === false
      ? `${INVITATION_URL}join-group?referenceCode=${referenceCode}`
      : `${INVITATION_URL}login`;

  const [copyText, setCopyText] = useState("");

  const handleCopyText = (e) => {
    setCopyText(e.target.value);
  };

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

  //===========================Send SMS==============================//
  const initialSMSValues = {
    toNumber: "",
    message: "",
    email: "",
  };

  const [smsDivStatus, setSmsDivStatus] = useState(false);
  const [sendSMSValues, setSendSMSValues] = useState(initialSMSValues);
  const [errorMessage, setErrorMessage] = useState("");
  const [sendEmailDivStatus, setSendEmailDivStatus] = useState(false);
  const [joinedGroupUser, setJoinedGrupUser] = useState("");

  let openSMSDiv = (status) => {
    setSmsDivStatus(status);
    setSendEmailDivStatus(false);
    setAttributName("toNumber");
  };

  const validateEmail = async (emailId) => {
    const foundUser = await GroupService.getGroupMembersDetailsByEmailId(
      emailId,
      groupDetails.communityID
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

  const handleInputSMSChange = (e) => {
    const { name, value } = e.target;

    setSendSMSValues({
      ...sendSMSValues,
      [name]: value,
    });
    setErrorMessage("");

    setTimeout(() => {
      validateEmail(e.target.value);
    }, 1000);
  };

  const AddInvitationHistory = () => {
    const data = {
      GroupID: groupDetails.groupID,
      whoInvited: joinedGroupUser.groupMembersID,
      siteID: groupDetails.communityID,
      status: "Active",
      whomeToInvite: localStorage.getItem("userID"),
      invitationDate: new Date().toISOString().split("T")[0],
      // invitationTime:`${new Date().getUTCHours()}:${new Date().getUTCMinutes()}:${new Date().getUTCSeconds()}}`,
      inviteCode: 0,
    };
    GroupService.AddInvitationHistory(data)
      .then((response) => {
        if (response.data.status === "SUCCESS") {
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const ValidateSMSFields = (e) => {
    e.preventDefault();

    if (!sendSMSValues.toNumber) {
      if (sendEmailDivStatus) {
        setErrorMessage("Please enter to email!");
      }
      
      else {
        setErrorMessage("Please enter to number!");
      }
      
    } else {
      setErrorMessage();
      if (sendEmailDivStatus) {
        SendEmail();
        AddInvitationHistory();
      } else {
        SendSMS();
      }
    }
  };

  // const ValidateSMSFields = (e) => {
  //   e.preventDefault();
  //   let breakAfterDot = sendSMSValues.email.split(".");
  //   let afterDotStr = breakAfterDot[breakAfterDot.length - 1];
  //   let afterDotStrLen = breakAfterDot.length - 1;

  //   const afterDotEmailword = (
  //     sendSMSValues.email.match(new RegExp(afterDotStr, "g")) || []
  //   ).length;
    
  //   if (attributEName == "toNumber") {
  //     if (phoneNo === undefined && attributEName == "toNumber") {
  //       setErrorMessage("Please enter phone number.");
  //     } else if (
  //       !isValidPhoneNumber(phoneNo) &&
  //       attributEName === "toNumber" &&
  //       phoneNo !== undefined
  //     ) {
  //       setErrorMessage("Please enter valid phone number.");
  //     } else {
  //       setErrorMessage();
  //       SendSMS();
  //     }
  //   }
  //   if (attributEName == "email") {
  //     if (!sendSMSValues.email && attributEName === "email") {
  //       setErrorMessage("Please enter email.");
  //     } else if (afterDotStrLen > 1) {
  //       setErrorMessage("Please enter valid email-id like(test@gmail.com)");
  //     } else if (
  //       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
  //         sendSMSValues.email
  //       ) &&
  //       attributEName === "email"
  //     ) {
  //       setErrorMessage("Please enter valid email-id like(test@gmail.com)");
  //     } else if (
  //       !validateEmail(sendSMSValues.email) &&
  //       attributEName === "email"
  //     ) {
  //       setErrorMessage("This email is already used.");
  //     } else {
  //       setErrorMessage();
  //       SendEmail();
  //     }
  //   }
  // };





  const SendSMS = (e) => {

    const messagetext =
      "You are invited for join a group.Enter below link to join group  " +
      `${INVITATION_URL}join-group?referenceCode=${referenceCode}`;

    SendSMSService.sendSMS(phoneNo, messagetext)
      .then((response) => {
        if (response.data.status === "SUCCESS") {
          setIsOpen(false);

          NotificationManager.success("Send sms successfully!");
          setAttributName("");
          setSendEmailDivStatus(false);
          setSmsDivStatus(false);
          setGroupDetails([]);
          setSendSMSValues("");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const SendEmail = (e) => {
    setTimeout(() => {
      const emailDetails = {
        To: sendSMSValues.toNumber,
        Name: groupDetails.groupName,
        Url: url,
        UserName: localStorage.getItem("userName"),
        CommunityID: groupDetails.communityID,
        CommunityName: groupDetails.communityName,
        Type: "JoinGroup",
      };
      UserService.sendEmail(emailDetails)
        .then((response) => {
          if (response.data.status === "Accepted") {
            setIsOpen(false);

            NotificationManager.success("Send email successfully!");
            setAttributName("toNumber");
            setSendEmailDivStatus(false);
            setSmsDivStatus(false);
            setGroupDetails([]);
            setSendSMSValues("");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }, 2000);
  };

  let openSendEmailDiv = (status) => {
    setSendEmailDivStatus(status);
    setSmsDivStatus(false);
    setAttributName("email");
  };

  //================================== Add Group member data ===============================//
  const [groupMembersDetails, setGroupMembersDetails] = useState([]);

  const getgroupMembersDetails = async () => {
    const res = await GroupService.getAllGroupMembers(getGroupID);
    setGroupMembersDetails(res.data);
  };

  useEffect(() => {
    getgroupMembersDetails();
  }, []);

  //------------------------------------ Post Data ------------------------------------------//
  const [postMessage, setPostMessage] = useState("");
  const [postPhotosOrVedioName, setPostPhotosOrVedioName] = useState("");
  const [fileType, setFileType] = useState("");
  const changeHandlerPostImage = (event) => {

  
    setFileType("Image")
    setFileName(event.target.files[0].name);

    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      setThumbnails(event.target.files[0]);
      setVideoThumbnails(null);
      setPostPhotosOrVedioName(event.target.files[0]);
    };
  };

  const changeHandlerPostVedio = (event) => {
    let reader = new FileReader();
    setFileType("Vedio")
    reader.readAsDataURL(event.target.files[0]);
    setFileName(event.target.files[0].name);
    reader.onload = (e) => {
      setThumbnails(null);
      setVideoThumbnails(event.target.files[0]);
      setPostPhotosOrVedioName(event.target.files[0]);
    };
  };
  const changeHandlerPostDoc = (event) => {
    setFileType("Document")
    console.log("event.target.files[0]",event.target.files[0].name)
    setFileName(event.target.files[0].name);
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      setThumbnails(null);
      setVideoThumbnails(null);
      setPostDocument(event.target.files[0]);
      setPostPhotosOrVedioName(event.target.files[0]);
    };
  };
  const handleInputChangePostMessage = (e) => {
    const { name, value } = e.target;
    setPostMessage(value);
  };
  const getAllGroupPostDataByGroupIDCommunityID = async () => {
    const res1 = await GroupService.getGroupByGroupID(getGroupID);
    setIsLoadingMedia(true);
    const res = await GroupService.getAllGroupPostDataByGroupIDCommunityID(
      getGroupID,
      res1.data.communityID
    );
    setGroupPostData(res.data);
    setIsLoadingMedia(false);
  };

  const PostContent = (event) => {
   
    
    const date = new Date();
 
    const data = {
      
      GroupID: getGroupID,
      CommunityID: groupDetails.communityID,
      UserID: localStorage.getItem("userID"),
      PostMessage: postMessage,
      
      PostImageOrVedioPath: "",
      FileName: fileName,
      FileType:fileType,
      PostDateTime:
        date.getUTCHours() +
        ":" +
        date.getUTCMinutes() +
        ":" +
        date.getUTCSeconds(),
        PostImageOrVedioName: postPhotosOrVedioName,
    };

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };


    if (postMessage.length > 0 || postPhotosOrVedioName !== "" || postMessage.trim() === "") {
      GroupService.uploadGroupPostDetails(data,config)
        .then((response) => {
          if (response.data.status === "SUCCESS") {
            setPostMessage("");
            setThumbnails("");
            setVideoThumbnails("");
            setPostPhotosOrVedioName("");
            setPostDocument("");
            getAllGroupPostDataByGroupIDCommunityID();
            NotificationManager.success(
              "Success message",
              response.data.message
            );
            setErrorMessage("");
          }
        })
        .catch((e) => {
          console.log(e);
          setErrorMessage("");
        });
    } else {
      setErrorMessage("Please add post...... ");
    }
  };

  const [groupPostData, setGroupPostData] = useState([]);

  const getGroupMember = () => {
    GroupService.getGroupMember(groupMemberID)
      .then((response) => {
        if (response) {
          setGroupMemberDetails(response.data);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getGroupMember();
    getAllGroupPostDataByGroupIDCommunityID();
  }, []);

  useEffect(() => {
    dispatch(getRoleAndPermissionListByID(userID, roleID));
  }, []);



  return (
    <div>
      <AdminHeader Sidebar={Data} />

      <main className="">
        <div className="main-outer-container">
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
                    <JoinGroupIviteModal
                      modalIsOpen={modalIsOpen}
                      afterOpenModal={afterOpenModal}
                      customStyles={customStyles}
                      closeModal={closeModal}
                      url={url}
                      handleCopyText={handleCopyText}
                      copyToClipboard={copyToClipboard}
                      smsDivStatus={smsDivStatus}
                      sendEmailDivStatus={sendEmailDivStatus}
                      openSMSDiv={openSMSDiv}
                      openSendEmailDiv={openSendEmailDiv}
                      sendSMSValues={sendSMSValues}
                      handleInputSMSChange={handleInputSMSChange}
                      errorMessage={errorMessage}
                      ValidateSMSFields={ValidateSMSFields}
                      closeModal1={closeModal1}
                      modalIsOpen1={modalIsOpen1}
                      openModal1={openModal1}
                      phoneNo={phoneNo}
                      setPhoneNo={setPhoneNo}
                      isValidPhoneNumber={isValidPhoneNumber}
                    />

                    <div className="admin-group-page">
                      <div className="row  justify-content-center admin-group-page-cover">
                        <div className="col-md-12">
                          <div className="view-group-detail-sec view-group-detail-sec-custom bg-white">
                            <div className="group-detail-card">
                              <div to="#" className="item">
                                <div className="group-cover-img ">
                                  <img
                                    src={
                                      groupDetails.coverImage
                                        ? `${IMAGE_BASE_URL+groupDetails.coverImage}`
                                        : process.env.PUBLIC_URL +
                                          " /Images/group_cover_img.jpg "
                                    }
                                    alt="cover pic"
                                  />
                                </div>

                                <div className="group-detail-card-name">
                                  <div className="group-card-name">
                                    <Link to="/admin-group">
                                      <i
                                        className="fa fa-long-arrow-left"
                                        aria-hidden="true"
                                      ></i>
                                    </Link>

                                    <div className="group-page-name">
                                      <p>{groupDetails.groupName}</p>
                                    </div>
                                  </div>
                                    <div className="modal-sendinvite">
                                  <button onClick={openModal}>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 14.175 14.758"
                                    >
                                      <path
                                        id="Icon_awesome-share-square"
                                        data-name="Icon awesome-share-square"
                                        d="M13.99,5.115l-3.544,3.92c-.374.413-1,.107-1-.5V6.457C5.892,6.485,4.391,7.469,5.4,11.4c.11.432-.316.766-.615.5A5.887,5.887,0,0,1,2.953,7.763c0-4.149,2.894-4.972,6.5-5V.692c0-.61.623-.916,1-.5l3.544,3.92A.776.776,0,0,1,13.99,5.115ZM9.45,10.928v1.985H1.575V3.689H2.828a.276.276,0,0,0,.213-.106A4.929,4.929,0,0,1,4.3,2.5c.274-.167.172-.652-.136-.652H1.181A1.294,1.294,0,0,0,0,3.228V13.374a1.294,1.294,0,0,0,1.181,1.384H9.844a1.294,1.294,0,0,0,1.181-1.384v-2.56a.3.3,0,0,0-.394-.326,1.525,1.525,0,0,1-.841.1A.315.315,0,0,0,9.45,10.928Z"
                                        transform="translate(0 0)"
                                        fill="#fff"
                                      />
                                    </svg>
                                    Invite Members
                                  </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row justify-content-center ">
                        <div className="col-md-12">
                          <div className="view-group-detail-about cusom-group-design bg-white">
                            <div className="Profile-picture-group">
                            
                              <h5 className="grpname">
                                {groupMembersDetails.length < 10 &&
                                groupMembersDetails.length > 0
                                  ? groupMembersDetails.map((option) => (
                                      <img
                                        className="commentprofile groupuser"
                                        key={option}
                                        src={
                                          option.profilePicture
                                            ? `${IMAGE_BASE_URL+option.profilePicture}`
                                            : process.env.PUBLIC_URL +
                                              "/Images/guest-user.jpg"
                                        }
                                        alt="pic"
                                        data-toggle="tooltip"
                                        data-placement="right"
                                        title={option.firstName}
                                      />
                                    ))
                                  : `${groupMembersDetails.length} members`}
                              </h5>
                            
                              </div>
                            <h3 className="grpname">
                              {groupDetails.groupName}
                            </h3>
                         
                            <div className="view-group-detail-members">
                            
                            <div className="invite-remove-group-list-btn ms-auto">
                              <button type="button" className="post2">
                                <i
                                  className="fa fa-users me-2"
                                  aria-hidden="true"
                                ></i>
                                {groupMemberDetails.groupAccessStatus ===
                                "Pending"
                                  ? "Pending"
                                  : "Joined"}
                              </button>

                              <button
                                type="button"
                                className="text-decoration-none post"
                                onClick={openModal}
                              >
                                <i
                                  className="fa fa-plus me-2"
                                  aria-hidden="true"
                                ></i>
                                Invite
                              </button>
                            </div>
                          </div>
                          </div>
                          

                          <div className="group-tab-nav custom-nav-tabs-main">
                            <nav>
                              <div
                                class="nav nav-tabs"
                                id="nav-tab"
                                role="tablist"
                              >
                                <button
                                  class="nav-link "
                                  id="nav-home-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#nav-About"
                                  type="button"
                                  role="tab"
                                  aria-controls="nav-home"
                                  aria-selected="true"
                                >
                                  About
                                </button>
                                <button
                                  class="nav-link active"
                                  id="nav-profile-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#nav-Discussion"
                                  type="button"
                                  role="tab"
                                  aria-controls="nav-profile"
                                  aria-selected="false"
                                >
                                  Discussion
                                </button>
                                <button
                                  class="nav-link"
                                  id="nav-contact-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#nav-People"
                                  type="button"
                                  role="tab"
                                  aria-controls="nav-contact"
                                  aria-selected="false"
                                >
                                  People
                                </button>
                                <button
                                  class="nav-link"
                                  id="nav-contact-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#nav-Event"
                                  type="button"
                                  role="tab"
                                  aria-controls="nav-contact"
                                  aria-selected="false"
                                  onClick={() => {
                                    dispatch(
                                      renderComponent(
                                        renderCompReducer.renderStatus + 1
                                      )
                                    );
                                  }}
                                >
                                  Event
                                </button>
                                <button
                                  class="nav-link"
                                  id="nav-contact-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#nav-Media"
                                  type="button"
                                  role="tab"
                                  aria-controls="nav-contact"
                                  aria-selected="false"
                                >
                                  Media
                                </button>
                              </div>
                            </nav>
                          </div>
                        </div>
                      </div>

                      {/* Post Details show section */}

                      <div class="tab-content" id="nav-tabContent">
                        {/* About tab content */}
                        <div
                          class="tab-pane fade"
                          id="nav-About"
                          role="tabpanel"
                          aria-labelledby="nav-home-tab"
                        >
                          <AboutGroup groupDetails={groupDetails} />
                        </div>

                        {/* Discussion tab content */}
                        <div
                          class="tab-pane fade show active"
                          id="nav-Discussion"
                          role="tabpanel"
                          aria-labelledby="nav-profile-tab"
                        >
                          <GroupDiscussion
                            getAllGroupPostDataByGroupIDCommunityID={
                              getAllGroupPostDataByGroupIDCommunityID
                            }
                            groupMemberDetails={groupMemberDetails}
                            groupDetails={groupDetails}
                            handleInputChangePostMessage={
                              handleInputChangePostMessage
                            }
                            renderComp={renderComp}
                            setRenderComp={setRenderComp}
                            errorMessage={errorMessage}
                            thumbnails={thumbnails}
                            videothumbnail={videothumbnail}
                            postDocument={postDocument}
                            changeHandlerPostImage={changeHandlerPostImage}
                            changeHandlerPostVedio={changeHandlerPostVedio}
                            changeHandlerPostDoc={changeHandlerPostDoc}
                            PostContent={PostContent}
                            groupPostData={groupPostData}
                            AddLike={AddLike}
                            showCommentSection={showCommentSection}
                            showComments={showComments}
                            setShowComment={setShowComment}
                            postComments={postComments}
                            postMessage={postMessage}
                            AddInvitationHistory={AddInvitationHistory}
                            permission={permission}
                            fileName={fileName}
                            isLoadingMedia={isLoadingMedia}
                          />
                        </div>

                        {/* People tab content */}
                        <div
                          class="tab-pane fade"
                          id="nav-People"
                          role="tabpanel"
                          aria-labelledby="nav-contact-tab"
                        >
                          <GroupMemberList
                            groupMembersDetails={groupMembersDetails}
                            permission={permission}
                          />
                        </div>

                        {/* Event tab content */}
                        <div
                          class="tab-pane fade"
                          id="nav-Event"
                          role="tabpanel"
                          aria-labelledby="nav-contact-tab"
                        >
                          <GroupEvents
                            showEventScreen={showEventScreen}
                            siteID={groupDetails.communityID}
                            permission={permission}
                          />
                        </div>

                        {/* Media tab content */}
                        <div
                          class="tab-pane fade"
                          id="nav-Media"
                          role="tabpanel"
                          aria-labelledby="nav-contact-tab"
                        >
                          <GroupMedia
                            groupPostData={groupPostData}
                            permission={permission}
                            fileName={fileName}
                          />
                        </div>
                      </div>
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

export default AdminGroupDetail;
