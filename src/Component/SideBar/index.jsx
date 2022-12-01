import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { IMAGE_BASE_URL } from "../../Config";
// import { logout } from "../../ReduxStore/auth/auth.action";
// import { doEmptyProfileAction } from "../../ReduxStore/profileData/profileData.actions";
import UpdateUserProfile from "../UpdateUserProfile";

let SideBar = (props) => {

  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { toggleNav } = props;
  const { profileData } = useSelector((state) => state?.profileData)

  const [showModal, setShowMmodal] = useState(false);

  const openModal = () => {
    setShowMmodal(true);
  };
  const closeModal = () => {
    setShowMmodal(false);
  };

  // const logoutHandler = () => {
  //   dispatch(logout());
  //   dispatch(doEmptyProfileAction());
  //   navigate("/");
  //   localStorage.removeItem("token");
  // };

  return (
    <div className={!toggleNav ? "left-sidebar" : "left-sidebar mar-nav-left-0"}>
      {showModal && (
        <UpdateUserProfile
          showModal={showModal}
          setShowMmodal={setShowMmodal}
          closeModal={closeModal}
          openModal={openModal}
        // userCommunity={userCommunity}
        />
      )}
      <div className="sidebar-inner">
        {/* <div className="sidebar-inner-user-profile user-profile_sidebar">
          <img
            src={profileData?.profilePicture ? IMAGE_BASE_URL + profileData?.profilePicture : process.env.PUBLIC_URL + "/Images/guest-user.jpg"}
            alt=""
          />
          <div className="user-mfor-side">
            <h5> {profileData?.firstName} </h5>
            <div className="functin-button">
              <button className="logout-button" onClick={() => logoutHandler()}>
                <a href="/">
                  {" "}
                  <i className="fa fa-power-off me-1" aria-hidden="true"></i> Logout
                </a>
              </button>
              <button className="Editprfl-button">
                <Link to="" onClick={openModal}>
                  <i className="fa fa-edit me-1" aria-hidden="true"></i> Edit
                  Profile
                </Link>
              </button>
            </div>
          </div>
        </div> */}
        <ul className="sidebar-list-outer">
          {profileData?.roleID !== null &&
            parseInt(profileData?.roleID) !== 1 && (
              <li className="active">
                <Link to="/admin-tools" className="text-decoration-none">
                  <i className="fa fa-user me-2" aria-hidden="true"></i> Admin
                  Tools
                </Link>
              </li>
            )}
          {profileData?.roleID !== null &&
            parseInt(profileData?.roleID) !== 5 &&
            parseInt(profileData?.roleID) !== 1 && (
              <>
                <li>
                  <Link to="/permission" className="text-decoration-none">
                    <i className="fa fa-lock me-2" aria-hidden="true"></i>
                    Permission
                  </Link>
                </li>
                <li>
                  <Link to="/role" className="text-decoration-none">
                    <i className="fa fa-cog me-2" aria-hidden="true"></i>
                    Role
                  </Link>
                </li>
              </>
            )}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
