import React, { useEffect, useState } from "react";
import { AdminHeader } from "./admin-header";

import SideBar from "../Component/SideBar/index";
import Footer from "../Component/CommonComponents/DashboardFooter";
import DisplayAdminToolsAccToUserRole from "../Component/CommonComponents/DisplayAdminToolsAccToUserRole";
import { useDispatch, useSelector } from "react-redux";
import { getProfileDataActionThunk } from "../ReduxStore/profileData/profileData.actions.async";

const AdminTools = () => {

  const dispatch = useDispatch();

  const { UserID, RoleID } = useSelector((state) => state?.auth?.loginData)

  const [Leftside, setLeftside] = useState(true);
  
  function Data() {
    setLeftside(!Leftside);
  }
  useEffect(() => {
    dispatch(getProfileDataActionThunk(UserID))
  }, [dispatch, UserID]);

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
                        <h3>Admin Tools</h3>
                      </div>

                      {RoleID !== null &&
                        parseInt(RoleID) === 3 && (
                          <DisplayAdminToolsAccToUserRole
                            cartDetailsObj={[
                              {
                                router: "/communities",
                                cardIcon: "Images/community-setting-icon.svg",
                                cardText: "Community",
                              },
                              {
                                router: "/admin-group",
                                cardIcon: "Images/create-group-icon.svg",
                                cardText: "Groups",
                              },
                              {
                                router: "/view-admin",
                                cardIcon: "Images/admin-icon.svg",
                                cardText: "Admin",
                              },
                              {
                                router: "/member-view",
                                cardIcon: "Images/admin-members-icon.svg",
                                cardText: "Members",
                              },
                              {
                                router: "/invite-member",
                                cardIcon:
                                  "Images/admin-invite-members-icon.svg",
                                cardText: "Invite Members",
                              },
                              {
                                router: "/notification",
                                cardIcon: "Images/admin-notification-icon.svg",
                                cardText: "Notifications",
                              },
                            ]}
                          />
                        )}

                      {(RoleID!== null &&
                        parseInt(RoleID) === 1) ||
                        (RoleID!== null &&
                          parseInt(RoleID) === 2) ? (
                        <DisplayAdminToolsAccToUserRole
                          cartDetailsObj={[
                            {
                              router: "/communities",
                              cardIcon: "Images/community-setting-icon.svg",
                              cardText: "Community",
                            },
                            {
                              router: "/admin-group",
                              cardIcon: "Images/create-group-icon.svg",
                              cardText: "Groups",
                            },
                            // {
                            //   router: "/view-admin",
                            //   cardIcon: "Images/admin-icon.svg",
                            //   cardText: "Admin",
                            // },
                            {
                              router: "/member-view",
                              cardIcon: "Images/admin-members-icon.svg",
                              cardText: "Members",
                            },
                            {
                              router: "/invite-member",
                              cardIcon: "Images/admin-invite-members-icon.svg",
                              cardText: "Invite Members",
                            },
                            {
                              router: "/admin-group-media",
                              cardIcon: "Images/admin-media-icon.svg",
                              cardText: "Media",
                            },
                            {
                              router: "/admin-group-events",
                              cardIcon: "Images/admin-calender-icon.svg",
                              cardText: "Calendar",
                            },
                            {
                              router: "/admin-help-support",
                              cardIcon: "Images/admin-help-icon.svg",

                              cardText: "Help & Support",
                            },
                            {
                              router: "/notification",
                              cardIcon: "Images/admin-notification-icon.svg",
                              cardText: "Notifications",
                            },
                            // {
                            //   router: "/help",
                            //   cardIcon: "Images/admin-help-icon.svg",
                            //   cardText: "Help",
                            // },
                          ]}
                        />
                      ) : (
                        ""
                      )}

                      {RoleID!== null &&
                        parseInt(RoleID) === 4 && (
                          <DisplayAdminToolsAccToUserRole
                            cartDetailsObj={[
                              // { router: "/communities", cardIcon: "Images/community-setting-icon.svg", cardText: "Community" },
                              {
                                router: "/admin-group",
                                cardIcon: "Images/create-group-icon.svg",
                                cardText: "Groups",
                              },
                              // { router: "/view-admin", cardIcon: "Images/admin-icon.svg", cardText: "Admin" },
                              {
                                router: "/member-view",
                                cardIcon: "Images/admin-members-icon.svg",
                                cardText: "Members",
                              },
                              {
                                router: "/invite-member",
                                cardIcon:
                                  "Images/admin-invite-members-icon.svg",
                                cardText: "Invite Members",
                              },
                              // { router: "/media", cardIcon: "Images/admin-media-icon.svg", cardText: "Media" },
                              // { router: "/calendar", cardIcon: "Images/admin-calender-icon.svg", cardText: "Calendar" },
                              // { router: "/support", cardIcon: "Images/admin-support-icon.svg", cardText: "Support" },
                              {
                                router: "/notification",
                                cardIcon: "Images/admin-notification-icon.svg",
                                cardText: "Notifications",
                              },
                              // { router: "/help", cardIcon: "Images/admin-help-icon.svg", cardText: "Help" },
                            ]}
                          />
                        )}

                      {RoleID!== null &&
                        parseInt(RoleID) === 5 && (
                          <DisplayAdminToolsAccToUserRole
                            cartDetailsObj={[
                              // { router: "/communities", cardIcon: "Images/community-setting-icon.svg", cardText: "Community" },
                              {
                                router: "/admin-group",
                                cardIcon: "Images/create-group-icon.svg",
                                cardText: "Groups",
                              },
                              // { router: "/view-admin", cardIcon: "Images/admin-icon.svg", cardText: "Admin" },
                              // { router: "/member-view", cardIcon: "Images/admin-members-icon.svg", cardText: "Members" },
                              // { router: "/invite-member", cardIcon: "Images/admin-invite-members-icon.svg", cardText: "Invite Members" },
                              // { router: "/media", cardIcon: "Images/admin-media-icon.svg", cardText: "Media" },
                              // { router: "/calendar", cardIcon: "Images/admin-calender-icon.svg", cardText: "Calendar" },
                              // { router: "/support", cardIcon: "Images/admin-support-icon.svg", cardText: "Support" },
                              {
                                router: "/notification",
                                cardIcon: "Images/admin-notification-icon.svg",
                                cardText: "Notifications",
                              },
                              // { router: "/help", cardIcon: "Images/admin-help-icon.svg", cardText: "Help" },
                            ]}
                          />
                        )}
                    </div>
                  </div>
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminTools;
