import React, { useState } from "react";
import  { AdminHeader } from "./admin-header";

import { Link } from "react-router-dom";
import SideBar from "../Component/SideBar/index";

const AdminDashboard = () => {

const [Leftside, setLeftside]=useState(true)

    function Data(){
        setLeftside(!Leftside);
     }

  return (
    <div>
     <AdminHeader Sidebar={Data}/>
      <main className="">
        <div className="main-outer-container">
          <div className="dashboard-outer-container">
            <div className="inner-container-template m-0">
              <div className={Leftside ? "dashboard-container " : "dashboard-container active"}>
             
                  <SideBar/>          
                <div className="right-sidebar">
                  <div className="inner-content-height">
              

                    <div className="admin-tools-menu">
                      <div className="admin-tools-menu-heading">
                        <h3>
                       
                          Admin Tools</h3>
                      </div>

                      <div className="adm-tools-outer-box">
                        <Link
                          to="/admin-group"
                          className="adm-tools-card text-decoration-none"
                        >
                          <div className="adm-tools-card-inner">
                            <div className="adm-tools-card-icon">
                              <img src="Images/community-icon.svg" alt="icon" />
                            </div>
                            <h5>Community</h5>
                          </div>
                        </Link>
                        <div className="adm-tools-card">
                          <div className="adm-tools-card-inner">
                            <div className="adm-tools-card-icon">
                              <img
                                src="Images/community-setting-icon.svg"
                                alt="icon"
                              />
                            </div>
                            <h5>Community Setting</h5>
                          </div>
                        </div>
                        <div className="adm-tools-card">
                          <div className="adm-tools-card-inner">
                            <div className="adm-tools-card-icon">
                              <img
                                src="Images/create-group-icon.svg"
                                alt="icon"
                              />
                            </div>
                            <h5>Create Group</h5>
                          </div>
                        </div>
                        <div className="adm-tools-card">
                          <div className="adm-tools-card-inner">
                            <div className="adm-tools-card-icon">
                              <img src="Images/admin-icon.svg" alt="icon" />
                            </div>
                            <h5>Admin</h5>
                          </div>
                        </div>
                        <div className="adm-tools-card">
                          <div className="adm-tools-card-inner">
                            <div className="adm-tools-card-icon">
                              <img
                                src="Images/admin-members-icon.svg"
                                alt="icon"
                              />
                            </div>
                            <h5>Members</h5>
                          </div>
                        </div>
                        <div className="adm-tools-card">
                          <div className="adm-tools-card-inner">
                            <div className="adm-tools-card-icon">
                              <img
                                src="Images/admin-invite-members-icon.svg"
                                alt="icon"
                              />
                            </div>
                            <h5>Invite Members</h5>
                          </div>
                        </div>
                        <div className="adm-tools-card">
                          <div className="adm-tools-card-inner">
                            <div className="adm-tools-card-icon">
                              <img
                                src="Images/admin-financial-icon.svg"
                                alt="icon"
                              />
                            </div>
                            <h5>Financials</h5>
                          </div>
                        </div>
                        <div className="adm-tools-card">
                          <div className="adm-tools-card-inner">
                            <div className="adm-tools-card-icon">
                              <img
                                src="Images/admin-create-compaign-icon.svg"
                                alt="icon"
                              />
                            </div>
                            <h5>Create Compaign</h5>
                          </div>
                        </div>
                        <div className="adm-tools-card">
                          <div className="adm-tools-card-inner">
                            <div className="adm-tools-card-icon">
                              <img
                                src="Images/admin-media-icon.svg"
                                alt="icon"
                              />
                            </div>
                            <h5>Media</h5>
                          </div>
                        </div>
                        <div className="adm-tools-card">
                          <div className="adm-tools-card-inner">
                            <div className="adm-tools-card-icon">
                              <img
                                src="Images/admin-calender-icon.svg"
                                alt="icon"
                              />
                            </div>
                            <h5>Calendar</h5>
                          </div>
                        </div>
                        <div className="adm-tools-card">
                          <div className="adm-tools-card-inner">
                            <div className="adm-tools-card-icon">
                              <img
                                src="Images/admin-notification-icon.svg"
                                alt="icon"
                              />
                            </div>
                            <h5>Notifications</h5>
                          </div>
                        </div>
                        <div className="adm-tools-card">
                          <div className="adm-tools-card-inner">
                            <div className="adm-tools-card-icon">
                              <img
                                src="Images/admin-support-icon.svg"
                                alt="icon"
                              />
                            </div>
                            <h5>Support</h5>
                          </div>
                        </div>
                        <div className="adm-tools-card">
                          <div className="adm-tools-card-inner">
                            <div className="adm-tools-card-icon">
                              <img
                                src="Images/admin-help-icon.svg"
                                alt="icon"
                              />
                            </div>
                            <h5>Help</h5>
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

export default AdminDashboard;
