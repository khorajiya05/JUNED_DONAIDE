import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";

import { AdminHeader } from "./admin-header";
import CommunityService from "../Services/CommunityService";
import MemberShipService from "../Services/MemberShipService";
import CreateCommunityAdmin from "./CreateCommunityAdmin";
import { getRoleAndPermissionListByID } from "../ReduxStore/Actions/roleAndPermissionAction";
import { IMAGE_BASE_URL } from "../Config";
import { errorToast, successToast, warningToast } from "./toast/toast";

const TemplateDashboard = () => {
  const { RoleID, UserID } = useSelector((state) => state?.auth?.loginData);
  const [isLoader, setIsLoader] = useState(false);
  const [Leftside, setLeftside] = useState(true);
  const [showModal, setShowMmodal] = useState(false);

  const [userCommunity, setUserCommunity] = useState([]);
  const [membershipData, setMembershipData] = useState([]);
  const [isCreateNewSite, setIsCreateNewSite] = useState(false);
  const [communityCount, setCommunityCount] = useState(0);
  const [totalCommunityCount, setTotalCommunityCount] = useState({
    AllCommunityCount: 0,
    CreatedCommunity: 0,
    PlanName: "N/A",
    MonthlyPrice: "N/A",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { search } = location;
  const permission = useSelector((state) => state.roleAndPermision.data);

  const userID = new URLSearchParams(search).get("ownerAdminId")
    ? new URLSearchParams(search).get("ownerAdminId")
    : UserID;
  const openModal = () => {
    setShowMmodal(true);
  };
  const closeModal = () => {
    setShowMmodal(false);
  };

  //Get all communities details
  const getUserCommunityByUserID = async () => {
    try {
      setIsLoader(true);

      const res = await CommunityService.getUserCommunityByUserID(userID);
      setIsLoader(true);
      if (res.status === 200) {
        setUserCommunity(res.data);
        setCommunityCount(res.data.length);
        setIsLoader(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCommunityPlanValidUser = async () => {
    let res = await MemberShipService.getMemberShipByUserID(userID);
    setMembershipData(res.data);

    if (res.data.monthlyPrice === "0") {
      setIsCreateNewSite(false);
    } else if (res.data.monthlyPrice === "14" && communityCount < 3) {
      setIsCreateNewSite(true);
    } else if (res.data.monthlyPrice === "199" && communityCount < 20) {
      setIsCreateNewSite(true);
    } else if (res.data.monthlyPrice === "1900" && communityCount < 23) {
      setIsCreateNewSite(true);
    } else if (res.data.monthlyPrice === "4500" && communityCount < 31) {
      setIsCreateNewSite(true);
    } else {
      setIsCreateNewSite(false);
    }
  };

  function Data() {
    setLeftside(!Leftside);
  }

  //Get all commnunities api functionality
  const getrUserCommunityCount = async () => {
    const res = await CommunityService.getUserCommunityCount(userID);
    setTotalCommunityCount({
      CreatedCommunity: res.data.CreatedCommunity,
      AllCommunityCount: res.data.AllCommunityCount,
      PlanName: res.data.PlanName,
      MonthlyPrice: res.data.MonthlyPrice,
    });
  };

  //Delete Community 
  let DeleteCommunityModal = (siteID) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to delete this site.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            CommunityService.DeleteCommuinty(siteID)
              .then((response) => {
                if (response.data.status === "SUCCESS") {
                  successToast("Community delete successfully!");
                  getUserCommunityByUserID();
                  getrUserCommunityCount();
                }
              })
              .catch((e) => {
                errorToast("Something went wrong");
                console.log(e);
              });
          },
        },
        {
          label: "No",
          onClick: () => { },
        },
      ],
    });
  };

  useEffect(() => {
    getUserCommunityByUserID();
    getrUserCommunityCount();
  }, [userCommunity?.communityId]);

  useEffect(() => {
    if (RoleID == 2) {
      getCommunityPlanValidUser();
    }

    getrUserCommunityCount();
  }, [membershipData?._id]);

  useEffect(() => {
    getrUserCommunityCount();
    dispatch(getRoleAndPermissionListByID(userID, RoleID));
  }, []);

  let updatePublicSideStatus = async (data, type) => {
    try {
      const response = await CommunityService.updateSitePublishStatus(
        data.communityId,
        !data.status
      );
      if (response.data.statusCode === 200) {
        if (type === "unpublish") {
          navigate(`/${data.communityDomain}`);
        } else {
          getUserCommunityByUserID();
        }
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {showModal && (
        <CreateCommunityAdmin
          showModal={showModal}
          setShowMmodal={setShowMmodal}
          closeModal={closeModal}
          openModal={openModal}
          userCommunity={userCommunity}
          roleID={RoleID}
        />
      )}
      <AdminHeader Sidebar={Data} />
      <main className="">
        <div className="main-outer-container">
          <div className="dashboard-outer-container">
            <div className="inner-container-template m-0">
              <div className={Leftside ? "dashboard-container " : "dashboard-container active"}>
                <div className="right-sidebar ">
                  <div className="container-fluid">
                    <div className="inner-content-height">
                      <div className="admin-group-page pb-0">
                        <div className="admin-group-page adm-group-heading  ">
                          <div className="heading-main">
                            <h3>
                              <Link to="/admin-tools"><i className="fa fa-long-arrow-left me-2" aria-hidden="true" ></i></Link>
                              Communities
                            </h3>
                          </div>
                          {Number(RoleID) === Number(2) && (
                            <div className="button-UI">
                              <Link
                                to="/upgrade-plan"
                                className="btn tmplt-btn button-outline me-2"
                              >
                                Upgrade Plan
                              </Link>
                              {totalCommunityCount.AllCommunityCount >= totalCommunityCount.CreatedCommunity ? (
                                permission &&
                                permission.length > 0 &&
                                permission.filter((e) => e.permissionName === "Create Community Site").length > 0 &&
                                (
                                  <Link
                                    to="/create-community"
                                    className="btn tmplt-btn Btn-fill"
                                  >
                                    <i
                                      className="fa fa-plus me-2"
                                      aria-hidden="true"
                                    ></i>
                                    Create New Site
                                  </Link>
                                )
                              ) : (
                                <>
                                  <Link
                                    to="/communities"
                                    className="btn tmplt-btn Btn-fill"
                                    onClick={() => {
                                      alert("Please upgrade your plan.");
                                      warningToast("Please upgrade your plan.");
                                    }}
                                  >
                                    <i className="fa fa-plus me-2" aria-hidden="true" ></i>
                                    Create New Site
                                  </Link></>
                              )}
                              {RoleID !== null && RoleID !== 3 && (
                                <>
                                  <Link to="" className="btn tmplt-btn Btn-fill" onClick={openModal}>
                                    <i className="fa fa-plus me-2" aria-hidden="true" ></i>
                                    create community Admin
                                  </Link>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="all-sites-template-container">
                          <div className="sites-template-container-box row mobile-aligned-start">
                            <div className="community-title">
                              {Number(RoleID) === Number(2) ? (
                                <p>You Created {totalCommunityCount.CreatedCommunity} site and
                                  {(parseInt(totalCommunityCount.AllCommunityCount) - parseInt(totalCommunityCount.CreatedCommunity)) >= 0 ? (parseInt(totalCommunityCount.AllCommunityCount) - parseInt(totalCommunityCount.CreatedCommunity)) : 0}
                                  site left
                                </p>
                              ) : (
                                RoleID !== 1 && <p>Communities</p>
                              )}
                            </div>
                            {userCommunity && userCommunity.length > 0 ? (
                              userCommunity.map((data) => (
                                <div
                                  className="col-md-6 col-xl-4"
                                  key={data.communityId}
                                >
                                  <div className="site-template-card-outer">
                                    <div className="site-template-card-image">
                                      <img
                                        src={
                                          data.communityLogo !== ""
                                            ? `${IMAGE_BASE_URL + data.communityLogo}`
                                            : "Images/default_commu_img.svg"
                                        }
                                        alt=""
                                      />

                                      <div className="edit-site-tmplt">
                                        {Number(RoleID) === Number(2) ? (
                                          <Link
                                            to={"/edit/" + data.communitySiteName + "?id=" + data.communityId}
                                            // to={"/editSite/" + data.communityId}
                                            className="btn  me-2"
                                          >
                                            <i className="fa fa-pencil me-2"></i>
                                            Edit Your Site
                                          </Link>
                                        ) : (
                                          <Link
                                            target="_blank"

                                            to={`/${data.communityDomain}`}
                                            className="btn  me-2"
                                          >
                                            <i className="fa fa-eye me-2"></i>
                                            View Site
                                          </Link>
                                        )}
                                      </div>
                                    </div>
                                    <div className="site-template-card-publish">
                                      <div className="site-template-card-name ">
                                        <h5>{data.communitySiteName}</h5>
                                        <p className="m-0">

                                          <Link
                                            to={`/${data.communityDomain}`}
                                          >
                                            {data.communityDomain}
                                          </Link>
                                        </p>
                                      </div>
                                      <button
                                        type="button"
                                        className="del-com-btn"
                                        onClick={() =>
                                          DeleteCommunityModal(data.communityId)
                                        }
                                      >
                                        <i className="fa fa-trash"></i>
                                      </button>
                                      {data.status ? (
                                        <button className="post">
                                          Publish
                                        </button>
                                      ) : (
                                        <button
                                          className="post"
                                          onClick={() =>
                                            updatePublicSideStatus(
                                              data,
                                              "unpublish"
                                            )
                                          }
                                        >
                                          Not Publish
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : isLoader ? (
                              <div className="spinner-container">
                                <div className="loading-spinner"></div>
                              </div>
                            ) : (
                              <div className="spinner-container">
                                <h4> No Record Found</h4>
                              </div>
                            )}
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
  );
};

export default TemplateDashboard;
