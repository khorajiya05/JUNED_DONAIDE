import React, { useEffect, useState } from "react";
import SideBar from "../SideBar/index";
import { AdminHeader } from "../admin-header";
import GroupService from "../../Services/GroupService";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from '../../Config'
import { useSelector } from "react-redux";
const AdminGroupMedia = () => {

  const { UserID } = useSelector((state) => state.auth?.loginData);

  const [Leftside, setLeftside] = useState(true);
  // const roleID = localStorage.getItem("roleID");
  const [loader, setLoader] = useState(false);
  // const userID = localStorage.getItem("userID");
  const [media, setMedia] = useState([]);

  function Data() {
    setLeftside(!Leftside);
  }
  const getCommunityGroupsWithCommunityDetails = async () => {
    setLoader(true);
    const res = await GroupService.getCommunityGroupsWithCommunityDetails(
      UserID
    );
    setMedia(res.data);
    setLoader(false);
  };
  useEffect(() => {
    getCommunityGroupsWithCommunityDetails();
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
                  <div className="inner-content-height justify-content-center">
                    <div className="admin-tools-menu ">
                      <div className="admin-grou-media">
                        <div className="admin-tools-menu-heading">
                          <h3>
                            <Link to="/admin-tools">
                              <i
                                className="fa fa-long-arrow-left me-2"
                                aria-hidden="true"
                              ></i>
                            </Link>
                            Group Media
                          </h3>
                        </div>
                        <div className="col-md-12 mt-4">
                          <div className="event-card   ">
                            <div className="group-tab-nav ">
                              <nav className="custom-nav-tab">
                                <div
                                  className="nav nav-tabs"
                                  id="nav-tab"
                                  role="tablist"
                                >
                                  <button
                                    className="nav-link active"
                                    id="nav-home-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#Photos"
                                    type="button"
                                    role="tab"
                                    aria-controls="nav-home"
                                    aria-selected="true"
                                  >
                                    Photos
                                  </button>
                                  <button
                                    className="nav-link"
                                    id="nav-profile-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#Videos"
                                    type="button"
                                    role="tab"
                                    aria-controls="nav-profile"
                                    aria-selected="false"
                                  >
                                    Videos
                                  </button>
                                  <button
                                    className="nav-link"
                                    id="nav-profile-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#Doc"
                                    type="button"
                                    role="tab"
                                    aria-controls="nav-profile"
                                    aria-selected="false"
                                  >
                                    Documents
                                  </button>
                                </div>
                              </nav>

                              <div className="tab-content mt-3 ">
                                <div
                                  className="tab-pane fade active show"
                                  id="Photos"
                                  role="tabpanel"
                                  aria-labelledby="nav-home-tab"
                                >
                                  <div>
                                    {media && media.length > 0 ? (
                                      media.map(
                                        (item) =>
                                          item.groupList &&
                                          item.groupList.length > 0 &&
                                          item.groupList.map((data, index) => (
                                            <div className="group-main-container" key={index}>
                                              <div className="card-group-col ">
                                                <h3 className="grou-name-heading">{data.groupName}</h3>
                                                <div className="ui-design-gallery">
                                                  <div className="row justify-content-start ">
                                                    {data.groupMeadiaList &&
                                                      data.groupMeadiaList.length >
                                                      0 ? (
                                                      data.groupMeadiaList.map(
                                                        (gmedia, index) =>
                                                          gmedia.fileType && gmedia.fileType === "Image" && (
                                                            <div
                                                              className="col-xl-2 col-lg-4 col-md-4 col-sm-4 col-12 mb-3"
                                                              key={index}
                                                            >

                                                              <div className="group-img">
                                                                <img
                                                                  src={
                                                                    gmedia.postImageOrVedioName
                                                                      ? `${IMAGE_BASE_URL + gmedia.postImageOrVedioName}`
                                                                      : ""
                                                                  }
                                                                  alt=""
                                                                  className="img-fluid"
                                                                />
                                                              </div>

                                                            </div>
                                                          )
                                                      )
                                                    ) : (
                                                      <div className="no-record-found">
                                                        <h4> No Record Found </h4>
                                                      </div>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          ))
                                      )
                                    ) : loader ? (
                                      <div className="spinner-container">
                                        <div className="loading-spinner"></div>
                                      </div>
                                    ) : (
                                      <div className="no-record-found">
                                        <h5> No Record Found</h5>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div
                                  className="tab-pane fade"
                                  id="Videos"
                                  role="tabpanel"
                                  aria-labelledby="nav-home-tab"
                                >
                                  <div>
                                    {media && media.length > 0 ? (
                                      media.map(
                                        (item) =>
                                          item.groupList &&
                                          item.groupList.length > 0 &&
                                          item.groupList.map((data, index) => (
                                            <div className="group-main-container" key={index}>
                                              <div className="card-group-col ">
                                                <h3 className="grou-name-heading">{data.groupName}</h3>
                                                <div className="ui-design-gallery">
                                                  <div className="row justify-content-start">
                                                    {data.groupMeadiaList &&
                                                      data.groupMeadiaList.length >
                                                      0 ? (
                                                      data.groupMeadiaList.map(
                                                        (gmedia, index) =>

                                                          gmedia.fileType && gmedia.fileType === "Vedio" && (
                                                            <div
                                                              className="col-xl-2 col-lg-4 col-md-4 col-sm-4 col-12 mb-3"
                                                              key={index}
                                                            >

                                                              <div className="video-play">
                                                                <ReactPlayer
                                                                  className="react-player"
                                                                  url={
                                                                    gmedia.postImageOrVedioName
                                                                      ? `${IMAGE_BASE_URL + gmedia.postImageOrVedioName}`
                                                                      : ""
                                                                  }
                                                                  width="100%"
                                                                  height="100%"
                                                                  controls={true}
                                                                />
                                                              </div>
                                                            </div>
                                                          )
                                                      )
                                                    ) : (
                                                      <div className="spinner-container">
                                                        <h5> No Record Found</h5>
                                                      </div>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          ))
                                      )
                                    ) : loader ? (
                                      <div className="spinner-container">
                                        <div className="loading-spinner"></div>
                                      </div>
                                    ) : (
                                      <div className="no-record-found">
                                        <h5> No Record Found</h5>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div
                                  className="tab-pane fade"
                                  id="Doc"
                                  role="tabpanel"
                                  aria-labelledby="nav-home-tab"
                                >
                                  <div className="">
                                    {media && media.length > 0 ? (
                                      media.map(
                                        (item) =>
                                          item.groupList &&
                                          item.groupList.length > 0 &&
                                          item.groupList.map((data, index) => (
                                            <div className="group-main-container" key={index}>
                                              <div className="card-group-col ">
                                                <h3 className="grou-name-heading">{data.groupName}</h3>
                                                <div className="ui-design-gallery">
                                                  <div className="row justify-content-start">
                                                    {data.groupMeadiaList &&
                                                      data.groupMeadiaList.length >
                                                      0 ? (
                                                      data.groupMeadiaList.map(
                                                        (gmedia, index) =>
                                                          gmedia.fileType &&
                                                          gmedia.fileType ===
                                                          "Document" && (
                                                            <div
                                                              className="col-xl-2 col-lg-4 col-md-4 col-sm-4 col-12 mb-3"
                                                              key={index}
                                                            >
                                                              {gmedia.fileName &&
                                                                gmedia.fileName.split(
                                                                  "."
                                                                )[1] === "pdf" ? (
                                                                <>
                                                                  <div className="docfile">
                                                                    <i
                                                                      className="fa fa-file-pdf-o doc-icon"
                                                                      aria-hidden="true"
                                                                    ></i>

                                                                    <p>
                                                                      <a
                                                                        href={
                                                                          `${IMAGE_BASE_URL + gmedia.postImageOrVedioName}`
                                                                        }
                                                                        download
                                                                      >
                                                                        {
                                                                          gmedia.fileName
                                                                        }
                                                                      </a>
                                                                    </p>
                                                                  </div>
                                                                </>
                                                              ) : gmedia.fileName &&
                                                                gmedia.fileName.split(
                                                                  "."
                                                                )[1] ===
                                                                "docx" ? (
                                                                <>
                                                                  <div className="docfile">
                                                                    <i
                                                                      className="fa fa-file-word-o doc-icon"
                                                                      aria-hidden="true"
                                                                    ></i>
                                                                    <p>
                                                                      <a
                                                                        href={
                                                                          `${IMAGE_BASE_URL + gmedia.postImageOrVedioName}`
                                                                        }
                                                                        download
                                                                      >
                                                                        {
                                                                          gmedia.fileName
                                                                        }
                                                                      </a>
                                                                    </p>
                                                                  </div>
                                                                </>
                                                              ) : gmedia.fileName &&
                                                                gmedia.fileName.split(
                                                                  "."
                                                                )[1] ===
                                                                "xlsx" ? (
                                                                <div className="docfile">
                                                                  <i
                                                                    className="fa fa-file-text doc-icon"
                                                                    aria-hidden="true"
                                                                  ></i>
                                                                  <p>
                                                                    <a
                                                                      href={
                                                                        `${IMAGE_BASE_URL + gmedia.postImageOrVedioName}`
                                                                      }
                                                                      download
                                                                    >
                                                                      {
                                                                        gmedia.fileName
                                                                      }
                                                                    </a>
                                                                  </p>
                                                                </div>
                                                              ) : (
                                                                <div className="docfile">
                                                                  <i
                                                                    className="fa fa-file-o doc-icon"
                                                                    aria-hidden="true"
                                                                  ></i>
                                                                  <p>
                                                                    <a
                                                                      href={
                                                                        `${IMAGE_BASE_URL + gmedia.postImageOrVedioName}`
                                                                      }
                                                                      download
                                                                    >
                                                                      {
                                                                        gmedia.fileName
                                                                      }
                                                                    </a>
                                                                  </p>
                                                                </div>
                                                              )}
                                                            </div>
                                                          )
                                                      )
                                                    ) : (
                                                      <div className="no-record-found">
                                                        <h5> No Record Found</h5>
                                                      </div>
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          ))
                                      )
                                    ) : loader ? (
                                      <div className="spinner-container">
                                        <div className="loading-spinner"></div>
                                      </div>
                                    ) : (
                                      <div className="spinner-container">
                                        <h5> No Record Found</h5>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default AdminGroupMedia;
