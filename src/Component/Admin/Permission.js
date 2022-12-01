import { useState, useEffect } from "react";
import { AdminHeader } from "../admin-header";
import { Link } from "react-router-dom";
import SideBar from "../SideBar/index";
import CommunityService from "../../Services/CommunityService";
import GroupService from "../../Services/GroupService";
import RoleAndPermissionService from "../../Services/RoleAndPermissionService";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useSelector } from "react-redux";
import { SpinnerLoader } from "../loader/SpinnerLoader";

const RoleAndPermission = () => {

  const { UserID, RoleID } = useSelector(state => state.auth?.loginData)

  const [Leftside, setLeftside] = useState(true);
  const [userCommunity, setUserCommunity] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [userGroup, setUserGroup] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [userGroupMembers, setUserGroupMembers] = useState([]);
  const [selectedGroupMember, setSelectedGroupMember] = useState("");
  const [roleId, setRoleId] = useState(0);
  const [roleName, setRoleName] = useState("");
  const [GrpMLoaded, isGrpMLoaded] = useState(false);
  const [isComLoaded, setIsComLoaded] = useState(false);
  const [isComAdminLoaded, setIsComAdminLoaded] = useState(false);
  const [isGrpLoaded, setIsGrpLoaded] = useState(false);
  const [isGrpAdminLoaded, setIsGrpAdminLoaded] = useState(false);
  const [roleAndPermissionList, setRoleAndPermissionList] = useState([]);
  const [checkAnyUserPermi, setCheckAnyUserPermi] = useState([]);
  const [permissionIDList, setPermissionIDList] = useState([]);
  // const [permissionAllIds, setpermissionAllIds] = useState([]);
  const [communityAdminList, setCommunityAdminList] = useState([]);
  const [selectedCommunityAdmin, setSelectedCommunityAdmin] = useState({});
  const [groupAdminList, setGroupAdminList] = useState([]);
  const [selectedGroupAdmin, setSelectedGroupAdmin] = useState({});
  const [renderComp, setRenderComp] = useState(0);
  const [permissionloader, setPermissionloader] = useState(false);

  // const [list, setlist] = useState([]);

  function Data() {
    setLeftside(!Leftside);
  }


  //Get Community List
  const getUserCommunityByUserID = async () => {
    setIsComLoaded(true);
    const res = await CommunityService.getUserCommunityByUserID(UserID);
    if (res.data.data !== null) {
      if (res.data) {
        setUserCommunity(res.data);
      }
    } else {
      setUserCommunity([]);
      setCommunityAdminList([]);
      setUserGroup([]);
      setGroupAdminList([]);
      setUserGroupMembers([]);
    }
    setIsComLoaded(false);
  };

  //Get Community Admin List
  const GetCommunityAdminList = async () => {
    setIsComAdminLoaded(true);
    const res = await CommunityService.GetCommunityAdminList(selectedCommunity);
    if (res.data) {
      setCommunityAdminList(res.data);
    } else {
      setCommunityAdminList([]);
      setUserGroup([]);
      setGroupAdminList([]);
      setUserGroupMembers([]);
    }
    setIsComAdminLoaded(false);
  };

  //Get group List
  const getAllGroupByCommunityID = async () => {
    setIsGrpLoaded(true);
    const res = await GroupService.getAllGroupByCommunityID(selectedCommunity);
    if (res.data.data !== null) {
      if (res.data) {
        setUserGroup(res.data);
      }
    } else {
      setUserGroup([]);
      setGroupAdminList([]);
      setUserGroupMembers([]);
    }
    setIsGrpLoaded(false);
  };

  //Get group Admin List
  const GetAllGroupAdminList = async () => {
    setIsGrpAdminLoaded(true);
    const res = await GroupService.GetAllGroupAdminList(selectedGroupId);
    if (Number(res.data?.statusCode) !== Number(404)) {
      setGroupAdminList(res.data);
    } else {
      setGroupAdminList([]);
      setUserGroupMembers([]);
    }
    setIsGrpAdminLoaded(false);
  };

  // Get all group member
  const GetAllGroupMembersExceptAdmin = async () => {
    isGrpMLoaded(true);
    const res = await GroupService.GetAllGroupMembersExceptAdmin(selectedGroupId);
    if (res.data.data !== null) {
      if (res.data) {
        setUserGroupMembers(res.data);
      }
    } else {
      setUserGroupMembers([])
    }
    isGrpMLoaded(false);
  };

  //Get  Role by selected ID
  const getRoleByUserID = async () => {
    const res = await RoleAndPermissionService.getRoleByUserID(selectedGroupMember);
    if (res.data.data !== null) {
      setRoleId(res.data._id);
      setRoleName(res.data.roleName);
    } else {
      setRoleId(0);
      setRoleName("");
    }

  };

  //Get prmission List according to selected option
  const getAllPermissionByUserAndRole = async () => {
    setPermissionloader(true);
    const UserID = selectedGroupMember;
    const res = await RoleAndPermissionService.getAllPermissionByUserAndRole(UserID, roleId);
    if (res.data) {
      let getUserAlreadyPermi = res.data.filter((value) => {
        if (value.ispermission) {
          return value;
        }
      });
      setPermissionIDList(getUserAlreadyPermi);
      setRoleAndPermissionList(() => res.data);
      checkUserPermission(res.data);
    } else {
      setRoleAndPermissionList([]);
    }
    setPermissionloader(false);
  };

  //Handle Community List
  const handleCommunityOnChange = (e) => {
    setSelectedCommunity(e.target.value);
    setSelectedGroupId("");
    setSelectedCommunityAdmin(null);
    setUserGroupMembers([]);
    setSelectedGroupAdmin(null);
    setRoleAndPermissionList([]);
    setRoleName("");
  };

  // Hanlde Community Admin List
  const handleCommunityAdminOnChange = (e) => {
    setSelectedGroupMember(e.target.value);
    setSelectedCommunityAdmin(e.target.value);
    // setRoleAndPermissionList([]);
    setSelectedGroupAdmin("");
    setRoleName("");
  };

  // Hanlde group List
  const handleGroupOnChange = (e) => {
    setSelectedGroupId(e.target.value);
    setUserGroupMembers([]);
    setRoleAndPermissionList([]);
    setRoleName("");
  };

  // Hanlde Group Admin List
  const handleGroupAdminOnChange = (e) => {
    setSelectedGroupMember(e.target.value);
    setSelectedGroupAdmin(e.target.value);
    // setRoleAndPermissionList([]);

    setSelectedCommunityAdmin("");
    setRoleName("");

  };

  // Handle group member list
  const handleGroupMemberOnChange = (e) => {
    setSelectedGroupMember(e.target.value);
    // setRoleAndPermissionList([]);

    setSelectedCommunityAdmin("");
    setSelectedGroupAdmin("");
    setRoleName("");
  };

  //User check checkbox then get checkbox data
  const GetPermissionID = (obj) => {
    console.log("obj", obj)
    const index = roleAndPermissionList?.findIndex((elem) => elem?._id === obj?._id)
    console.log(index);
    console.log(roleAndPermissionList);
    if (index > -1) {
      let newArr = [...roleAndPermissionList];
    
      setRoleAndPermissionList(() => roleAndPermissionList[index].ispermission = obj.ispermission);
      console.log(roleAndPermissionList[index].ispermission = obj.ispermission);

    }
    console.log(roleAndPermissionList);
  };

  let getAllpermisionIds = (permiIDList) => {
    let permiIds = permiIDList.map((value) => {
      return value._id;
    });
    return permiIds;
  };

  let checkUserPermission = (permiIDList) => {
    let permiIds = permiIDList.filter((value) => {
      if (value.ispermission) {
        return value._id;
      }
    });
    setCheckAnyUserPermi(permiIds);
  };

  /**
   * Assing permission api call
   */
  const AssignUserPermission = async () => {
    let getUserGivernPermi = roleAndPermissionList?.filter((value) => value?.ispermission);
    try {
      let permisionIdsList = await getAllpermisionIds(getUserGivernPermi);
      const data = {
        UserID: selectedGroupMember,
        adminID: UserID,
        RoleID: roleId,
        permisionIdList: permisionIdsList,
        createdDate: new Date(),
        createdBy: UserID,
      };

      let response = await RoleAndPermissionService.assignUserPermission(data);

      if (response.data.status === "SUCCESS") {
        NotificationManager.success(
          "Success message",
          "Permission assign successfully."
        );
        setRenderComp(renderComp + 1);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCommunityGroupsWithCommunityDetails = async () => {
    isGrpMLoaded(true);

    const res = await GroupService.getCommunityGroupsWithCommunityDetails(UserID);
    setUserGroup(res.data);
    isGrpMLoaded(false);
  };

  useEffect(() => {
    // GetAllGroupMembersExceptAdmin();
    if (Number(RoleID) === Number(4)) {
      getCommunityGroupsWithCommunityDetails();
    }
  }, []);

  useEffect(() => {
    getUserCommunityByUserID();
  }, [])

  useEffect(() => {
    if (selectedCommunity !== "" && selectedCommunity !== "Select Community" && selectedCommunity) {
      getAllGroupByCommunityID();
      GetCommunityAdminList();
    } else {
      setSelectedCommunityAdmin("");
      setSelectedGroupId("");
      setSelectedGroupAdmin("");
      setSelectedGroupMember("");

      setCommunityAdminList([]);
      setUserGroup([]);
      setGroupAdminList([]);
      setUserGroupMembers([]);
    }
  }, [selectedCommunity])

  useEffect(() => {
    if (selectedGroupId && selectedGroupId !== "") {
      GetAllGroupMembersExceptAdmin();
      GetAllGroupAdminList();
    }
  }, [selectedGroupId]);

  useEffect(() => {
    if (selectedGroupMember &&
      selectedGroupMember !== "" &&
      selectedGroupMember !== "Select Group Admin" &&
      selectedGroupMember !== "Select User" &&
      selectedGroupMember !== "Select Community Admin" &&
      selectedCommunity !== "Select Community"
    ) {
      getRoleByUserID();
      if (roleId !== 0) {
        getAllPermissionByUserAndRole();
      }
    }
  }, [selectedGroupMember, roleId, roleName]);

  return (
    <>
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
                      <div className="admin-tools-menu-heading">
                        <h3>
                          {Number(RoleID) !== Number(1) && (
                            <Link to="/admin-tools">
                              <i
                                className="fa fa-long-arrow-left me-2"
                                aria-hidden="true"
                              ></i>
                            </Link>
                          )}
                          Permission
                        </h3>
                      </div>
                      <div className="rolespermission-inner-box mb-4">
                        <div className="row">
                          {parseInt(RoleID) !== 4 &&
                            parseInt(RoleID) !== 5 && (
                              <>
                                <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
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
                                    ) : (userCommunity?.length < 1 ? (
                                      <option selected disabled>
                                        No data Found
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
                                    )
                                    )}
                                  </select>
                                </div>
                                <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                                  <select
                                    className="form-select mb-4 w-100"
                                    aria-label="Default select example"
                                    value={selectedCommunityAdmin}
                                    onChange={(e) =>
                                      handleCommunityAdminOnChange(e)
                                    }
                                  >
                                    <option selected>
                                      Select Community Admin
                                    </option>
                                    {isComAdminLoaded ? (
                                      <option selected disabled>
                                        Loding Community Admin....
                                      </option>
                                    ) : (communityAdminList?.length < 1 ? (
                                      <option selected disabled>
                                        No data Found
                                      </option>
                                    ) : (
                                      <>
                                        {communityAdminList &&
                                          communityAdminList.length > 0 &&
                                          communityAdminList.map((data) => (
                                            <option
                                              key={data.communityAdminID}
                                              value={data.communityAdminID}
                                            >
                                              {`${data.firstName}  ${data.lastName}`}
                                            </option>
                                          ))}
                                      </>
                                    )
                                    )}
                                  </select>
                                </div>
                              </>
                            )}
                          <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                            <select
                              className="form-select mb-4"
                              aria-label="Default select example"
                              value={selectedGroupId}
                              onChange={(e) => handleGroupOnChange(e)}
                            >
                              <option selected>Select Group</option>
                              {isGrpLoaded ? (
                                <option selected disabled>
                                  Loding groups....
                                </option>
                              ) : (userGroup?.length < 1 ? (
                                <option selected disabled>
                                  Groups not available
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
                              )
                              )}
                            </select>
                          </div>
                          <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                            <select
                              className="form-select mb-4 w-100"
                              aria-label="Default select example"
                              value={selectedGroupAdmin}
                              onChange={(e) => handleGroupAdminOnChange(e)}
                            >
                              <option selected>Select Group Admin</option>
                              {isGrpAdminLoaded ? (
                                <option selected disabled>
                                  Loding Group Admin ....
                                </option>
                              ) : (groupAdminList?.length < 1 ? (
                                <option selected disabled>
                                  No data Found
                                </option>
                              ) : (
                                <>
                                  {groupAdminList &&
                                    groupAdminList.length > 0 &&
                                    groupAdminList.map((data) => (
                                      <option
                                        key={data.groupMembersID}
                                        value={data.groupMembersID}
                                      >
                                        {`${data.firstName}  ${data.lastName}`}
                                      </option>
                                    ))}
                                </>
                              )
                              )}
                            </select>
                          </div>
                          <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                            <select
                              className="form-select mb-4"
                              aria-label="Default select example"
                              value={selectedGroupMember}
                              onChange={(e) => handleGroupMemberOnChange(e)}
                            >
                              <option selected>Select User</option>
                              {GrpMLoaded ? (
                                <option selected disabled>
                                  Loding group members....
                                </option>
                              ) : (userGroupMembers?.length < 1 ? (
                                <option selected disabled>
                                  No data Found
                                </option>
                              ) : (
                                <>
                                  {userGroupMembers &&
                                    userGroupMembers.length > 0 &&
                                    userGroupMembers.map((data) => (
                                      <option
                                        key={data.groupMembersID}
                                        value={data.groupMembersID}
                                      >
                                        {data.firstName}
                                      </option>
                                    ))}
                                </>
                              )
                              )}
                            </select>
                          </div>
                          <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12">
                            <input
                              disabled
                              type="text"
                              className="form-control cstm-field"
                              placeholder="Enter Role"
                              name="role"
                              value={roleName}
                            ></input>
                          </div>
                        </div>
                        <div className="margin-top">
                          <h5>Permissions of {roleName}</h5>
                        </div>
                        <div>
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>Permission</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {roleAndPermissionList &&
                                roleAndPermissionList !== [] ? (
                                roleAndPermissionList.map((data, index) => (
                                  <tr key={index}>
                                    <td>{data.permission}</td>
                                    <td>
                                      <input
                                        type="checkbox"
                                        onChange={(e) =>
                                          GetPermissionID({
                                            _id: data._id,
                                            ispermission: e.target.checked,
                                          })
                                        }
                                        value={data.permission}
                                        checked={data.ispermission}
                                      />
                                      {console.log(
                                        data.ispermission
                                      )}
                                    </td>
                                  </tr>
                                ))
                              ) : permissionloader ? (
                                <SpinnerLoader />
                              ) : (
                                <div className="spinner-container">
                                  <h4> No Record Found</h4>
                                </div>
                              )}  </tbody>
                          </table>
                        </div>
                        {checkAnyUserPermi.length > 0 ? (
                          <div className="save">
                            <button
                              disabled={checkAnyUserPermi.length > 0 ? false : true}
                              className=" btn next-button"
                              onClick={AssignUserPermission}
                            >
                              Update
                            </button>
                          </div>
                        ) : (
                          // permissionIDList.length > 0 && (
                          <div className="save">
                            <button
                              disabled={permissionIDList.length > 0 ? false : true}
                              className=" btn next-button"
                              onClick={AssignUserPermission}
                            >
                              Save
                            </button>
                          </div>
                          // )
                        )}
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
      <NotificationContainer />
    </>
  );
};
export default RoleAndPermission;
