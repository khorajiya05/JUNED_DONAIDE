import React, { useEffect, useState } from "react";
import { AdminHeader } from "../admin-header";
import { Link } from "react-router-dom";
import SideBar from "../SideBar/index";
import RoleAndPermissionService from "../../Services/RoleAndPermissionService";
import UserServices from "../../Services/UserServices";
import { IMAGE_BASE_URL } from "../../Config";
const Role = () => {
  const [Leftside, setLeftside] = useState(true);
  const [allRole, setAllRole] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  function Data() {
    setLeftside(!Leftside);
  }
  const roleID = localStorage.getItem("roleID");
  const userID = localStorage.getItem("userID");
  let getAllRole = async () => {
    const res = await RoleAndPermissionService.getAllRole();
    if(res.data){
      setAllRole(res.data);
  }
  };
  const GetUserPermissionById = async () => {
    const res = await UserServices.GetUserPermissionById(userID, roleID);
    if (res.data !== null) {
      setAllUsers(res.data);
    }
  };
  const changeUserRole = async (id, e) => {
    const roleID = e.target.value;
    const res = await UserServices.changeUserRole(id, roleID);
    if (res.data) {
      GetUserPermissionById();
    }
  };

  useEffect(() => {
    getAllRole();
    GetUserPermissionById();
  },[]);
  return (
    <>
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
                  <AdminHeader Sidebar={Data} />
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
                          Roles
                        </h3>
                      </div>
                      <div className="rolespermission-inner-box">
                        <div className="table-responsive">
                          <table class="table table-striped">
                            <thead>
                              <tr>
                                <th> S. No. </th>
                                <th> Profile </th>
                                <th> Name </th>
                                <th> Email </th>
                                <th> Role </th>
                                <th> Change Role </th>
                              </tr>
                            </thead>

                            <tbody>
                              {allUsers &&
                                allUsers.length > 0 &&
                                allUsers.map((data, index) => (
                                  <tr>
                                    <td>{index + 1} </td>

                                    <td>
                                      <img
                                        className="commentprofile"
                                        src={
                                          data.profilepicture
                                            ? `${
                                                IMAGE_BASE_URL +
                                                data.profilepicture
                                              }`
                                            : process.env.PUBLIC_URL +
                                              "/Images/guest-user.jpg"
                                        }
                                        alt=""
                                      />{" "}
                                    </td>
                                    <td>
                                      {data.firstName} {""} {data.lastName}
                                    </td>
                                    <td> {data.email} </td>
                                    <td>
                                      {" "}
                                      {data.roleID === 3
                                        ? "Community Admin"
                                        : data.roleID === 4
                                        ? "Group Admin"
                                        : data.roleID === 5
                                        ? "Group Member"
                                        : ""}{" "}
                                    </td>
                                    <td>
                                      <select
                                        defaultValue={data.roleID}
                                        onChange={(e) =>
                                          changeUserRole(data.userId, e)
                                        }
                                      >
                                        {allRole &&
                                          allRole.map((item) => (
                                            <option
                                              defaultValue={data.roleID}
                                              key={item._id}
                                              value={item._id}
                                            >
                                              {item.roleName}
                                            </option>
                                          ))}{" "}
                                      </select>{" "}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
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
      {/* <NotificationContainer /> */}
    </>
  );
};

export default Role;
