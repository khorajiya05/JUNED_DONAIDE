import { useState } from "react";
import { AdminHeader } from "../admin-header";
import SideBar from "../SideBar";
import GroupService from "../../Services/GroupService";
import { Tooltip } from "react-bootstrap";
import { OverlayTrigger } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import UserService from "../../Services/UserServices";
import CommunityService from "../../Services/CommunityService";
import MembershipService from "../../Services/MemberShipService";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { INVITATION_URL } from '../../Config'
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import { errorToast, warningToast } from "../toast/toast";
const InviteMember = () => {

  const location = useLocation();

  const { UserID, RoleID } = useSelector((state) => state.auth?.loginData);

  const [Leftside, setLeftside] = useState(true);
  const [userGroup, setUserGroup] = useState([]);
  const [userCommunity, setUserCommunity] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [isComLoaded, setIsComLoaded] = useState(false);
  const [isGrpLoaded, setIsGrpLoaded] = useState(false);

  // ---------------------- Start group details sections ---------------------
  const search = location.search;
  const getGroupID = new URLSearchParams(search).get("groupID");
  const [groupDetails, setGroupDetails] = useState([]);
  const [referenceCode, setReferenceCode] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [userGroupMembers, setUserGroupMembers] = useState([]);
  const [communityName, setCommunityName] = useState(null);

  //===========================Send Email==============================//

  const [errorMessage, setErrorMessage] = useState("");
  const [sendEmailDivStatus, setSendEmailDivStatus] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [allGroupMembersEmailLists, setAllGroupMembersEmailLists] = useState([]);

  function Data() {
    setLeftside(!Leftside);
  }

  //--------------------- Clip Copy ----------------------//
  const url = `${INVITATION_URL}join-group?referenceCode=${referenceCode}`;

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const copyToClipboard = () => {
    copyTextToClipboard(url);
  };

  /**
   * send the email
   * @param {*} toEmail 
   */
  const sendEmail = (toEmail, resetForm) => {
    const url = `${INVITATION_URL}join-group?referenceCode=${referenceCode}`;
    const emailDetails = {
      To: toEmail,
      Name: groupDetails.groupName,
      Url: url,
      Type: "JoinGroup",
      CommunityName: communityName,
    };
    UserService.sendEmail(emailDetails)
      .then((response) => {
        if (response.data.status === "Accepted") {
          NotificationManager.success("Invitation send successfully.");
          resetForm();
          setGroupDetails([]);
          setErrorMessage("");
        } else {
          if (response.data.message) {
            warningToast(response.data.message);
          } else {
            warningToast("something went wrong");
          }
        }
      })
      .catch((e) => {
        if (e.message) {
          errorToast(e.message);
        } else {
          errorToast("Something went wrong");
        }
      });
  };

  let getAllUserData = async () => {
    const res = await MembershipService.getAllProfileDetails();
    const data = res.data;

    const options = data.map((d) => ({
      email: d.email,
    }));
    setAllUsers(options);
  };

  const getAllGroupPostDataByGroupIDCommunityID = async () => {
    if (getGroupID !== null) {
      const res1 = await GroupService.getGroupByGroupID(getGroupID);
      const res = await GroupService.getAllGroupPostDataByGroupIDCommunityID(
        getGroupID,
        res1.data.communityID
      );
      // setGroupPostData(res.data);
    }
  };

  useEffect(() => {
    getAllGroupPostDataByGroupIDCommunityID();
  }, []);

  const handleCommunityOnChange = (e) => {
    let { value, selectedOptions } = e.target;
    setCommunityName(selectedOptions[0].getAttribute("commu-name"));
    setSelectedCommunity(value);
    setSelectedGroup(selectedGroup);
    setUserGroupMembers(userGroupMembers);
  };

  const handleGroupOnChange = (e) => {
    let { value, selectedOptions } = e.target;
    setSelectedGroup(e.target.value);
    setReferenceCode(selectedOptions[0].getAttribute("data-id"));
    setUserGroupMembers(userGroupMembers);
  };

  const getAllGroupByCommunityID = async () => {
    setIsGrpLoaded(true)
    const res = await GroupService.getAllGroupByCommunityID(selectedCommunity);
    if (res.data.data !== null) {
      if (res.data.length > 0) {
        setUserGroup(res.data);
      }
    }
    setIsGrpLoaded(false)
  };

  //Get all user communities according to user id
  const getUserCommunityByUserID = async () => {
    setIsComLoaded(true)
    const res = await CommunityService.getUserCommunityByUserID(UserID);
    if (res.data.data !== null) {
      if (res.data.length > 0) {
        setUserCommunity(res.data);
      }
    }
    setIsComLoaded(false)
  };

  //Get all group member
  const getAllGroupMembers = async () => {
    const res = await GroupService.getAllGroupMembers(selectedGroup);
    if (res.data.data !== null) {
      if (res.data.length > 0) {
        setUserGroupMembers(res.data);
        setAllGroupMembersEmailLists(() => res.data?.map(member => member?.email))
      }
    }
  };

  const getCommunityGroupsWithCommunityDetails = async () => {
    // setIsLoaded(true);
    const res = await GroupService.getCommunityGroupsWithCommunityDetails(
      UserID
    );
    setUserGroup(res.data);
    // setIsLoaded(false);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required()
  })

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      email: ''
    },
    onSubmit: (values, { resetForm }) => {
      const index = allGroupMembersEmailLists.findIndex(memberEmail => memberEmail === values.email);
      if (index === -1) {
        sendEmail(values.email, resetForm);
      } else {
        setErrorMessage("email is already registered");
      }
    }
  });

  const { errors, touched } = formik;

  useEffect(() => {
    if (Number(RoleID) === Number(4)) {
      getCommunityGroupsWithCommunityDetails();
    }
  }, []);

  useEffect(() => {
    getUserCommunityByUserID();
    getAllGroupByCommunityID();
    getAllGroupMembers();
    getAllUserData();
  }, [selectedCommunity, selectedGroup]);

  return (
    <div>
      <AdminHeader Sidebar={Data} />
      <main className="">
        <div className="main-outer-container">
          <div className="dashboard-outer-container">
            <div className="inner-container-template m-0">
              <div className={Leftside ? "dashboard-container " : "dashboard-container active"}>
                <SideBar />
                <div className="right-sidebar">
                  <div className="inner-content-height">
                    <div className="admin-tools-menu">
                      <div className="admin-tools-menu-heading ">
                        <h3>
                          {RoleID !== 1 &&
                            <Link to="/admin-tools">

                              <i
                                className="fa fa-long-arrow-left me-2"
                                aria-hidden="true"
                              ></i>

                            </Link>}
                          Invite Members
                        </h3>
                      </div>
                      <div className="row rolespermission-inner-box">
                        {Number(RoleID) !== Number(4) && (
                          <div className="col-md-6">
                            <select
                              className="form-select mb-4 w-100"
                              aria-label="Default select example"
                              value={selectedCommunity}
                              onChange={(e) => handleCommunityOnChange(e)}
                            >
                              <option selected>Select Community</option>
                              {isComLoaded ? (
                                <option selected disabled>
                                  Loding Community....
                                </option>
                              ) : (
                                <>
                                  {userCommunity && userCommunity.length > 0 &&
                                    userCommunity.map((data) => (
                                      <option
                                        key={data.communityId}
                                        value={data.communityId}
                                        commu-name={data.communitySiteName}
                                      >
                                        {data.communitySiteName}
                                      </option>
                                    ))}
                                </>
                              )}
                            </select>
                          </div>
                        )}

                        <div className="col-md-6">
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={selectedGroup}
                            onChange={(e) => handleGroupOnChange(e)}
                          >
                            <option selected>Select Group</option>
                            {isGrpLoaded ? (
                              <option selected disabled>
                                Loding groups....
                              </option>
                            ) : (
                              <>
                                {userGroup &&
                                  userGroup.map((data) =>
                                    data.groupList ? (
                                      data.groupList.map((item) => (
                                        <option
                                          value={item.groupID}
                                          key={item.groupID}
                                          data-id={item.groupReferenceCode}
                                        >
                                          {item.groupName}
                                        </option>
                                      ))
                                    ) : (
                                      <option
                                        value={data.groupID}
                                        key={data.groupID}
                                        data-id={data.groupReferenceCode}
                                      >
                                        {data.groupName}
                                      </option>
                                    )
                                  )}
                              </>
                            )}
                          </select>
                        </div>
                      </div>
                      {referenceCode != null && (
                        <>
                          <div className="invite-members-social-media">
                            <h3 className="">
                              Invite Members
                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip>
                                    Copy Url below to share the group with your
                                    loved ones.
                                  </Tooltip>
                                }
                              >
                                <i className="fa fa-info-circle ms-3"></i>
                              </OverlayTrigger>
                            </h3>
                          </div>
                          <form onSubmit={formik.handleSubmit}>
                            <div className="modal-body members-group-lists p-0">
                              <div className="cstm-search members-group-lists-copy-url invite-page">
                                <input
                                  disabled={true}
                                  type="text"
                                  className="members-group-lists-search form-control"
                                  // placeholder={url}
                                  value={url}
                                // onChange={handleCopyText}
                                />
                                <button
                                  type="button"
                                  className="copy-url-btn copy-invite"
                                  onClick={copyToClipboard}
                                >
                                  Copy
                                </button>
                              </div>

                              <div className="invite-members-social-media">
                                <h3>Invite via social media</h3>
                                <ul className="ul-custom-invite ivite-list row">
                                  <div className="col-md-6">
                                    {/* <li>
                                      <button
                                        className={`${sendEmailDivStatus ? "active-custom buttoncss" : "buttoncss"}`}
                                        type="button"
                                        onClick={() => openSendEmailDiv()}
                                      >
                                        <img
                                          className="imageclass"
                                          src="/Images/gmail.png"
                                          alt=""
                                        />
                                        Email
                                      </button>
                                    </li> */}
                                  </div>
                                </ul>
                              </div>
                              <div className="invite-members-social-media">
                                <h3>"Send an Email"</h3>
                                <div className="row invite-member-disable-input">
                                  <div className="col-md-6">
                                    <div className="form-group mb-3 ivite-form">
                                      <label className="form-label">"To Email"</label>
                                      <input
                                        type="text"
                                        className="form-control cstm-field"
                                        placeholder="Enter Emaildfdf"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                      />
                                    </div>
                                    {(errors.email && touched.email) && <div className="text-danger">{errors.email}</div>}
                                    <span style={{ color: "red" }}>{errorMessage}</span>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group mb-3">
                                      <label className="form-label"> "Email Message"</label>
                                      <input
                                        type="text"
                                        className="form-control cstm-field"
                                        placeholder="Enter Message"
                                        name="message"
                                        disabled
                                        value={url}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="modal-footer mt-3">
                              <button
                                type="button"
                                className="cancel-button btn-custom"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="save-button btn-custom"
                              >
                                Send
                              </button>
                            </div>
                          </form>
                        </>
                      )}
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

export default InviteMember;
