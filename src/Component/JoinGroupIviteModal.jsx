import { useState } from "react";
import { Tooltip } from "react-bootstrap";
import { OverlayTrigger } from "react-bootstrap";
import Modal from "react-modal";
import PhoneInput from "react-phone-number-input";
import GroupService from "../Services/GroupService";
import { INVITATION_URL } from "../Config";
import SendSMSService from "../Services/SendSMSService";
import { errorToast, successToast, warningToast } from "./toast/toast";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import UserService from "../Services/UserServices";
import { useSelector } from "react-redux";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  }
};
const JoinGroupIviteModal = (props) => {
  const {
    isInviteModalOpen,
    closeInviteModal,
    groupDetails,
    handleInputSMSChange,
  } = props;

  const { UserID, UserName } = useSelector((state) => state.auth?.loginData);
  const url = `${INVITATION_URL}join-group?referenceCode=${groupDetails?.groupReferenceCode}`;

  const [tab, setTab] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  /**
   * copy text to clipboard
   * @param {*} text 
   * @returns 
   */
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  /**
   * add invitation history
   */
  const AddInvitationHistory = () => {
    const data = {
      GroupID: groupDetails.groupID,
      // whoInvited: joinedGroupUser.groupMembersID,
      siteID: groupDetails.communityID,
      status: "Active",
      whomeToInvite: UserID,
      invitationDate: new Date().toISOString().split("T")[0],
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

  /**
   * sms send handler
   */
  const handleSmsSend = () => {
    if (!phoneNumber) {
      setErrorMessage("Please enter to number!");
    } else if (!isPossiblePhoneNumber(phoneNumber)) {
      setErrorMessage("Please enter valid phone number!");
    }
    else {
      setErrorMessage();
      const messagetext = "You are invited for join a group. Enter below link to join group" + ` ${INVITATION_URL}join-group?referenceCode=${groupDetails?.groupReferenceCode}`;
      SendSMSService.sendSMS(phoneNumber, messagetext)
        .then((response) => {
          if (response.data.status === "SUCCESS") {
            successToast("SMS sent successfully!");
            closeInviteModal();
            setPhoneNumber();
            setEmail();
            setTab("");
          } else {
            warningToast("Something went wrong");
          }
        })
        .catch((e) => {
          if (e.response?.data?.ErrorMessage) {
            errorToast(e.response?.data?.ErrorMessage)
          } else {
            errorToast("Something went wrong");
          }
        });
    };
  };

  /**
   * email validation method
   */
  const emailVladitator = async (email) => {
    if (!email) {
      setErrorMessage("Please enter email.");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setErrorMessage("Please enter valid email-id like(test@gmail.com)");
    } else {
      const foundUser = await GroupService.getGroupMembersDetailsByEmailId(email, groupDetails?.communityID);
      if (foundUser.data.statusCode === 404) {
        SendEmail();
        setErrorMessage();
      } else {
        setErrorMessage("This email is already used.");
      }
    }
  }

  /**
   * email send handler
   * @param {*} e 
   */
  const SendEmail = (e) => {
    const emailDetails = {
      To: email,
      Name: groupDetails?.groupName,
      Url: url,
      UserName,
      CommunityID: groupDetails.communityID,
      CommunityName: groupDetails.communityName,
      Type: "JoinGroup",
    };
    UserService.sendEmail(emailDetails)
      .then((response) => {
        if (response.data.status === "Accepted") {
          successToast("Email sent successfully!");
          closeInviteModal();
          setPhoneNumber();
          setEmail();
          setTab("");
        } else {
          warningToast("something went wrong");
        }
      })
      .catch((e) => {
        if (e.response?.data?.ErrorMessage) {
          errorToast(e.response?.data?.ErrorMessage)
        } else {
          errorToast("Something went wrong");
        }
      });
  };

  return (
    <div>
      <Modal
        isOpen={isInviteModalOpen}
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
            <button className="modal-close-btn" onClick={() => { closeInviteModal(); setErrorMessage(""); setTab(""); }}>
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
                  value={url}
                />
                <button
                  type="button"
                  className="copy-url-btn"
                  onClick={() => copyTextToClipboard(url)}
                >
                  Copy
                </button>
              </div>
              <div className="invite-members-social-media">
                <h3>Invite via social media</h3>
                <ul className="ul-custom-invite ivite-list ">
                  {/* <li>
                    <button
                      className="buttoncss"
                      type="button"
                      onClick={() => { setTab("sms"); setEmail(); setErrorMessage(""); }}
                    >
                      <img className="imageclass" src="/Images/sms-icon.png" alt="" />
                      Send an SMS
                    </button>
                  </li> */}
                  <li>
                    <button
                      className="buttoncss"
                      type="button"
                      onClick={() => { setTab("email"); setPhoneNumber(); setErrorMessage(""); }}
                    >
                      <img className="imageclass" src="/Images/gmail.png" alt="" />
                      Email
                    </button>
                  </li>
                </ul>
              </div>
              {tab === "sms" ? (
                <>
                  <div className="invite-members-social-media">
                    <h3>Send an SMS</h3>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label className="form-label">"To Number"</label>
                          <PhoneInput
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            name="toNumber"
                            onChange={setPhoneNumber}
                          />
                          <span style={{ color: "red" }}>{errorMessage}</span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label className="form-label">Message</label>
                          <input
                            disabled
                            type="text"
                            className="form-control cstm-field"
                            placeholder="Enter Message"
                            name="message"
                            value={url}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer mt-3">
                    <button
                      type="button"
                      onClick={() => { closeInviteModal(); setErrorMessage(""); setTab(""); }}
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="save-button"
                      onClick={() => handleSmsSend()}
                    >
                      Send SMS
                    </button>
                  </div>
                </>
              ) : (
                (tab === "email" ? (
                  <>
                    <div className="invite-members-social-media">
                      <h3>Send an Email</h3>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <label className="form-label">"To Email"</label>
                            <input
                              placeholder="Enter email"
                              value={email}
                              name="toEmail"
                              onChange={(e) => setEmail(e.target?.value)}
                            />
                          </div>
                          <span style={{ color: "red" }}>{errorMessage}</span>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <label className="form-label">Email Message</label>
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
                    <div className="modal-footer mt-3">
                      <button
                        type="button"
                        onClick={() => { closeInviteModal(); setErrorMessage(""); setTab(""); setEmail(""); }}
                        className="cancel-button"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="save-button"
                        onClick={() => emailVladitator(email)}
                      >
                        Send Email
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                ))
              )}
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default JoinGroupIviteModal;
