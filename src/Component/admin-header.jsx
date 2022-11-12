import React, { useState, useEffect } from "react";

import logo from "../Assests/Images/Combo-logo.png";
import { Link, useNavigate } from "react-router-dom";
import GroupService from "../Services/GroupService";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "./SideBar";
import { getRoleAndPermissionListByID } from "../ReduxStore/Actions/roleAndPermissionAction";
import { IMAGE_BASE_URL } from "../Config";
import UpdateUserProfile from "./UpdateUserProfile";
import ChangeRoleModal from "./Admin/ChangeRoleModal";
import { logout } from "../ReduxStore/auth/auth.action";
export const AdminHeader = (props) => {

  const { profileData } = useSelector((state) => state?.profileData)
  const { IsMaster, UserID, RoleID } = useSelector((state) => state?.auth?.loginData)

  const [useNotifiMsg, setUserNotifiMsg] = useState([]);
  const [toggleNav, setToggleNav] = useState(false);
  const [notificationCount, setNotificationCount] = useState("");
  const [showModal, setShowMmodal] = useState(false);
  const [showRoleModal, setShowRoleMmodal] = useState(false);


  const openModal = () => {
    setShowMmodal(true);
  };
  const closeModal = () => {
    setShowMmodal(false);
  };
  const openRoleModal = () => {
    setShowRoleMmodal(true);
  };
  const closeRoleModal = () => {
    setShowRoleMmodal(false);
  };
  let dispatch = useDispatch();

  const permission = useSelector(
    (state) => state.roleAndPermision.data.payload
  );

  const handleToggle = () => {
    setToggleNav(!toggleNav);
  };

  const navigate = useNavigate();

  let getAllNotificationMessageByUserID = async (userID) => {
    try {
      const res = await GroupService.getAllNotificationMessageByUserID(userID);
      if (res !== []) {
        setNotificationCount(res.data.filter((item) => item.isView === false));
        setUserNotifiMsg(res.data);
      } else {
      }
    } catch (error) {
      console.log(error.message);
    }
  };

    
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
    localStorage.removeItem("token");
  };


  const handleNotification = async () => {
    await GroupService.UpdateUserNotificationIsView(UserID);

    navigate("/notification");
  };

  useEffect(() => {
    getAllNotificationMessageByUserID(UserID);
    dispatch(getRoleAndPermissionListByID(UserID, RoleID));
  }, []);



  return (
    <div>
      {showModal && (
        <UpdateUserProfile
          showModal={showModal}
          setShowMmodal={setShowMmodal}
          closeModal={closeModal}
          openModal={openModal}
        // userCommunity={userCommunity}
        />
      )}
      {showRoleModal && (
        <ChangeRoleModal
          showRoleModal={showRoleModal}
          setShowRoleMmodal={setShowMmodal}
          closeRoleModal={closeRoleModal}
          openRoleModal={openRoleModal}

        />
      )}
      <SideBar toggleNav={toggleNav} />
      <nav
        className="navbar navbar-expand-md custom-navbar fixed-top "
        id="top-admin-header"
      >
        <Link to={""} className="navbar-brand " href="/#">
          <img src={logo} width={140} alt="logo" />
        </Link>
        <button className="button-toogle" onClick={handleToggle}>
          <i class="fa fa-bars" aria-hidden="true"></i>
        </button>

        <ul className="navbar-nav adm-header-nav ms-auto ">
          <li
            className="nav-item adm-notification dropdown "
            onClick={handleNotification}
          >
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              <i className="fa fa-bell" />

              <div className="adm-notif-bell-numb">
                {notificationCount.length ? notificationCount.length : 0}
              </div>
            </a>
          </li>
          {/* )} */}

          <li class="nav-item dropdown adm-profile-drop">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              <div className="admin-profile-pic">
                <img
                  src={profileData?.profilePicture ? IMAGE_BASE_URL + profileData?.profilePicture : process.env.PUBLIC_URL + "/Images/guest-user.jpg"}
                  alt=""
                />
              </div>
              <div className="admin-profile-pic-name">{`${profileData?.firstName} ${profileData?.lastName}`}</div>
            </a>
            <ul class="dropdown-menu">
              <li onClick={openModal}>
                <Link class="dropdown-item" to="">
                  <i class="fa fa-edit me-1" aria-hidden="true"></i> Edit
                  Profile
                </Link>
              </li>

              {IsMaster == "True" && (
                <li onClick={openRoleModal}>
                  <Link class="dropdown-item" to="">
                    <i class="fa fa-cog me-2" aria-hidden="true"></i> Switch
                    Role
                  </Link>
                </li>
              )}

              <li onClick={logoutHandler}>
                <a class="dropdown-item" href="/">
                  <i class="fa fa-power-off me-2" aria-hidden="true"></i> Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminHeader;
