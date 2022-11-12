import React, { useState } from "react";
import { AdminHeader } from "../admin-header";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import OwlCarousel from "react-owl-carousel";
import GroupService from "../../Services/GroupService";
import CommunityService from "../../Services/CommunityService";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import SideBar from "../SideBar/index";
import { IMAGE_BASE_URL } from "../../Config";
import { getRoleAndPermissionListByID } from "../../ReduxStore/Actions/roleAndPermissionAction";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const state = {
  responsive: {
    0: {
      items: 1,
    },
    450: {
      items: 2,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 4,
    },
  },
};

const initialValues = {
  coverImage: "",
  groupName: "",
  groupType: "",
  description: "",
  isPublic: false,
  isPrivate: false,
  siteID: "",
};

const AdminGouup = () => {
  // let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  // const userName = localStorage.getItem("userName");
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  // const adminGroups = useSelector((state) => state.createGroupReducer);
  const permission = useSelector(
    (state) => state.roleAndPermision.data.payload
  );

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  function openModal() {
    setIsOpen(true);
    setValues([]);
    setEditCoverImage("");
    setActivebor(true);
    setActivebor2(false);
    setModelStatus(false);
    setCoverImage("");
    setSelectedImage(null);
  }

  function closeModal() {
    setIsOpen(false);
    setValues([]);
    setEditCoverImage("");
    setActivebor(true);
    setActivebor2(false);
    setModelStatus(false);
    setCoverImage("");
    setSelectedImage(null);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  const [Leftside, setLeftside] = useState(true);

  function Data() {
    setLeftside(!Leftside);
  }

  const [selectedImage, setSelectedImage] = useState(null);
  const [Activebor, setActivebor] = useState(false);
  const [Activebor2, setActivebor2] = useState(true);

  //---------------------- Start Create Group Section ------------------------------//
  const [values, setValues] = useState(initialValues);
  const [coverImage, setCoverImage] = useState("");
  const [editCoverImage, setEditCoverImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [groupID, setGroupID] = useState("");
  const [userCommunity, setUserCommunity] = useState([]);
  const [iSPrivate, setIsPrivate] = useState(true);
  const [iSPublic, setIsPublic] = useState(false);
  const [modelStatus, setModelStatus] = useState(false);
  const [userGroup, setUserGroup] = useState([]);
  const [renderComp, setRenderComp] = useState(0);
  const userID = localStorage.getItem("userID");
  let roleID = localStorage.getItem("roleID");

  function Activeborder(obj) {
    setActivebor(!Activebor);
    setActivebor2(!Activebor2);
    setIsPrivate(obj.isPrivateVal);
    setIsPublic(obj.isPublicVal);
  }

  function Activeborder2(obj) {
    setActivebor2(!Activebor2);
    setActivebor(!Activebor);
    setIsPrivate(obj.isPrivateVal);
    setIsPublic(obj.isPublicVal);
  }

  const changeHandlerImage = (event) => {
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      localStorage.setItem("image", e.target.result);
      setEditCoverImage(null);
      setSelectedImage(event.target.files[0]);
      setCoverImage(event.target.files[0]);
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };
  const UpdateGroupDetails = (e) => {
    const data = {
      GroupID: groupID,
      UserID: userID,
      CommunityID: values.siteID,
      GroupName: values.groupName,
      GroupType: values.groupType,
      Description: values.description,
      CoverImage: coverImage ? coverImage : editCoverImage,
      IsPrivate: iSPrivate,
      IsPublic: iSPublic,
    };
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    GroupService.updateGroup(data, config)
      .then((response) => {
        if (response.data.status === "SUCCESS") {
          setIsOpen(false);
          setValues([]);
          setCoverImage("");
          getCommunityGroupsWithCommunityDetails();
          setEditCoverImage("");
          setRenderComp(renderComp + 1);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const GroupFormValidation = async (e) => {
    e.preventDefault();
    if (!values.siteID || values.siteID === "default") {
      setErrorMessage("Please select any one community.");
    } else if (!values.groupName || values.groupName.trim() === "") {
      setErrorMessage("Please enter group name.");
    } else {
      setErrorMessage();
      const res = await GroupService.getGroupByGroupID(groupID);

      if (res.data.statusCode === 404) {
        AddGroupDetails();
      } else {
        UpdateGroupDetails();
      }
      setGroupID("");
    }
  };

  useEffect(() => {
    getUserCommunityByUserID();
  }, [userCommunity?.communityId, renderComp]);

  const getUserCommunityByUserID = async () => {
    const res = await CommunityService.getUserCommunityByUserID(userID);

    setUserCommunity(res.data);
    // setCommunityCount(res.data.length);
    setIsLoading(false); // Hide loading screen
  };

  const getCommunityGroupsWithCommunityDetails = async () => {
    setIsLoaded(true);

    const res = await GroupService.getCommunityGroupsWithCommunityDetails(
      userID
    );
    setUserGroup(res.data);
    setIsLoaded(false);
  };
  useEffect(() => {
    getCommunityGroupsWithCommunityDetails();
  }, [renderComp]);

  const AddGroupDetails = (e) => {
    const data = {
      UserID: userID,
      CommunityID: values.siteID,
      GroupName: values.groupName,
      GroupType: values.groupType,
      Description: values.description,
      CoverImage: coverImage,
      IsPrivate: iSPrivate,
      IsPublic: iSPublic,
    };
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    GroupService.createGroup(data, config)
      .then((response) => {
        if (response.data.status === "SUCCESS") {
          setIsOpen(false);
          setValues([]);
          setCoverImage("");
          setEditCoverImage("");
          setModelStatus(false);
          getCommunityGroupsWithCommunityDetails();
          setRenderComp(renderComp + 1);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  let EditGroup = async (groupId) => {
    const res = await GroupService.getGroupByGroupID(groupId);

    const initialValues = {
      coverImage: res.data.coverImage,
      groupName: res.data.groupName,
      groupType: res.data.groupType,
      description: res.data.description,
      isPublic: res.data.isPublic,
      isPrivate: res.data.isPrivate,
      siteID: res.data.communityID,
    };
    // setDisabledCommunity(true);
    setValues(initialValues);
    setGroupID(groupId);
    setEditCoverImage(initialValues.coverImage);
    setActivebor(!initialValues.isPublic);
    setActivebor2(!initialValues.isPrivate);
    setModelStatus(false);
    setIsPrivate(initialValues.isPrivate);
    setIsPublic(initialValues.isPublic);
    setIsOpen(true);
  };

  let DeleteGroupModal = (groupID) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            GroupService.deleteGroup(groupID)
              .then((response) => {
                if (response.data.status === "SUCCESS") {
                  NotificationManager.success("Group join successfully!");
                  getCommunityGroupsWithCommunityDetails();
                  setRenderComp(renderComp + 1);
                }
              })
              .catch((e) => {
                console.log(e);
              });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  let ViewGroupModal = async (groupID, status) => {
    const res = await GroupService.getGroupByGroupID(groupID);
    const initialValues = {
      coverImage: res.data.coverImage,
      groupName: res.data.groupName,
      groupType: res.data.groupType,
      description: res.data.description,
      isPublic: res.data.isPublic,
      isPrivate: res.data.isPrivate,
      siteID: res.data.communityID,
    };
    setValues(initialValues);
    setEditCoverImage(initialValues.coverImage);
    setActivebor(!initialValues.isPublic);
    setActivebor2(!initialValues.isPrivate);
    setIsOpen(true);

    setModelStatus(status);
  };

  const joinGroup = async (communityID, groupID) => {
    const data = {
      GroupID: groupID,
      siteID: communityID,
      whoInvited: userID,
      status: "Joined",
    };

    const res = await GroupService.UpdateInvitationHistoryStatus(data);

    if (res.data.statusCode === 200) {
      NotificationManager.success("Group join successfully!");

      setTimeout(() => {
        navigate("/admin-group-detail?groupID=" + groupID);
      }, [1000]);
    }
  };

  useEffect(() => {
    dispatch(getRoleAndPermissionListByID(userID, roleID));
  }, []);

  return (
    <div>
      <AdminHeader Sidebar={Data} />
      <main className="">
        <div className="main-outer-container">
          <div className="dashboard-outer-container">
            <div className="inner-container-template m-0">
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                style={customStyles}
                contentLabel="Example Modal"
                backdrop="static"
              >
                <div className="moda-dialogue-custom">
                  <div className="modal-header">
                    <h5 className="mb-0"> Create Group</h5>
                    <button className="modal-close-btn" onClick={closeModal}>
                      <i className="fa fa-times" aria-hidden="true"></i>
                    </button>
                  </div>

                  <form>
                    <div className="modal-body-create-grp  ">
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
                                      src={`${IMAGE_BASE_URL + editCoverImage}`}
                                    />
                                    <br />
                                  </div>
                                ) : selectedImage != null ? (
                                  <div className="">
                                    <img
                                      alt="not fount"
                                      width={"100%"}
                                      src={URL.createObjectURL(selectedImage)}
                                    />
                                    <br />
                                  </div>
                                ) : (
                                  ""
                                )
                              }

                              <input
                                disabled={modelStatus}
                                type="file"
                                name="myImage"
                                onChange={(event) => {
                                  changeHandlerImage(event);
                                }}
                              />
                            </label>
                          </div>
                        </div>

                        <div className="modal-create-group-name">
                          <div className="form-group mb-3">
                            <div className="row">
                              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="cstm-field-dropdown mb-3">
                                  <label className="form-label">
                                    Community
                                  </label>
                                  <div className="select text-left">
                                    <select
                                      className="select"
                                      disabled={modelStatus}
                                      name="siteID"
                                      value={values.siteID}
                                      onChange={handleInputChange}
                                    >
                                      <option value="default">
                                        Select Community
                                      </option>
                                      {userCommunity &&
                                      userCommunity.length > 0 ? (
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
                                              No Notification{" "}
                                            </h1>
                                          )}
                                        </>
                                      )}
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                <div className="form-group mb-3">
                                  <label className="form-label">
                                    Group Name
                                  </label>
                                  <input
                                    disabled={modelStatus}
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Group Name"
                                    name="groupName"
                                    value={
                                      values.groupName ? values.groupName : ""
                                    }
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                <div className="form-group mb-3">
                                  <label className="form-label">
                                    Description
                                  </label>
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
                            </div>
                          </div>
                          <span style={{ color: "red" }}>{errorMessage}</span>
                        </div>

                        <div className="modal-create-group-privacy">
                          <h5>Privacy</h5>
                          <p>Who can view this group's content?</p>

                          <div
                            onClick={
                              !modelStatus
                                ? () => {
                                    Activeborder({
                                      isPrivateVal: false,
                                      isPublicVal: true,
                                    });
                                  }
                                : ""
                            }
                            className={
                              Activebor
                                ? "privacy-card-outer"
                                : "privacy-card-outer active"
                            }
                            data={{ isPrivateVal: false, isPublicVal: true }}
                          >
                            <div className="privacy-card-public">
                              <div className="Privacy-icon">
                                <i
                                  className="fa fa-users"
                                  aria-hidden="true"
                                ></i>
                              </div>
                              <div className="pricy-icon-content">
                                <h5>Public</h5>
                                <p>
                                  Anyone can view this group's content and join
                                </p>
                              </div>
                            </div>
                          </div>

                          <div
                            onClick={
                              !modelStatus
                                ? () => {
                                    Activeborder2({
                                      isPrivateVal: true,
                                      isPublicVal: false,
                                    });
                                  }
                                : ""
                            }
                            className={
                              Activebor2
                                ? "privacy-card-outer"
                                : "privacy-card-outer active"
                            }
                          >
                            <div className="privacy-card-public">
                              <div className="Privacy-icon">
                                <i
                                  className="fa fa-lock"
                                  aria-hidden="true"
                                ></i>
                              </div>
                              <div className="pricy-icon-content">
                                <h5>Private</h5>
                                <p>
                                  Only members can view this group's content
                                </p>
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
                </div>
              </Modal>
              <div
                className={
                  Leftside
                    ? "dashboard-container "
                    : "dashboard-container active"
                }
              >
                <SideBar />

                <div className="right-sidebar">
                  <div className="inner-content-height">
                    <div className="admin-group-page">
                      <div className="adm-group-heading">
                        <h3>
                          {roleID != 1 && (
                            <Link to="/admin-tools">
                              <i
                                className="fa fa-long-arrow-left me-2"
                                aria-hidden="true"
                              ></i>
                            </Link>
                          )}
                          Groups
                        </h3>
                        <div className="button-UI">
                          {roleID == 5 ? (
                            ""
                          ) : (
                            <>
                              {permission &&
                                permission.length > 0 &&
                                permission.filter(
                                  (e) => e.permissionName === "Create Group"
                                ).length > 0 && (
                                  <Link
                                    to="#"
                                    onClick={openModal}
                                    className="btn tmplt-btn button-outline me-2"
                                  >
                                    <i
                                      className="fa fa-plus"
                                      aria-hidden="true"
                                    ></i>
                                    Create
                                  </Link>
                                )}
                             
                              <Link
                                to="/group-setting"
                                className="btn tmplt-btn Btn-fill"
                              >
                                Setting
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                      {userGroup !== [] && userGroup.length > 0 ? (
                        userGroup.map((option) => (
                          <div className="group-main-container">
                            <div className="adm-group-slider" key={option}>
                              <div className="adm-group-slider-heading">
                                <h3>{option.communityName}</h3>
                                {roleID == 5 ? (
                                  ""
                                ) : (
                                  <Link
                                    to={`/view-all-groups?SiteID=${option.communityID}`}
                                  >
                                    View All
                                  </Link>
                                )}
                              </div>

                              <div className="carousel-container carousel-container2">
                                <OwlCarousel
                                  className="owl-theme"
                                  margin={15}
                                  autoplay={true}
                                  responsive={state.responsive}
                                >
                                  {option.groupList.length > 0
                                    ? option.groupList.map((userOption) => (
                                        <div className={"item "}>
                                          <img
                                            key={userOption}
                                            src={
                                              userOption.coverImage
                                                ? `${
                                                    IMAGE_BASE_URL +
                                                    userOption.coverImage
                                                  }`
                                                : process.env.PUBLIC_URL +
                                                  "/Images/Untitled.png"
                                            }
                                            alt=""
                                          />
                                          {userOption.joinedStatus ===
                                          "Active" ? (
                                            <div className="group-type">
                                              <p>{userOption.groupName}</p>
                                              <button
                                                className="text-decoration-none post"
                                                onClick={() =>
                                                  joinGroup(
                                                    userOption.communityID,
                                                    userOption.groupID
                                                  )
                                                }
                                              >
                                                Join
                                              </button>
                                            </div>
                                          ) : (
                                            <>
                                              <div className=" adm-group-slider-edit_view groupActionRow">
                                                {permission &&
                                                  permission.length > 0 &&
                                                  permission.filter(
                                                    (e) =>
                                                      e.permissionName ===
                                                      "Edit Group"
                                                  ).length > 0 && (
                                                    <button
                                                      type="button"
                                                      onClick={() =>
                                                        EditGroup(
                                                          userOption.groupID
                                                        )
                                                      }
                                                    >
                                                      <i className="fa fa-pencil"></i>
                                                   
                                                    </button>
                                                  )}

                                                {permission &&
                                                  permission.length > 0 &&
                                                  permission.filter(
                                                    (e) =>
                                                      e.permissionName ===
                                                      "Delete Group"
                                                  ).length > 0 && (
                                                    <button
                                                      type="button"
                                                      onClick={() =>
                                                        DeleteGroupModal(
                                                          userOption.groupID
                                                        )
                                                      }
                                                    >
                                                      <i className="fa fa-trash"></i>
                                                    </button>
                                                  )}

                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    ViewGroupModal(
                                                      userOption.groupID,
                                                      true
                                                    )
                                                  }
                                                >
                                                  <i className="fa fa-eye"></i>
                                                </button>
                                              </div>
                                              <Link
                                                to={`/admin-group-detail?groupID=${userOption.groupID}`}
                                              >
                                                <div className="group-type">
                                                  <p>{userOption.groupName}</p>
                                                </div>
                                              </Link>
                                            </>
                                          )}
                                        </div>
                                      ))
                                    : ""}
                                </OwlCarousel>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : isLoaded ? (
                        <div className="spinner-container">
                          <div className="loading-spinner"></div>
                        </div>
                      ) : (
                        <div className="spinner-container">
                          <h4> No Record Found</h4>
                        </div>
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

export default AdminGouup;
