import React, { useState, useEffect } from "react";
import { AdminHeader } from "../admin-header";
import SideBar from "../SideBar/index";
import CommunityService from "../../Services/CommunityService";
import GroupService from "../../Services/GroupService";
import AdminSendMsgToUserModal from "../Group/AdminSendMsgToUserModal";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { adminSendMsgModalAct } from "../../ReduxStore/Actions/modalActs";
import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../Config";

const MemberView = () => {
  let dispatch = useDispatch();
  let { modalReducer } = useSelector((state) => state);
  const [Leftside, setLeftside] = useState(true);
  const [userCommunity, setUserCommunity] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [userGroup, setUserGroup] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [userGroupMembers, setUserGroupMembers] = useState([]);
  const [loader, setIsLoader] = useState(false);
  const [isComLoaded, setIsComLoaded] = useState(false);
  const [isGrpLoaded, setIsGrpLoaded] = useState(false);
  const roleID = localStorage.getItem("roleID");
  function Data() {
    setLeftside(!Leftside);
  }

  const siteID = localStorage.getItem("siteID");
  const groupID = localStorage.getItem("groupID");
  const userID = localStorage.getItem("userID");

  const getUserCommunityByUserID = async () => {
     setIsComLoaded(true)
    const res = await CommunityService.getUserCommunityByUserID(userID);
    if (res.data.data !== null) {
      if (res.data) {
        setUserCommunity(res.data);
      }
    }
     setIsComLoaded(false)
  };

  const getAllGroupByCommunityID = async (selectedCommunity) => {
     setIsGrpLoaded(true)
    const res = await GroupService.getAllGroupByCommunityID(selectedCommunity);
    if (res.data.data !== null) {
      if (res.data) {
        setUserGroup(res.data);
      }
    }
    setIsGrpLoaded(false)
  };

  const GetAllGroupMembersExceptAdmin = async (selectedGroup) => {
    const res = await GroupService.GetAllGroupMembersExceptAdmin(selectedGroup);
    if (res.data.data !== null) {
      if (res.data) {
        setUserGroupMembers(res.data);
      }
    }
  };

  // const groupMemberStatusUpdate = async (groupMemberID, status) => {
  //   const res = await GroupService.groupMemberStatusUpdate(
  //     groupMemberID,
  //     status
  //   );
  //   if (res.data.statusCode == 200) {
  //     GetAllGroupMembersExceptAdmin();
  //   }
  // };

  // const deleteGroupMember = async (groupMemberID) => {
  //   const res = await GroupService.deleteGroupMember(groupMemberID);
  //   if (res.data.statusCode == 200) {
  //     GetAllGroupMembersExceptAdmin();
  //   }
  // };

  const handleCommunityOnChange = (e) => {
    // setIsLoaded(true)
    setSelectedCommunity(e.target.value);
    // selectedGroup(selectedGroup)
    setSelectedGroup(selectedGroup);
    // setUserGroupMembers(userGroupMembers);
    // setIsLoaded(false)
  };

  const handleGroupOnChange = (e) => {
    // setIsLoaded(true)
    setSelectedGroup(e.target.value);
    // setUserGroupMembers(userGroupMembers);
    // setIsLoaded(true)
  };

  const getCommunityGroupsWithCommunityDetails = async () => {
    setIsLoader(true);

    const res = await GroupService.getCommunityGroupsWithCommunityDetails(
      userID
    );
    setUserGroup(res.data);
    setIsLoader(false);
  };
  useEffect(() => {
 
    if (roleID == 4) {
      getCommunityGroupsWithCommunityDetails();
    }
  }, []);

  useEffect(() => {
    getUserCommunityByUserID(selectedCommunity);
    getAllGroupByCommunityID(selectedCommunity,selectedGroup);
    GetAllGroupMembersExceptAdmin(selectedGroup);
  }, [selectedCommunity, selectedGroup]);




  return (
    <>
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
                      <div className="admin-tools-menu ">
                        <div className="admin-tools-menu-heading ">
                          <h3>
                            {" "}
                            {roleID != 1 && (
                              <Link to="/admin-tools">
                                <i
                                  className="fa fa-long-arrow-left me-2"
                                  aria-hidden="true"
                                ></i>
                              </Link>
                            )}
                            Message Section{" "}
                          </h3>
                        </div>

                        <div className="row rolespermission-inner-box ">
                          {parseInt(localStorage.getItem("roleID")) !== 4 && (
                            <div className="col-md-6">
                              <select
                                class="form-select mb-4 w-100"
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
                              class="form-select"
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

                        <div className="row">
                          <div className="col-md-12 rolespermission-inner-box">
                            <div className="table-responsive">
                              <table class="table table-border">
                                <thead>
                                  <tr>
                                    <th> S. No. </th>
                                    <th> User Image </th>
                                    <th> First Name </th>
                                    <th> Last Name </th>
                                    <th> Email </th>
                                    <th> Phone </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {userGroupMembers &&userGroupMembers!==[]&&
                                  userGroupMembers.length > 0 ? (
                                    userGroupMembers.map((item, index) => (
                                      <>
                                        <tr key={index}>
                                          {" "}
                                          <td>{index + 1}</td>
                                          <td>
                                            <img
                                              src={
                                                item.profilePicture
                                                  ? IMAGE_BASE_URL+item.profilePicture
                                                  : process.env.PUBLIC_URL +
                                                    " /Images/guest-user.jpg "
                                              }
                                              alt="Profile Pic"
                                              width="40"
                                              height="40"
                                            />
                                          </td>
                                          <td>
                                            <span
                                              style={{ cursor: "pointer" }}
                                              onClick={() =>
                                                dispatch(
                                                  adminSendMsgModalAct({
                                                    status: false,
                                                    adminModalStatus:
                                                      !modalReducer.adminModalStatus,
                                                    groupId: item.groupID,
                                                    userId: item.groupMembersID,
                                                    adminUserId:
                                                      localStorage.getItem(
                                                        "userID"
                                                      ),
                                                    communityId:
                                                      item.communityID,
                                                    userName: item.firstName,
                                                  })
                                                )
                                              }
                                            >
                                              <b>{item.firstName}</b>
                                            </span>
                                          </td>
                                          <td>{item.lastName}</td>
                                          <td>{item.email}</td>
                                          <td>{item.phone}</td>
                                        </tr>
                                      </>
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
        <AdminSendMsgToUserModal />
      </div>

      {/* <AdminSendMsgToUserModal />   */}
    </>
  );
};
export default MemberView;
