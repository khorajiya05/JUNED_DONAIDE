import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import GroupPost from "./groupPost";
import FileViewer from "react-file-viewer";
import GroupService from "../../Services/GroupService";
import { useLocation } from "react-router";
import moment from "moment";
import { Worker, Viewer } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import {IMAGE_BASE_URL} from '../../Config'
const GroupDiscussion = (props) => {
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const {
    groupMemberDetails,
    groupDetails,
    handleInputChangePostMessage,
    renderComp,
    setRenderComp,
    errorMessage,
    thumbnails,
    videothumbnail,
    changeHandlerPostImage,
    changeHandlerPostVedio,
    changeHandlerPostDoc,
    PostContent,
    postDocument,
    groupPostData,
    AddLike,
    showCommentSection,
    showComments,
    setShowComment,
    postComments,
    postMessage,
    getAllGroupPostDataByGroupIDCommunityID,
    isLoadingMedia,
    fileName,
  } = props;
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const useName = localStorage.getItem("userName");
  const [isLoadingEvent, setIsLoadingEvent] = useState(false);

  const [upComingEvents, setUpComingEvents] = useState([]);
  const search = useLocation().search;
  const getGroupID = new URLSearchParams(search).get("groupID");
  const userID = localStorage.getItem("userID");

  let getUpcomEventsList = () => {
    setIsLoadingEvent(true);
    try {
      setTimeout(async () => {
        const res = await GroupService.getUpcomingEventsList(getGroupID);
        if (res.data.length > 0) {
          setUpComingEvents(res.data);
        }
      }, 2000);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoadingEvent(false);
  };

  const AddEventConfirmationDetails = async (eventId, going, mayBe, cantGo) => {
    const res = await GroupService.GetEventdetailByUserIdAndEventId(
      userID,
      eventId
    );

    console.log("res111111111111111111111111", res.data.status === "SUCCESS");

    const data = {
      eventId: eventId,
      communityId: groupDetails.siteID,
      groupId: groupDetails.groupID,
      userId: localStorage.getItem("userID"),
      going: going,
      cantGo: cantGo,
      mayBe: mayBe,
      eventConfirmId:
        res.data.data !== null ? res.data.data.eventConfirmId : null,
    };
    if (res.data.status === "SUCCESS") {
      console.log("sucessssssssssssssss");
      const res = await GroupService.AddEventConfirmationDetails(data);
      if (res.data) {
        NotificationManager.success("Your response is send successfully.");
        getUpcomEventsList();
      }
    }
  };

  useEffect(() => {
    
    getUpcomEventsList();
  }, []);

    


  return (
    <div className="container-fluid ">
      <div className="row justify-content-center ">
        <div className="row justify-content-center bg-grey-wall">
          <div className="col-xl-9 col-lg-12 col-md-12 col-sm-12 col-12">
            {groupMemberDetails.groupAccessStatus === "Approved" && (
              <div className="create-post-outer-box">
                <div className="create-post-inner-box">
                  <div className="create-post-text">
                    <img
                      
                      src={
                        localStorage.getItem("userImg") == "null" ||
                        localStorage.getItem("userImg") == undefined ||localStorage.getItem("userImg")==""
                          ? process.env.PUBLIC_URL + "/Images/guest-user.jpg"
                          : `${IMAGE_BASE_URL + localStorage.getItem("userImg")}`
                      }
                      alt=""
                    />
                    <textarea
                      className="form-control"
                      rows="2"
                      id="comment"
                      placeholder="Write a post here..."
                      value={postMessage}
                      onChange={handleInputChangePostMessage}
                    ></textarea>
                  </div>
                  <span
                    style={{
                      color: "red",
                      marginLeft: "60px",
                      fontWeight: "700",
                    }}
                  >
                    {errorMessage}
                  </span>
                  <div className="create-post-slct-image">
                    <div className="selct-img"></div>
                  </div>

                  <div
                    className="thumbnail-preview thumbnail-image-post-img "
                    style={{
                      display: thumbnails ? "block" : "none",
                    }}
                  >
                    <img
                      src={thumbnails && URL.createObjectURL(thumbnails)}
                      alt=""
                    />
                  </div>

                  <div
                    className="thumbnail-preview  thumbnail-video-post-img"
                    style={{
                      display: videothumbnail ? "block" : "none",
                    }}
                  >
                    <div className="embed-responsive embed-responsive-4by3">
                      <iframe
                        className="embed-responsive-item"
                        src={
                          videothumbnail && URL.createObjectURL(videothumbnail)
                        }
                      ></iframe>
                    </div>
                  </div>
                  <div
                    className="thumbnail-preview thumbnail-image-post-img "
                    style={{
                      display: postDocument ? "block" : "none",
                    }}
                  >
                    <a href={postDocument}>{fileName}</a>
                  </div>

                  <div className="create-post mt-2">
                    <div className="create-post-icons-upld">
                      <label>
                        <input
                          type="file"
                          className="d-none"
                          accept="image/*"
                          onChange={(event) => {
                            changeHandlerPostImage(event);
                          }}
                        />

                        <i class="fa fa-picture-o" aria-hidden="true"></i>
                        <span>Upload Image</span>
                        <div className="add-post-remove-icon"></div>
                      </label>
                      <label>
                        <input
                          type="file"
                          className="d-none"
                          accept=".pdf"
                          onChange={(event) => {
                            changeHandlerPostDoc(event);
                          }}
                        />
                        <i class="fa fa-file-text-o" aria-hidden="true"></i>

                        <span>Upload Document</span>
                      </label>
                      <label>
                        <input
                          type="file"
                          className="d-none"
                          accept="video/*"
                          onChange={(event) => {
                            changeHandlerPostVedio(event);
                          }}
                        />
                        <i class="fa fa-video-camera" aria-hidden="true"></i>
                        <span>Upload Vedio</span>
                      </label>
                    </div>
                    <button className="post" onClick={PostContent}>
                      Post
                    </button>
                  </div>
                </div>
              </div>
            )}

            {upComingEvents !== undefined && upComingEvents.length > 0
              ? upComingEvents.map((events) => (
                  <div className="row mb-3 event-section custom-event-section custom-common-ui">
                    <div className="col-md-12">
                      <div className="eve-user-name d-flex align-items-center media-posts-outer-box">
                        <div className="user-image">
                          <img
                            src={
                              events.profilePicture
                                ? `${IMAGE_BASE_URL+events.profilePicture}`
                                : process.env.PUBLIC_URL +
                                  "/Images/guest-user.jpg"
                            }
                            width="40"
                            height="40"
                            className="rounded-circle"
                            alt=""
                          />
                        </div>
                        <div className="heading-invitation">
                          <p className="mb-0">
                            {" "}
                            <strong>{events.userName}</strong> invied you
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="event-image position-relative">
                      <img
                        src={
                          events.coverImage
                            ? `${IMAGE_BASE_URL+events.coverImage}`
                            : process.env.PUBLIC_URL +
                              " /Images/group_cover_img.jpg "
                        }
                        className=" cover-img"
                        alt=""
                      />
                      <div className="event-content">
                      <div className="row jutify-content-space-between">
                        <div className="col-md-6">
                          <div className="event-info custom-event-info">
                            <h4>{events.eventName}</h4>
                            <span className="upcomming-event">
                              <b>Start Date :</b>{" "}
                              {moment(events.startDate).format("YYYY-MM-DD")}{" "}
                              {events.startTime}
                            </span>
                            <br />
                            <span className="upcomming-event">
                              <b>End Date :</b>
                              {moment(events.endDate).format("YYYY-MM-DD")}{" "}
                              {events.endTime}
                            </span>
                          </div>
                          </div>
                       
                        <div className="col-md-6">
                        <div className="event-info custom-event-info">
                          <h4>Address</h4>
                          <h6 className="upcomming-event">{events.address}</h6>
                          </div>
                        </div>
                        </div>
                        </div>
                      </div>
                    </div>
                   
                    <div className="even-invite-action custom-event-action">
                      <>
                        <button
                          className="btn btn-secondary me-2"
                          onClick={() =>
                            AddEventConfirmationDetails(events.eventID, 1, 0, 0)
                          }
                        >
                           <i className="fa fa-check" aria-hidden="true"></i>{" "}
                          <p>
                            {events?.eventConfirmations?.going?.count
                              ? events.eventConfirmations.going.count
                              : 0}
                               <span> Going</span>
                          </p>
                         
                          
                        </button>

                        <button
                          className="btn btn-secondary me-2"
                          onClick={() =>
                            AddEventConfirmationDetails(events.eventID, 0, 1, 0)
                          }
                        >
                           <i
                            className="fa fa-question-circle"
                            aria-hidden="true"
                          ></i>{" "}
                          <p>
                            {events?.eventConfirmations?.maybe?.count
                              ? events.eventConfirmations.maybe.count
                              : 0}
                              <span> Maybe</span>
                          </p>
                         
                         
                        </button>

                        <button
                          className="btn btn-secondary me-2"
                          onClick={() =>
                            AddEventConfirmationDetails(events.eventID, 0, 0, 1)
                          }
                        >
                           <i className="fa fa-times" aria-hidden="true"></i>{" "}
                          <p>
                            {events?.eventConfirmations?.cantGo?.count
                              ? events.eventConfirmations.cantGo.count
                              : 0}
                              <span> Can't go</span>
                          </p>
                         
                         
                        </button>
                      </>
                    </div>
                  </div>
                ))
              : isLoadingEvent && (
                  <div className="spinner-container">
                    <div className="loading-spinner"></div>
                  </div>
                )}
            {groupPostData.length > 0
              ? groupPostData.map((item, intex) =>
                  item.fileType && item.fileType === "Vedio" ? (
                    <>
                      <div className="media-posts-outer-box">
                        <div className="media-posts-inner-box">
                          <div className="meadia-posts-card">
                            <div className="meadia-posts-card-header">
                              <div className="meadia-posts-card-profile">
                                <div className="meadia-posts-card-profile-pic">
                                  <img
                                    src={
                                      item.profilePicture
                                        ? `${IMAGE_BASE_URL+item.profilePicture}`
                                        : process.env.PUBLIC_URL +
                                          "/Images/guest-user.jpg"
                                    }
                                    alt="profile"
                                  />
                                </div>
                                <div className="meadia-posts-card-profile-name">
                                  <p>{useName}</p>
                                  <span>{item.postTime}</span>
                                </div>
                              </div>
                            </div>
                            <h6 style={{ margin: " 20px" }}>
                                {item.content}
                              </h6>
                            <div className="meadia-posts-card-image">
                              
                              <div className="player-wrapper">
                                {item.postImageOrVedio ? (
                                  <ReactPlayer
                                    className="react-player"
                                    url={
                                      item.postImageOrVedio
                                        ? `${IMAGE_BASE_URL+item.postImageOrVedio}`
                                        : ""
                                    }
                                    width="100%"
                                    height="100%"
                                    controls={true}
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            <div className="like-cmnt-counting like-cmnt-countingcustom ">
                              <div
                                className="likes-count counter  "
                                onClick={() =>
                                  AddLike(
                                    item.postID,
                                    item.communityID,
                                    item.groupID
                                  )
                                }
                              >
                                {item.isLikeOrUnlike === true ? (
                                  <img
                                    className="likes-count"
                                    src="Images/like-icon-liked.svg"
                                    alt="like"
                                  />
                                ) : (
                                  <img
                                    className="likes-count"
                                    src="Images/like-icon.svg"
                                    alt="like"
                                  />
                                )}
Like
                                <span>{item.likeCount}</span>
                                
                              </div>
                              <div
                                className="cmnt-count counter"
                                onClick={() =>
                                  showCommentSection(item.postID, !showComments)
                                }
                              >
                                <img src="Images/cmnt-icon.svg" alt="comment" />
                                Comment
                                <span>{item.commentCount}</span>
                              </div>
                              <div className="share-post-card post-details counter">
                                
                                <img src="Images/share-icon.svg" alt="share" />
                                Share
                              </div>
                            </div>
                            <GroupPost
                              showCommentSection={showCommentSection}
                              item={item}
                              setShowComment={setShowComment}
                              showComments={showComments}
                              postComments={postComments}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : item.fileType && item.fileType === "Image" ? (
                    <>
                      <div className="media-posts-outer-box">
                        <div className="media-posts-inner-box">
                          <div className="meadia-posts-card">
                            <div className="meadia-posts-card-header">
                              <div className="meadia-posts-card-profile">
                                <div className="meadia-posts-card-profile-pic">
                                  <img
                                    src={
                                      item.profilePicture
                                        ? `${IMAGE_BASE_URL+item.profilePicture}`
                                        : process.env.PUBLIC_URL +
                                          "/Images/guest-user.jpg"
                                    }
                                    alt="profile"
                                  />
                                </div>
                                <div className="meadia-posts-card-profile-name">
                                  <p>{item.userName}</p>
                                  <span>{item.postTime}</span>
                                </div>
                              </div>
                            </div>
                            <h6 style={{ margin: " 20px" }}>
                                {item.content}
                              </h6>
                            <div className="meadia-posts-card-image">
                             
                              <div className="player-wrapper">
                                {item.postImageOrVedio ? (
                                  <img
                                    src={
                                      item.postImageOrVedio
                                        ? `${IMAGE_BASE_URL+item.postImageOrVedio}`
                                        : ""
                                    }
                                    alt="img"
                                  />
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            <div className="like-cmnt-counting like-cmnt-countingcustom">
                              <div
                                className="likes-count counter"
                                onClick={() =>
                                  AddLike(
                                    item.postID,
                                    item.communityID,
                                    item.groupID
                                  )
                                }
                              >
                                {item.isLikeOrUnlike === true ? (
                                  <img
                                    className="likes-count"
                                    src="Images/like-icon-liked.svg"
                                    alt="like"
                                  />
                                ) : (
                                  <img
                                    className="likes-count"
                                    src="Images/like-icon.svg"
                                    alt="like"
                                  />
                                )}
                                Like
                               <span> {item.likeCount}</span>
                              </div>
                              <div
                                className="cmnt-count counter"
                                onClick={() =>
                                  showCommentSection(item.postID, !showComments)
                                }
                              >
                                <img src="Images/cmnt-icon.svg" alt="comment" />
                                Comment
                               <span> {item.commentCount}</span>
                              </div>

                              <div className="share-post-card counter">
                                <img src="Images/share-icon.svg" alt="share" />
                                Share
                              </div>
                            </div>

                            <GroupPost
                              getAllGroupPostDataByGroupIDCommunityID={
                                getAllGroupPostDataByGroupIDCommunityID
                              }
                              item={item}
                              showCommentSection={showCommentSection}
                              postComments={postComments}
                              setShowComment={setShowComment}
                              showComments={showComments}
                              renderComp={renderComp}
                              parentCallback={setRenderComp}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : item.fileType && item.fileType === "Document" ? (
                    <>
                      <div className="media-posts-outer-box">
                        <div className="media-posts-inner-box">
                          <div className="meadia-posts-card">
                            <div className="meadia-posts-card-header">
                              <div className="meadia-posts-card-profile w-100">
                                <div className="meadia-posts-card-profile-pic">
                                  <img
                                    src={
                                      item.profilePicture
                                        ? `${IMAGE_BASE_URL+item.profilePicture}`
                                        : process.env.PUBLIC_URL +
                                          "/Images/guest-user.jpg"
                                    }
                                    alt="profile"
                                  />
                                </div>
                                <div className="meadia-posts-card-profile-name d-flex justify-content-between align-items-center w-100">
                                  <div>
                                    <p>{item.userName}</p>
                                    <span>{item.postTime}</span>
                                  </div>

                                  {/* <div>
                                    <a href={item.fileName} download ><i class="fa fa-cloud-download" aria-hidden="true"></i></a>
                                  </div> */}
                                </div>
                              </div>
                            </div>
                            <h6 style={{ margin: " 20px" }}>
                                {item.content}
                              </h6>
                            <div className="meadia-posts-card-image">
                              
                              <div className="player-wrapper file-reader-option">
                                {item.fileName&&item.fileName.length>0&&item.fileName.split(".")[1] === "pdf" ? (
                                  <>
                                    <a
                                      href={`${IMAGE_BASE_URL+item.postImageOrVedio}`}
                                      target="_blank"
                                      download
                                     
                                      className="downloadFileButton"
                                    >
                                      <i
                                        class="fa fa-cloud-download"
                                        aria-hidden="true"
                                      ></i>
                                    </a>
                                    <FileViewer
                                      fileType={"pdf"}
                                      filePath={`${IMAGE_BASE_URL+item.postImageOrVedio}`}
                                    />
                                  </>
                                ) : (
                                  <>
                                    <a
                                      href={item.postImageOrVedio}
                                      download
                                      target="_blank"
                                      className="downloadFileButton"
                                    >
                                      <i
                                        class="fa fa-cloud-download"
                                        aria-hidden="true"
                                      ></i>
                                    </a>
                                    <FileViewer
                                      fileType={"docx"}
                                      filePath={item.postImageOrVedio}
                                    />
                                  </>

                                  // <DocViewer pluginRenderers={DocViewerRenderers}
                                  //  documents={ [ { uri: (item.postImageOrVedio) }]} />
                                )}
                              </div>
                            </div>
                            <div className="like-cmnt-counting like-cmnt-countingcustom">
                              <div
                                className="likes-count counter"
                                onClick={() =>
                                  AddLike(
                                    item.postID,
                                    item.communityID,
                                    item.groupID
                                  )
                                }
                              >
                                {item.isLikeOrUnlike === true ? (
                                  <img
                                    className="likes-count"
                                    src="Images/like-icon-liked.svg"
                                    alt="like"
                                  />
                                ) : (
                                  <img
                                    className="likes-count"
                                    src="Images/like-icon.svg"
                                    alt="like"
                                  />
                                )}
        Like
                               <span> {item.likeCount}</span>
                              </div>
                              <div
                                className="cmnt-count counter"
                                onClick={() =>
                                  showCommentSection(item.postID, !showComments)
                                }
                              >
                                <img src="Images/cmnt-icon.svg" alt="comment" />
                                Comment
                               <span> {item.commentCount}</span>
                              </div>

                              <div className="share-post-card counter">
                                <img src="Images/share-icon.svg" alt="share" />
                                Share
                              </div>
                            </div>

                            <GroupPost
                              getAllGroupPostDataByGroupIDCommunityID={
                                getAllGroupPostDataByGroupIDCommunityID
                              }
                              item={item}
                              showCommentSection={showCommentSection}
                              postComments={postComments}
                              setShowComment={setShowComment}
                              showComments={showComments}
                              renderComp={renderComp}
                              parentCallback={setRenderComp}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )
                )
              : isLoadingMedia && (
                  <div className="spinner-container">
                    <div className="loading-spinner"></div>
                  </div>
                )}
          </div>
        </div>
      </div>

      <NotificationContainer />
    </div>
  );
};

export default GroupDiscussion;
