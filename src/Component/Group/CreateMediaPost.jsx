import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "auto",
    transform: "translate(-50%, -50%)",
  },
  errorStyle: {
    color: "red",
    fontSize: "20px",
  },
};
const CreateMediaPost = (props) => {
  const { modalIsOpen, OpenModal, closeModal,groupDetails,thumbnails,videothumbnail} = props;

  return (
    <div>

      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onAfterOpen={OpenModal}
        contentLabel="Example Modal"
        onRequestClose={closeModal}
      >
        <div className="modal-header">
          <h5 className="mb-0">Add Photos,Vedios,Documents</h5>

          <button className="modal-close-btn" onClick={closeModal}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>


        <div class="modal-body-create-grp create-event">
          <form>
            <div class="create-event-from mt-4">
              <div class="row">
              <div className="create-post-outer-box">
          <div className="create-post-inner-box">
            <div className="create-post-text">
              <img
                src={
                  process.env.PUBLIC_URL +
                      "/Images/guest-user.jpg"
                }
                alt="cover pic"
              />
              <textarea
                className="form-control"
                rows="2"
                id="comment"
                placeholder="Write a post here..."
                
              ></textarea>
            </div>
           <span style={{color:"red",marginLeft:"60px",fontWeight:"700"}} ></span> 
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
                src={
                  thumbnails &&
                  URL.createObjectURL(thumbnails)
                }
                alt=""
              />
            </div>

            <div
              className="thumbnail-preview  thumbnail-video-post-img"
              style={{
                display: videothumbnail
                  ? "block"
                  : "none",
              }}
            >
              <div className="embed-responsive embed-responsive-4by3">
                <iframe
                  className="embed-responsive-item"
                  src={
                    videothumbnail &&
                    URL.createObjectURL(videothumbnail)
                  }
                ></iframe>
              </div>
            </div>

            <div className="create-post mt-2">
              <div className="create-post-icons-upld">
                <label>
                  <input
                    type="file"
                    className="d-none"
                    accept="image/*"
                    
                  />

                  <i
                    class="fa fa-picture-o"
                    aria-hidden="true"
                  ></i>
                  {/* <span>Upload Image</span> */}
                  <div className="add-post-remove-icon"></div>
                </label>
                <label>
                  <input
                    type="file"
                    className="d-none"
                  />
                  <i
                    class="fa fa-camera-retro"
                    aria-hidden="true"
                  ></i>
                  {/* <span>Click Image</span> */}
                </label>
                <label>
                  <input
                    type="file"
                    className="d-none"
                    accept="video/*"
                    
                  />
                  <i
                    class="fa fa-video-camera"
                    aria-hidden="true"
                  ></i>
                  {/* <span>Click Image</span> */}
                </label>
              </div>
              <button
                className="post"
                
              >
                Post
              </button>
            </div>
          </div>
        </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CreateMediaPost;
