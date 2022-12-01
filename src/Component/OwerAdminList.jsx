import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { AdminHeader } from "./admin-header";
import SideBar from "./SideBar/index";
import UserService from "../Services/UserServices";
import CreateCommunityAdmin from "./CreateCommunityAdmin";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProfileDataActionThunk } from "../ReduxStore/profileData/profileData.actions.async";

// let roleID = localStorage.getItem("roleID");

const OwerAdminList = () => {

  const navigate = useNavigate();

  const { RoleID, UserID, IsMaster } = useSelector((state) => state?.auth?.loginData);
  const { changeRoleLoading } = useSelector((state) => state?.auth);

  const [Leftside, setLeftside] = useState(true);
  const [ownerAdminList, setOwnerAdminList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowMmodal] = useState(false);
  function Data() {
    setLeftside(!Leftside);
  }
  const openModal = () => {
    setShowMmodal(true);
  };
  const closeModal = () => {
    setShowMmodal(false);
  };
  const getAllOrnerAdmin = async () => {
    setLoader(true);
    const res = await UserService.GetAllOrnerAdmin();
    if (res.data.length > 0) {
      setOwnerAdminList(res.data);
    }
    setLoader(false);
  };
  useEffect(() => {
    if ((IsMaster === "False") || (IsMaster === "True" && Number(RoleID) !== Number(1))) {
      navigate("/admin-tools");
    } else {
      getProfileDataActionThunk(UserID);
      getAllOrnerAdmin();
    }
  }, [IsMaster, RoleID, UserID, navigate]);

  const navifateToCommunityList = (userId) => {
    localStorage.setItem("ownerAdminId", userId);
    navigate(`/communities?ownerAdminId=${userId}`);
  };
  console.log("role>>>>>>>>>>>>", RoleID)
  return (

    <>
      {changeRoleLoading && changeRoleLoading ? (
        <div className="spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div>
          {showModal && (
            <CreateCommunityAdmin
              showModal={showModal}
              setShowMmodal={setShowMmodal}
              closeModal={closeModal}
              openModal={openModal}
              roleID="1"
            />
          )}
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
                          <div className="admin-tools-menu-heading adm-group-heading">
                            <h3>Owner Admin</h3>
                            <div className="button-UI ">
                              {Number(RoleID) === Number(1) && (

                                <>

                                  <Link
                                    to="#"
                                    onClick={openModal}

                                    className=" btn tmplt-btn Btn-fill "
                                  >
                                    <i
                                      className="fa fa-plus me-2"
                                      aria-hidden="true"
                                    ></i>
                                    Create Master Admin
                                  </Link>



                                </>
                              )}
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-12 rolespermission-inner-box">
                              <div className="table-responsive ">
                                <table className="table table-border">
                                  <thead>
                                    <tr>
                                      <th> S. No. </th>
                                      <th> First Name </th>
                                      <th> Last Name </th>
                                      <th> Email</th>
                                      {/* <th> Community Count</th> */}
                                      <th> Action</th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {ownerAdminList && ownerAdminList?.length > 0 ? (
                                      ownerAdminList?.map((item, index) => (
                                        <tr key={index}>
                                          <td>{index + 1}</td>
                                          <td>{item.firstName}</td>
                                          <td>{item.lastName}</td>
                                          <td>{item.email}</td>
                                          <td>
                                            <button
                                              className="btn btn-primary view-com-button"
                                              style={{ marginRight: "10px" }}
                                              onClick={() =>
                                                navifateToCommunityList(item.userId)
                                              }
                                            >
                                              <i className="fa fa-eye"></i>
                                            </button>
                                          </td>
                                        </tr>
                                      ))
                                    ) : loader ? (
                                      <tr>
                                        <td colSpan="5">
                                          <div className="spinner-container w-100">
                                            <div className="loading-spinner"></div>
                                          </div>
                                        </td>
                                      </tr>
                                    ) : (
                                      <tr>
                                        <td colSpan="5">
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
      )}
    </>
  );
};

export default OwerAdminList;
