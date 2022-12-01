import React, { useState, useEffect } from "react";
import GroupService from "../../Services/GroupService";
import CommentBox from "./commentBox";
import { useDispatch, useSelector } from "react-redux";
import { getRoleAndPermissionListByID } from "../../ReduxStore/Actions/roleAndPermissionAction";
import { IMAGE_BASE_URL } from '../../Config'

const ShowPostComments = (props) => {

  let dispatch = useDispatch();

  const {
    showComments,
    postComments,
    item,
    showCommentSection,
    getAllGroupPostDataByGroupIDCommunityID,
  } = props;

  const permission = useSelector((state) => state.roleAndPermision.data);
  const { UserID, RoleID } = useSelector((state) => state.auth?.loginData);

  const [show, sethow] = useState(0);
  const [commentReply, setCommentReply] = useState("");

  const AddLike = async (postID, commentID) => {
    const res1 = await GroupService.getGroupByGroupID(item.groupID);
    const data = {
      SiteID: res1.data.communityID,
      CommentID: commentID,
      UserID,
      GroupID: item.groupID,
      PostID: postID,
      Like: 1,
    };

    GroupService.AddCommentLike(data)
      .then((response) => {
        if (response.data.statusCode === 200) {
          showCommentSection(postID, true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const AddCommentReply = async (x, y, postID, commentID) => {
    const res1 = await GroupService.getGroupByGroupID(item.groupID);

    const data = {
      siteID: res1.data.communityID,
      userID: UserID,
      commentID: commentID,
      groupID: item.groupID,
      postID: postID,
      replyMessage: commentReply,
    };
    GroupService.AddCommentReply(data).then((res) => {
      if (res.data.status === "SUCCESS") {
        setCommentReply("");
        showCommentSection(postID, true);
        getAllGroupPostDataByGroupIDCommunityID(item.groupID);
      }
    });
  };

  const showReplaySection = (commID) => {
    let getCommReplyId = postComments.filter((obj) => {
      return obj.commentID === commID;
    });

    if (getCommReplyId.length > 0) {
      if (getCommReplyId[0].commentID === commID) {
        sethow(getCommReplyId[0].commentID);
      }
    }
  };

  const DeleteCommunityGroupComments = async (ID) => {
    const res = await GroupService.DeleteCommunityGroupComments(ID)
    if (res.data.status === "SUCCESS") {
      getAllGroupPostDataByGroupIDCommunityID(item.groupID);
      showCommentSection(item.postID, true);
    }
  }
  useEffect(() => {
    dispatch(getRoleAndPermissionListByID(UserID, RoleID));
  }, []);

  return (
    <div className="post-commentsection">
      {showComments === true
        ? postComments &&
        postComments.map((data) =>
          item.postID === data.postID && data.comments.length > 0 ? (
            <>
              <div className="commentitem" key={data.postID}>
                <img
                  className="commentprofile"
                  src={data.profilePicture ? `${IMAGE_BASE_URL + data.profilePicture}` : process.env.PUBLIC_URL + " /Images/guest-user.jpg "}
                  alt="img"
                />
                <div className="comment-details">
                  <h2>{data.userName}</h2>
                  <p>{data.comments}</p>
                  <div>
                    <div className="row">
                      <div className="commentlike">
                        <button
                          style={{ marginRight: "10px" }}
                          onClick={() => AddLike(data.postID, data.commentID)}
                        >
                          Like
                        </button>
                        <span className="likeoverlay"> </span>
                        <br />

                        <span className="likeoverlay">{data.likeCount}</span>
                      </div>

                      <div className="replybutton">
                        <button
                          onClick={() => showReplaySection(data.commentID)}
                        >
                          Reply
                        </button>
                      </div>

                      {permission && permission.length > 0 &&
                        permission.filter(
                          (e) => e.permissionName === "Delete comments"
                        ).length > 0 && (
                          <div className="deletebutton">
                            <button
                              onClick={() => DeleteCommunityGroupComments(data.commentID)}
                            >
                              Delete
                            </button>
                          </div>)}

                    </div>

                    <div className="commentReplay">
                      {data.commentReply.map((item) => (
                        <>
                          <div
                            className="commentReplay-section"
                            key={item.replyMessage}
                          >
                            <div>
                              <img
                                className="commentprofile2 commentprofile"
                                src={
                                  item.profilePicture
                                    ? `${IMAGE_BASE_URL + item.profilePicture}`
                                    : process.env.PUBLIC_URL +
                                    "/Images/guest-user.jpg"
                                }
                                alt="img"
                              />
                            </div>

                            <div>
                              <h2>{item.userName}</h2>
                              <p>{item.replyMessage}</p>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>

                    <div className=" meadia-posts-create-cmnt1 fgdjfghdfkj">
                      <div className="row">
                        <div className="col-md-12">
                          {data.commentID === show && (
                            <>
                              <CommentBox
                                comment={commentReply}
                                setComment={setCommentReply}
                                handlePost={AddCommentReply}
                                item={data}
                                buttonContent="Reply"
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )
        )
        : ""}
    </div>
  );
};

export default ShowPostComments;
