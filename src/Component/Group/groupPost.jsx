import React, { useEffect, useState } from "react";
import GroupService from "../../Services/GroupService";
import CommentBox from "./commentBox";
import ShowPostComments from "./ShowPostComments";

const GroupPost = (props) => {
  const {
    item,
    showComments,
    postComments,
    showCommentSection,
    parentCallback,
    renderComp,
    getAllGroupPostDataByGroupIDCommunityID
  } = props;

  const [postComment, setPostComment] = useState("");

  const PostComments = (communityId, groupId, postID, x) => {
    const data = {
      GroupID: groupId,
      SiteID: communityId,
      PostID: postID,
      UserID: localStorage.getItem("userID"),
      Comments: postComment,
    };

    GroupService.createCommunityGroupComments(data)
      .then((response) => {
        if (response.data.status === "SUCCESS") {
          setPostComment("");
          showCommentSection(item.postID, true);
          parentCallback(renderComp + 1);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <div style={{ padding: "5px" }}>
        <div className="comments-section-custom" >
        <ShowPostComments
        getAllGroupPostDataByGroupIDCommunityID={getAllGroupPostDataByGroupIDCommunityID}
          item={item}
          showComments={showComments}
          postComments={postComments}
          showCommentSection={showCommentSection}
        />
        </div>
       
       

        <CommentBox
          buttonContent="Post"
          comment={postComment}
          setComment={setPostComment}
          handlePost={PostComments}
          item={item}
        />
      </div>
    </>
  );
};

export default GroupPost;
