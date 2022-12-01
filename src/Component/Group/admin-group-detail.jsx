import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { NotificationContainer, NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";

import GroupMedia from "./GroupMedia";
import GroupMemberList from "./GroupMemberList";
import GroupDiscussion from "./GroupDiscussion";
import AboutGroup from "./AboutGroup";
import GroupEvents from "./GroupEvents";
import { renderComponent } from "../../ReduxStore/Actions/renderComponent";
import { getRoleAndPermissionListByID } from "../../ReduxStore/Actions/roleAndPermissionAction";
import { IMAGE_BASE_URL } from '../../Config'
import { AdminHeader } from "../admin-header";
import SideBar from "../SideBar/index";
import GroupService from "../../Services/GroupService";
import JoinGroupIviteModal from "../JoinGroupIviteModal";
import { isPermission } from "../../utils/helpers/isPermission";


const AdminGroupDetail = () => {

  let dispatch = useDispatch();
  const navigate = useNavigate();


  const { UserID, RoleID } = useSelector((state) => state.auth?.loginData);
  let { renderCompReducer } = useSelector((state) => state);
  const permission = useSelector((state) => state.roleAndPermision.data);

  const groupMemberID = UserID;

  const [Leftside, setLeftside] = useState(true);
  const [thumbnails, setThumbnails] = useState(null);
  const [videothumbnail, setVideoThumbnails] = useState(null);
  const [postDocument, setPostDocument] = useState(null);
  const [fileName, setFileName] = useState("");
  const [showComments, setShowComment] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [like, setLike] = useState(false);
  const [showEventPage, setShowEventPage] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

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
      UserID,
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

  /**
   * open invite modal
   */
  function openInviteModal() {
    setIsInviteModalOpen(true);
  }

  /**
   * close invite modal
   */
  function closeInviteModal() {
    setIsInviteModalOpen(false);
  }

  function Data() {
    setLeftside(!Leftside);
  }

  // ---------------------- Start group details sections ---------------------
  const search = useLocation().search;
  const getGroupID = new URLSearchParams(search).get("groupID");

  const [groupDetails, setGroupDetails] = useState([]);
  const [renderComp, setRenderComp] = useState(0);
  const [groupMemberDetails, setGroupMemberDetails] = useState({});
  const [isLoadingMedia, setIsLoadingMedia] = useState(false);

  const getGroupByGroupID = async () => {
    const res = await GroupService.getGroupByGroupID(getGroupID);
    setGroupDetails(res.data);
  };

  useEffect(() => {
    getGroupByGroupID();
  }, [groupDetails?.groupID, renderComp]);

  //===========================Send SMS==============================//

  const [errorMessage, setErrorMessage] = useState("");
  const [joinedGroupUser, setJoinedGrupUser] = useState("");

  // const validateEmail = async (emailId) => {
  //   const foundUser = await GroupService.getGroupMembersDetailsByEmailId(
  //     emailId,
  //     groupDetails.communityID
  //   );
  //   if (foundUser.data !== null) {
  //     setJoinedGrupUser(foundUser.data);
  //   }

  //   if (foundUser.data.statusCode === 404) {
  //     setCheckInputData(false);
  //   } else {
  //     setCheckInputData(true);
  //   }
  // };

  const AddInvitationHistory = () => {
    const data = {
      GroupID: groupDetails.groupID,
      whoInvited: joinedGroupUser.groupMembersID,
      siteID: groupDetails.communityID,
      status: "Active",
      // whomeToInvite: localStorage.getItem("userID"),
      whomeToInvite: UserID,
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
    const res = await GroupService.getAllGroupPostDataByGroupIDCommunityID(getGroupID, res1.data.communityID);
    setGroupPostData(res.data);
    setIsLoadingMedia(false);
  };

  const PostContent = (event) => {
    const date = new Date();
    const data = {
      GroupID: getGroupID,
      CommunityID: groupDetails.communityID,
      UserID,
      PostMessage: postMessage,

      PostImageOrVedioPath: "",
      FileName: fileName,
      FileType: fileType,
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


    if ((postMessage.length > 0 && postMessage.trim() !== "") || postPhotosOrVedioName !== "") {
      GroupService.uploadGroupPostDetails(data, config)
        .then((response) => {
          if (response.data.status === "SUCCESS") {
            setPostMessage("");
            setThumbnails("");
            setVideoThumbnails("");
            setPostPhotosOrVedioName("");
            setPostDocument("");
            setFileType("");
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
    dispatch(getRoleAndPermissionListByID(UserID, RoleID));
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
                      isInviteModalOpen={isInviteModalOpen}
                      closeInviteModal={closeInviteModal}
                      groupDetails={groupDetails}
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
                                        ? `${IMAGE_BASE_URL + groupDetails.coverImage}`
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
                                    <button onClick={openInviteModal}>
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
                                  ? groupMembersDetails.map((option, index) => (
                                    <img
                                      className="commentprofile groupuser"
                                      key={index}
                                      src={
                                        option.profilePicture
                                          ? `${IMAGE_BASE_URL + option.profilePicture}`
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
                                  onClick={openInviteModal}
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
                                className="nav nav-tabs"
                                id="nav-tab"
                                role="tablist"
                              >
                                <button
                                  className="nav-link "
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
                                  className="nav-link active"
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
                                {isPermission(permission, 31) && <button
                                  className="nav-link"
                                  id="nav-contact-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#nav-People"
                                  type="button"
                                  role="tab"
                                  aria-controls="nav-contact"
                                  aria-selected="false"
                                >
                                  People
                                </button>}
                                <button
                                  className="nav-link"
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
                                  className="nav-link"
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
                      <div className="tab-content" id="nav-tabContent">
                        {/* About tab content */}
                        <div
                          className="tab-pane fade"
                          id="nav-About"
                          role="tabpanel"
                          aria-labelledby="nav-home-tab"
                        >
                          <AboutGroup groupDetails={groupDetails} />
                        </div>
                        {/* Discussion tab content */}
                        <div
                          className="tab-pane fade show active"
                          id="nav-Discussion"
                          role="tabpanel"
                          aria-labelledby="nav-profile-tab"
                        >
                          <GroupDiscussion
                            getAllGroupPostDataByGroupIDCommunityID={getAllGroupPostDataByGroupIDCommunityID}
                            groupMemberDetails={groupMemberDetails}
                            groupDetails={groupDetails}
                            handleInputChangePostMessage={handleInputChangePostMessage}
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
                          className="tab-pane fade"
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
                          className="tab-pane fade"
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
                          className="tab-pane fade"
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
