import React, { useState } from "react";

import InputEmoji from 'react-input-emoji'
import {IMAGE_BASE_URL} from '../../Config'

const CommentBox = (props) => {

  const { comment, setComment, handlePost, item, buttonContent } = props;


  return (
    <div>
      <div className="meadia-posts-create-cmnt">
        <img
          className="commentprofile2 commentprofile"
          src={
            localStorage.getItem("userImg") == "null" ||
            localStorage.getItem("userImg") == undefined||localStorage.getItem("userImg") == "" 
              ? process.env.PUBLIC_URL + "/Images/guest-user.jpg"
              : `${IMAGE_BASE_URL+localStorage.getItem("userImg")}`
          }
          alt="img"
        />

        <div className="commenttextbox">
         
          <InputEmoji
          value={comment}
          onChange={setComment}
          cleanOnEnter
          placeholder="Type a message"
        />

          {/* <Emoji/> */}
          <button
            className="post"
            onClick={() =>
              handlePost(
                item.communityID,
                item.groupID,
                item.postID,
                item.commentID
              )
            }
          >
            {buttonContent}
          </button>
        </div>
        <br />
      </div>
    </div>
  );
};

export default CommentBox;
