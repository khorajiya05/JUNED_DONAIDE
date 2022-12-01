import Modal from "react-modal";
const CreateGroup = (props) => {
  const {
    modalIsOpen,
    afterOpenModal,
    customStyles,
    closeModal,
    editCoverImage,
    selectedImage,
    modelStatus,
    changeHandlerImage,
    values,
    handleInputChange,
    userCommunity,
    isLoading,
    errorMessage,
    Activeborder,
    Activebor,
    Activeborder2,
    Activebor2,
    GroupFormValidation
  } = props;
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        contentLabel="Example Modal"
        backdrop="static"
      >
        <div className="modal-header">
          <h5 className="mb-0"> Create Group</h5>
          <button className="modal-close-btn" onClick={closeModal}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>
        <form>
          <div className="modal-body-create-grp">
            <div className="modal-body p-0">
              <div className="modal-create-group-upld-img mb-3">
                <div className="create-group-upld-img">
                  <label>
                    {
                      // communityLogo
                      editCoverImage ? (
                        <div className="">
                          <img
                            alt="not fount"
                            width={"100%"}
                            src={editCoverImage}
                          />
                        </div>
                      ) : selectedImage != null ? (
                        <div className="">
                          <img
                            alt="not fount"
                            width={"100%"}
                            src={URL.createObjectURL(selectedImage)}
                          /> 
                        </div>
                      ) : (
                        ""
                      )
                    }
                    <input
                      disabled={modelStatus}
                      type="file"
                      name="myImage"
                      accept="image/*"
                      onChange={(event) => {
                        changeHandlerImage(event);
                      }}
                    />
                  </label>
                </div>
              </div>
              <div className="modal-create-group-name">
                <div className="form-group field-set-form mb-3">
                  <div className="cstm-field-dropdown mb-3">
                    <label className="form-label">Community</label>
                    <div className="select text-left">
                      <select
                        className="select"
                        disabled={modelStatus}
                        name="siteID"
                        value={values.siteID}
                        onChange={handleInputChange}
                      >
                        <option value="default">Select Community</option>
                        {userCommunity&&userCommunity.length > 0 ? (
                          userCommunity.map((option) => (
                            <option
                              key={option.communityId}
                              value={option.communityId}
                            >
                              {option.communitySiteName}
                            </option>
                          ))
                        ) : (
                          <>
                            {isLoading === true ? (
                              <div className="spinner-container">
                                <div className="loading-spinner"></div>
                              </div>
                            ) : (
                              <h1 style={{ textAlign: "center" }}>
                                No Community
                              </h1>
                            )}
                          </>
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label">Group Name</label>
                    <input
                      disabled={modelStatus}
                      type="text"
                      className="form-control cstm-field"
                      placeholder="Enter Group Name"
                      name="groupName"
                      value={values.groupName ? values.groupName : ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      disabled={modelStatus}
                      placeholder="Enter Description"
                      className="form-control"
                      name="description"
                      value={values.description}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
                <span style={{ color: "red" }}>{errorMessage}</span>
              </div>
              <div className="modal-create-group-privacy">
                <h5>Privacy</h5>
                <p>Who can view this group's content?</p>
                <div
                  onClick={!modelStatus ? Activeborder : ""}
                  className={
                    Activebor
                      ? "privacy-card-outer"
                      : "privacy-card-outer active"
                  }
                >
                  <div className="privacy-card-public">
                    <div className="">
                      <i className="fa fa-users" aria-hidden="true"></i>
                    </div>
                    <div className="">
                      <h5>Public</h5>
                      <p>Anyone can view this group's content and join</p>
                    </div>
                  </div>
                </div>
                <div
                  onClick={!modelStatus ? Activeborder2 : ""}
                  className={
                    Activebor2
                      ? "privacy-card-outer"
                      : "privacy-card-outer active"
                  }
                >
                  <div className="privacy-card-public">
                    <div className="">
                      <i className="fa fa-lock" aria-hidden="true"></i>
                    </div>
                    <div className="">
                      <h5>Private</h5>
                      <p>Only members can view this group's content</p>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          {!modelStatus ? (
            <div className="modal-footer">
              <button
                type="button"
                onClick={closeModal}
                className="cancel-button"
              >
                Cancel
              </button>
              <button
                type="button"
                className="save-button"
                onClick={GroupFormValidation}
              >
                Save
              </button>
            </div>
          ) : null}
        </form>
      </Modal>
    </div>
  );
};

export default CreateGroup;
