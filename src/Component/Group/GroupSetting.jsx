import React, { useState, useEffect } from "react";
import SideBar from "../SideBar";
import { AdminHeader } from "../admin-header";
import CommunityService from "../../Services/CommunityService";
import GroupService from "../../Services/GroupService";
import { Link } from "react-router-dom";
import { getRoleAndPermissionListByID } from "../../ReduxStore/Actions/roleAndPermissionAction";
import { useDispatch, useSelector } from "react-redux";

const GroupSetting = () => {
  const [Leftside, setLeftside] = useState(true);
  const [userCommunity, setUserCommunity] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [userGroup, setUserGroup] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [userGroupMembers, setUserGroupMembers] = useState([]);
  const [isComLoaded, setIsComLoaded] = useState(false);
  const [isGrpLoaded, setIsGrpLoaded] = useState(false);
  const [loader, setLoader] = useState(false);
 
  function Data() {
    setLeftside(!Leftside);
  }
  const dispatch = useDispatch();
  const siteID = localStorage.getItem("siteID");
  const groupID = localStorage.getItem("groupID");
  const userID = localStorage.getItem("userID");
  const roleID = localStorage.getItem("roleID");
  const permission = useSelector(
    (state) => state.roleAndPermision.data.payload
  );
  const getUserCommunityByUserID = async () => {
    setIsComLoaded(true);
    const res = await CommunityService.getUserCommunityByUserID(userID);
    if (res.data.data !== null) {
      if (res.data.length > 0) {
        setUserCommunity(res.data);
      }
    }
    setIsComLoaded(false);
  };

  const getAllGroupByCommunityID = async () => {
    setIsGrpLoaded(true);
    const res = await GroupService.getAllGroupByCommunityID(selectedCommunity);
    if (res.data.data !== null) {
      if (res.data.length > 0) {
        setUserGroup(res.data);
      }
    }
    setIsGrpLoaded(false);
  };

  // const getAllGroupMembers = async () => {
  //   const res = await GroupService.getAllGroupMembers(selectedGroup);
  //   if (res.data.data !== null) {
  //     if (res.data.length > 0) {
  //       setUserGroupMembers(res.data);
  //     }
  //   }
  // };
  const GetAllGroupMembersExceptAdmin = async () => {
    const res = await GroupService.GetAllGroupMembersExceptAdmin(selectedGroup);
    if (res.data.data !== null) {
      if (res.data) {
        setUserGroupMembers(res.data);
      }
    }
  };

  const groupMemberStatusUpdate = async (groupMemberID, status) => {
    const res = await GroupService.groupMemberStatusUpdate(
      groupMemberID,
      status
    );
    if (res.data.statusCode == 200) {
      // getAllGroupMembers();
      GetAllGroupMembersExceptAdmin();
    }
  };

  const deleteGroupMember = async (groupMemberID) => {
    const res = await GroupService.deleteGroupMember(groupMemberID);
    if (res.data.statusCode == 200) {
      // getAllGroupMembers();
      GetAllGroupMembersExceptAdmin();
    }
  };

  const handleCommunityOnChange = (e) => {
    setSelectedCommunity(e.target.value);
    selectedGroup(selectedGroup);
    setUserGroupMembers(userGroupMembers);
  };

  const handleGroupOnChange = (e) => {
    // setLoader(true)
    setSelectedGroup(e.target.value);
    setUserGroupMembers(userGroupMembers);
    // setLoader(true)
  };
  const getCommunityGroupsWithCommunityDetails = async () => {
    setLoader(true);

    const res = await GroupService.getCommunityGroupsWithCommunityDetails(
      userID
    );
    setUserGroup(res.data);
    setLoader(false);
  };
  useEffect(() => {
    if (roleID == 4) {
      getCommunityGroupsWithCommunityDetails();
    }
  }, []);

  useEffect(() => {
    getUserCommunityByUserID();
    getAllGroupByCommunityID();
    GetAllGroupMembersExceptAdmin();
  }, [selectedCommunity, selectedGroup]);

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
                    <div className="admin-tools-menu">
                      <div className="admin-tools-menu-heading">
                        <h3>
                          {roleID != 1 && (
                            <Link to="/admin-tools">
                              <i
                                className="fa fa-long-arrow-left me-2"
                                aria-hidden="true"
                              ></i>
                            </Link>
                          )}
                          Group Setting
                        </h3>
                      </div>

                      <div className="rolespermission-inner-box mb-4">
                        <div className="row">
                          {parseInt(localStorage.getItem("roleID")) !== 4 &&
                            parseInt(localStorage.getItem("roleID")) !== 5 && (
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
                                      {userCommunity &&
                                        userCommunity.length > 0 &&
                                        userCommunity.map((data) => (
                                          <option
                                            key={data.communityId}
                                            value={data.communityId}
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
                              className="form-select mb-4"
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
                                      // <option
                                      //   value={data.groupID}
                                      //   key={data.groupID}
                                      // >
                                      //   {data.groupName}
                                      // </option>
                                      data.groupList ? (
                                        data.groupList.map((item) => (
                                          <option
                                            key={item.groupID}
                                            value={item.groupID}
                                          >
                                            {item.groupName}
                                          </option>
                                        ))
                                      ) : (
                                        <option
                                          key={data.groupID}
                                          value={data.groupID}
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

                        <div className="table-responsive">
                          <table className="table table-border">
                            <thead>
                              <tr>
                                <th> S. No. </th>
                                <th> First Name </th>
                                <th> Last Name </th>
                                <th> Email</th>
                                <th> Access</th>
                                {permission &&
                                permission.length > 0 &&
                                permission.filter(
                                  (e) => e.permissionName === "Remove Member"
                                ).length > 0 &&
                                permission.filter(
                                  (e) => e.permissionName === "Remove Member"
                                ).length > 0 ? (
                                  <th> Action</th>
                                ) : (
                                  ""
                                )}
                              
                              </tr>
                            </thead>

                            <tbody>
                              {userGroupMembers &&
                              userGroupMembers.length > 0 ? (
                                userGroupMembers.map((item, index) => (
                                  <tr>
                                    {" "}
                                    <td>{index + 1}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.email}</td>
                                    <td
                                      style={{
                                        fontWeight: "bold",
                                        color: "yellowgreen",
                                      }}
                                    >
                                      {item.groupAccessStatus}
                                    </td>
                                    {permission &&
                                    permission.length > 0 &&
                                    permission.filter(
                                      (e) =>
                                        e.permissionName === "Remove Member"
                                    ).length > 0 &&
                                    permission.filter(
                                      (e) =>
                                        e.permissionName === "Remove Member"
                                    ).length > 0 ? (
                                      <td>
                                        {item.groupAccessStatus === "Pending"
                                          ? permission &&
                                            permission.length > 0 &&
                                            permission.filter(
                                              (e) =>
                                                e.permissionName ===
                                                "Approve/Deny memebr request"
                                            ).length > 0 && (
                                              <>
                                                <button
                                                  className="btn btn-primary"
                                                  style={{
                                                    marginRight: "10px",
                                                  }}
                                                  onClick={() =>
                                                    groupMemberStatusUpdate(
                                                      item.groupMembersID,
                                                      "Approved"
                                                    )
                                                  }
                                                >
                                                  Approved
                                                </button>
                                                <button
                                                  className="btn btn-danger ml-2"
                                                  onClick={() =>
                                                    groupMemberStatusUpdate(
                                                      item.groupMembersID,
                                                      "Denie"
                                                    )
                                                  }
                                                >
                                                  Deny
                                                </button>
                                              </>
                                            )
                                          : permission &&
                                            permission.length > 0 &&
                                            permission.filter(
                                              (e) =>
                                                e.permissionName ===
                                                "Remove Member"
                                            ).length > 0 && (
                                              <button
                                                className="btn btn-danger ml-2"
                                                onClick={() =>
                                                  deleteGroupMember(
                                                    item.groupMembersID
                                                  )
                                                }
                                              >
                                                Remove
                                              </button>
                                            )}
                                      </td>
                                    ) : (
                                      ""
                                    )}
                                  </tr>
                                ))
                              ) : loader ? (
                                <tr>
                                  <td colSpan="6">
                                    <div className="spinner-container">
                                      <div className="loading-spinner"></div>
                                    </div>
                                  </td>
                                </tr>
                              ) : (
                                <tr>
                                  <td colSpan="6">
                                    <h6 className="text-center w-100">
                                      No Record Found
                                    </h6>
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tmplt-footer mb-0">
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
    </div>
  );
};

export default GroupSetting;
