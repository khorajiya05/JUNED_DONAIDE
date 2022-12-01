import { useState, useEffect } from "react";

import { AdminHeader } from "./admin-header";

import { Link } from "react-router-dom";
import GroupService from "../Services/GroupService";
import SideBar from "./SideBar/index";
import { useSelector } from "react-redux";
import { IMAGE_BASE_URL } from "../Config";

const Notification = () => {

  const { UserID, RoleID } = useSelector((state) => state.auth?.loginData)

  const [Leftside, setLeftside] = useState(true);
  const [useNotifiMsg, setUserNotifiMsg] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  function Data() {
    setLeftside(!Leftside);
  }

  let getAllNotificationMessageByUserID = async () => {
    setIsLoading(true)
    try {
      const res = await GroupService.getAllNotificationMessageByUserID(
        UserID
      );
      if (res) {
        setUserNotifiMsg(res.data);
      } else {
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error.message);
      setIsLoading(false)
    }
  };

  useEffect(() => {
    getAllNotificationMessageByUserID();
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
                  <div className="inner-content-height notification-bg">
                    <div className="admin-group-page notification-bg">
                      <div className="adm-group-heading">
                        <h3>
                          {RoleID != 1 && <Link to="/admin-tools">

                            <i
                              className="fa fa-long-arrow-left me-2"
                              aria-hidden="true"
                            ></i>

                          </Link>}

                          Notifications
                        </h3>
                      </div>
                      <div className="container-fluid">
                        <div className="row justify-content-center mt-3">
                          <div className="col-md-6">
                            <div className="notification-page-outer">
                              <ul className="notification-lists">
                                {useNotifiMsg && useNotifiMsg.length > 0 ? (
                                  useNotifiMsg && useNotifiMsg.length > 0 && useNotifiMsg.map((memberData, i) => (
                                    <li key={i}>
                                      <a href="#">
                                        <img src={memberData.adminProfilePic ? (IMAGE_BASE_URL + memberData.adminProfilePic) : process.env.PUBLIC_URL + " /Images/guest-user.jpg "} alt="" />
                                        <div className="notification-page-content">
                                          <h5>
                                            <span>{memberData.adminName}</span> messaged you.
                                          </h5>
                                          <p>
                                            {memberData.message}
                                          </p>
                                          <p className="post-time">{memberData.notificationTime}</p>
                                        </div>
                                      </a>
                                    </li>
                                  ))


                                ) : (

                                  <>
                                    {
                                      isLoading === true ? <div className="spinner-container">
                                        <div className="loading-spinner"></div>
                                      </div> : <h4 style={{ textAlign: "center" }}>No Notification </h4>
                                    }
                                  </>

                                )}

                              </ul>
                            </div>
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
    </div>
  );
};

export default Notification;
