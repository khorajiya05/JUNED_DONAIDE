import InputEmoji from 'react-input-emoji'
import { useSelector } from 'react-redux';
import { IMAGE_BASE_URL } from '../../Config'

const CommentBox = (props) => {

  const { comment, setComment, handlePost, item, buttonContent } = props;
  const { profilePicture } = useSelector((state) => state.profileData?.profileData);

  return (
    <div>
      <div className="meadia-posts-create-cmnt">
        <img
          className="commentprofile2 commentprofile"
          src={profilePicture == "null" || profilePicture == undefined || profilePicture == ""
            ? process.env.PUBLIC_URL + "/Images/guest-user.jpg"
            : `${IMAGE_BASE_URL + profilePicture}`
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
