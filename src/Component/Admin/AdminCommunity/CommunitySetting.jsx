import React, { useState, useEffect } from "react";
import SideBar from "../../../Component/SideBar/index";
import { AdminHeader } from "../../admin-header";
import CommunityService from "../../../Services/CommunityService";
import GroupService from "../../../Services/GroupService";
import { Link } from "react-router-dom";

const CommunitySetting = () => {
  const [Leftside, setLeftside] = useState(true);
  const [userCommunity, setUserCommunity] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [userGroup, setUserGroup] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [userGroupMembers, setUserGroupMembers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  function Data() {
    setLeftside(!Leftside);
  }

  const siteID = localStorage.getItem("siteID");
  const groupID = localStorage.getItem("groupID");
  const userID = localStorage.getItem("userID");
  const roleID = localStorage.getItem("roleID");

  const getUserCommunityByUserID = async () => {
    // setIsLoaded(true)
    const res = await CommunityService.getUserCommunityByUserID(userID);
    if (res.data.data !== null) {
      if (res.data.length > 0) {
        setUserCommunity(res.data);
      }
    }
    // setIsLoaded(false)
  };

  const getAllGroupByCommunityID = async () => {
    // setIsLoaded(true)
    const res = await GroupService.getAllGroupByCommunityID(selectedCommunity);
    if (res.data.data !== null) {
      if (res.data.length > 0) {
        setUserGroup(res.data);
      }
    }
    // setIsLoaded(false)
  };

  const getAllGroupMembers = async () => {
    const res = await GroupService.getAllGroupMembers(selectedGroup);
    if (res.data.data !== null) {
      if (res.data.length > 0) {
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
      getAllGroupMembers();
    }
  };

  const deleteGroupMember = async (groupMemberID) => {
    const res = await GroupService.deleteGroupMember(groupMemberID);
    if (res.data.statusCode == 200) {
      getAllGroupMembers();
    }
  };

  const handleCommunityOnChange = (e) => {
    setSelectedCommunity(e.target.value);
    selectedGroup(selectedGroup);
    setUserGroupMembers(userGroupMembers);
  };

  const handleGroupOnChange = (e) => {
    // setIsLoaded(true)
    setSelectedGroup(e.target.value);
    setUserGroupMembers(userGroupMembers);
    // setIsLoaded(true)
  };

  useEffect(() => {
    getUserCommunityByUserID();
    getAllGroupByCommunityID();
    getAllGroupMembers();
  }, [selectedCommunity, selectedGroup]);

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
                        <h3>   {roleID != 1 && <Link to="/admin-tools">

                          <i
                            className="fa fa-long-arrow-left me-2"
                            aria-hidden="true"
                          ></i>

                        </Link>}Community Setting</h3>
                      </div>

                      <div className="rolespermission-inner-box mb-4">
                        <div className="row">
                          <div className="col-md-6">
                            <select
                              className="form-select mb-4 w-100"
                              aria-label="Default select example"
                              value={selectedCommunity}
                              onChange={(e) => handleCommunityOnChange(e)}
                            >
                              <option selected>Select Community</option>
                              {isLoaded ? (
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
                                      >
                                        {data.communitySiteName}
                                      </option>
                                    ))}
                                </>
                              )}
                            </select>
                          </div>
                          <div className="col-md-6">
                            <select
                              className="form-select"
                              aria-label="Default select example"
                              value={selectedGroup}
                              onChange={(e) => handleGroupOnChange(e)}
                            >
                              <option selected>Select Group</option>
                              {isLoaded ? (
                                <option selected disabled>
                                  Loding groups....
                                </option>
                              ) : (
                                <>
                                  {userGroup &&
                                    userGroup.map((data) => (
                                      <option
                                        value={data.groupID}
                                        key={data.groupID}
                                      >
                                        {data.groupName}
                                      </option>
                                    ))}
                                </>
                              )}
                            </select>
                          </div>
                        </div>

                        <div className="table-responsive mt-5 table-custom">
                          <table className="table table-border" >
                            <thead >
                              <tr>
                                <th> S. No. </th>
                                <th> First Name </th>
                                <th> Last Name </th>
                                <th> Email</th>
                                <th> Access</th>
                                <th> Action</th>
                                {/* <th> Last Name </th> */}
                              </tr>
                            </thead>

                            <tbody>
                              {userGroupMembers && userGroupMembers.length > 0 ? (
                                userGroupMembers.map((item, index) => (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.email}</td>
                                    {/* <td>{item.phone}</td> */}

                                    <td
                                      style={{
                                        fontWeight: "bold",
                                        color: "yellowgreen",
                                      }}
                                    >
                                      {item.groupAccessStatus}
                                    </td>
                                    <td>
                                      {item.groupAccessStatus === "Pending" ? (
                                        <>
                                          <button
                                            className="btn btn-primary"
                                            style={{ marginRight: "10px" }}
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
                                            Denie
                                          </button>
                                        </>
                                      ) : (
                                        <button
                                          className="btn btn-danger ml-2"
                                          style={{ width: "30%" }}
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
                                  </tr>
                                ))
                              ) : (
                                <h6 style={{ marginLeft: "30%" }}>
                                  No Record Found
                                </h6>
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

export default CommunitySetting;
