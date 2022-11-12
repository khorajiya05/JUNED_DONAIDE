import React from "react";
import { Tooltip } from "react-bootstrap";
import { OverlayTrigger } from "react-bootstrap";
import Modal from "react-modal";
import PhoneInput from "react-phone-number-input";
const JoinGroupIviteModal = (props) => {
  const {
    modalIsOpen,
    afterOpenModal,
    customStyles,
    closeModal,
    url,
    handleCopyText,
    smsDivStatus,
    copyToClipboard,
    sendEmailDivStatus,
    openSMSDiv,
    openSendEmailDiv,
    sendSMSValues,
    handleInputSMSChange,
    errorMessage,
    ValidateSMSFields,
    closeModal1,
    modalIsOpen1,
    phoneNo,
    setPhoneNo,
    isValidPhoneNumber
  } = props;
  return (
    <div>
     
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="moda-dialogue-custom small-modal">
        <div className="modal-header">
          <h5 className="mb-0">
            Invite Members
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  Copy Url below to share the group with your loved ones.
                </Tooltip>
              }
            >
              <i className="fa fa-info-circle ms-3"></i>
            </OverlayTrigger>
          </h5>

          <button className="modal-close-btn" onClick={closeModal}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>
        <form>
          <div className="modal-body members-group-lists">
            <div className="cstm-search members-group-lists-copy-url">
              <input
                disabled={true}
                type="text"
                className="members-group-lists-search form-control"
                // placeholder={url}
                value={url}
                onChange={handleCopyText}
              />
              <button
                type="button"
                className="copy-url-btn"
                onClick={copyToClipboard}
              >
                Copy
              </button>
            </div>
            {!smsDivStatus && !sendEmailDivStatus ? (
              <div className="invite-members-social-media">
                <h3>Invite via social media</h3>
                <ul className="ul-custom-invite ivite-list ">
                  <li>
                    <button
                      className="buttoncss"
                      type="button"
                      onClick={() => openSMSDiv(true)}
                    >
                      <img className="imageclass" src="/Images/sms-icon.png" />
                      Send an SMS
                    </button>
                  </li>

                  <li>
                    <button
                      className="buttoncss"
                      type="button"
                      onClick={() => openSendEmailDiv(true)}
                    >
                      <img className="imageclass" src="/Images/gmail.png" />
                      Email
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="invite-members-social-media">
                <h3>{sendEmailDivStatus ? "Send an Email" : "Send an SMS"}</h3>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">
                        {sendEmailDivStatus ? "To Email" : "To Number"}
                      </label>
                      {sendEmailDivStatus ? (
                      <input
                        type="text"
                        className="form-control cstm-field"
                        placeholder={
                          sendEmailDivStatus ? "Enter Email" : "Enter Number"
                        }
                        name="toNumber"
                        value={sendSMSValues.toNumber}
                        onChange={handleInputSMSChange}
                      />):(
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
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label">
                        {sendEmailDivStatus ? "Email Message" : "Message"}
                      </label>
                      <input
                        disabled
                        type="text"
                        className="form-control cstm-field"
                        placeholder="Enter Message"
                        name="message"
                        value={url}
                        onChange={handleInputSMSChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <span style={{ color: "red" }}>{errorMessage}</span>
          </div>
          {smsDivStatus || sendEmailDivStatus ? (
            <div className="modal-footer mt-3">
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
                onClick={ValidateSMSFields}
              >
                Send
              </button>
            </div>
          ) : (
            ""
          )}
        </form>
        </div>
      </Modal>





      <Modal
                      isOpen={modalIsOpen1}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                      <div className="modal-header">
                        <h5 className="mb-0">Invite Members</h5>
                        <button
                          className="modal-close-btn"
                          onClick={closeModal1}
                        >
                          <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                      </div>

                      <form>
                        <div className="modal-body members-group-lists">
                          <div className="cstm-search">
                            <input
                              type="text"
                              className="members-group-lists-search form-control"
                              placeholder="Search members..."
                            />
                            <button type="submit" className="searchButton">
                              <i className="fa fa-search"></i>
                            </button>
                          </div>

                          <div className="invite-members-lists remove-members-lists">
                            <ul>
                              <li>
                                <div className="remove-users-prof">
                                  <img src="Images/item-one.jpg" />
                                  <h5>John Williamson</h5>
                                </div>
                                <button
                                  type="button"
                                  to="#"
                                  className="text-decoration-none"
                                  className="post"
                                  href="/admin-group-detail"
                                >
                                  <i
                                    className="fa fa-minus me-2"
                                    aria-hidden="true"
                                  ></i>
                                  Remove
                                </button>
                              </li>
                              <li>
                                <div className="remove-users-prof">
                                  <img src="Images/item-two.jpg" />
                                  <h5>George</h5>
                                </div>
                                <button
                                  type="button"
                                  to="#"
                                  className="text-decoration-none"
                                  className="post"
                                  href="/admin-group-detail"
                                >
                                  <i
                                    className="fa fa-minus me-2"
                                    aria-hidden="true"
                                  ></i>
                                  Remove
                                </button>
                              </li>
                              <li>
                                <div className="remove-users-prof">
                                  <img src="Images/item-five.jpg" />
                                  <h5>Richard Smith</h5>
                                </div>
                                <button
                                  type="button"
                                  to="#"
                                  className="text-decoration-none"
                                  className="post"
                                  href="/admin-group-detail"
                                >
                                  <i
                                    className="fa fa-minus me-2"
                                    aria-hidden="true"
                                  ></i>
                                  Remove
                                </button>
                              </li>
                              <li>
                                <div className="remove-users-prof">
                                  <img src="Images/item-one.jpg" />
                                  <h5>Brisn Doe</h5>
                                </div>
                                <button
                                  type="button"
                                  to="#"
                                  className="text-decoration-none"
                                  className="post"
                                  href="/admin-group-detail"
                                >
                                  <i
                                    className="fa fa-minus me-2"
                                    aria-hidden="true"
                                  ></i>
                                  Remove
                                </button>
                              </li>
                              <li>
                                <div className="remove-users-prof">
                                  <img src="Images/item-four.jpg" />
                                  <h5>Jenzkie</h5>
                                </div>
                                <button
                                  type="button"
                                  to="#"
                                  className="text-decoration-none"
                                  className="post"
                                  href="/admin-group-detail"
                                >
                                  <i
                                    className="fa fa-minus me-2"
                                    aria-hidden="true"
                                  ></i>
                                  Remove
                                </button>
                              </li>
                              <li>
                                <div className="remove-users-prof">
                                  <img src="Images/item-three.jpg" />
                                  <h5>Steve</h5>
                                </div>
                                <button
                                  type="button"
                                  to="#"
                                  className="text-decoration-none"
                                  className="post"
                                  href="/admin-group-detail"
                                >
                                  <i
                                    className="fa fa-minus me-2"
                                    aria-hidden="true"
                                  ></i>
                                  Remove
                                </button>
                              </li>
                              <li>
                                <div className="remove-users-prof">
                                  <img src="Images/item-five.jpg" />
                                  <h5>Lance Bongrol</h5>
                                </div>
                                <button
                                  type="button"
                                  to="#"
                                  className="text-decoration-none"
                                  className="post"
                                  href="/admin-group-detail"
                                >
                                  <i
                                    className="fa fa-minus me-2"
                                    aria-hidden="true"
                                  ></i>
                                  Remove
                                </button>
                              </li>
                              <li>
                                <div className="remove-users-prof">
                                  <img src="Images/item-one.jpg" />
                                  <h5>Riched Williamson</h5>
                                </div>
                                <button
                                  type="button"
                                  to="#"
                                  className="text-decoration-none"
                                  className="post"
                                  href="/admin-group-detail"
                                >
                                  <i
                                    className="fa fa-minus me-2"
                                    aria-hidden="true"
                                  ></i>
                                  Remove
                                </button>
                              </li>
                              <li>
                                <div className="remove-users-prof">
                                  <img src="Images/item-two.jpg" />
                                  <h5>John Smith</h5>
                                </div>
                                <button
                                  type="button"
                                  to="#"
                                  className="text-decoration-none"
                                  className="post"
                                  href="/admin-group-detail"
                                >
                                  <i
                                    className="fa fa-minus me-2"
                                    aria-hidden="true"
                                  ></i>
                                  Remove
                                </button>
                              </li>
                              <li>
                                <div className="remove-users-prof">
                                  <img src="Images/item-three.jpg" />
                                  <h5>Mihai Niculla</h5>
                                </div>
                                <button
                                  type="button"
                                  to="#"
                                  className="text-decoration-none"
                                  className="post"
                                  href="/admin-group-detail"
                                >
                                  <i
                                    className="fa fa-minus me-2"
                                    aria-hidden="true"
                                  ></i>
                                  Remove
                                </button>
                              </li>
                              <li>
                                <div className="remove-users-prof">
                                  <img src="Images/item-six.jpg" />
                                  <h5>Andrew</h5>
                                </div>
                                <button
                                  type="button"
                                  to="#"
                                  className="text-decoration-none"
                                  className="post"
                                  href="/admin-group-detail"
                                >
                                  <i
                                    className="fa fa-minus me-2"
                                    aria-hidden="true"
                                  ></i>
                                  Remove
                                </button>
                              </li>
                              <li>
                                <div className="remove-users-prof">
                                  <img src="Images/item-one.jpg" />
                                  <h5>John Williamson</h5>
                                </div>
                                <button
                                  type="button"
                                  to="#"
                                  className="text-decoration-none"
                                  className="post"
                                  href="/admin-group-detail"
                                >
                                  <i
                                    className="fa fa-minus me-2"
                                    aria-hidden="true"
                                  ></i>
                                  Remove
                                </button>
                              </li>
                              <li>
                                <div className="remove-users-prof">
                                  <img src="Images/item-five.jpg" />
                                  <h5>Jack Smith</h5>
                                </div>
                                <button
                                  type="button"
                                  to="#"
                                  className="text-decoration-none"
                                  className="post"
                                  href="/admin-group-detail"
                                >
                                  <i
                                    className="fa fa-minus me-2"
                                    aria-hidden="true"
                                  ></i>
                                  Remove
                                </button>
                              </li>
                              <li>
                                <div className="remove-users-prof">
                                  <img src="Images/item-one.jpg" />
                                  <h5>John Williamson</h5>
                                </div>
                                <button
                                  type="button"
                                  to="#"
                                  className="text-decoration-none"
                                  className="post"
                                  href="/admin-group-detail"
                                >
                                  <i
                                    className="fa fa-minus me-2"
                                    aria-hidden="true"
                                  ></i>
                                  Remove
                                </button>
                              </li>
                              <li>
                                <div className="remove-users-prof">
                                  <img src="Images/item-two.jpg" />
                                  <h5>John Doe</h5>
                                </div>
                                <button
                                  type="button"
                                  to="#"
                                  className="text-decoration-none"
                                  className="post"
                                  href="/admin-group-detail"
                                >
                                  <i
                                    className="fa fa-minus me-2"
                                    aria-hidden="true"
                                  ></i>
                                  Remove
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="modal-footer mt-3">
                          <button
                            type="button"
                            onClick={closeModal1}
                            className="cancel-button"
                          >
                            Cancel
                          </button>
                          <button type="button" className="save-button">
                            Save
                          </button>
                        </div>
                      </form>
                    </Modal>
    </div>
  );
};

export default JoinGroupIviteModal;
