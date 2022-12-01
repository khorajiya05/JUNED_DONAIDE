import  { useState, useEffect } from "react";
import { AdminHeader } from "../admin-header";
import SideBar from "../SideBar/index";
import GroupService from "../../Services/GroupService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CreateGroupEvent from '../Group/CreateGroupEvent'
import { IMAGE_BASE_URL } from '../../Config'
import { useSelector } from "react-redux";
const AdminGroupEvent = () => {

  const { UserID, RoleID } = useSelector((state) => state.auth?.loginData);

  const [Leftside, setLeftside] = useState(true);
  const [event, setEvents] = useState([]);
  const [loader, setLoader] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  // const roleID = localStorage.getItem("roleID");
  function Data() {
    setLeftside(!Leftside);
  }

  const OpenModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const navigate = useNavigate();

  const getCommunityGroupsWithCommunityDetails = async () => {
    setLoader(true);
    const res = await GroupService.getCommunityGroupsWithCommunityDetails(UserID);
    setEvents(res.data);
    setLoader(false);
  };
  
  const showEventDetials = (id) => {
    navigate(`/event-details?eventId=${id}`);
  };
  useEffect(() => {
    getCommunityGroupsWithCommunityDetails();
  }, []);


  return (
    <>
      {modalIsOpen && (
        <CreateGroupEvent
          modalIsOpen={modalIsOpen}
          OpenModal={OpenModal}
          closeModal={closeModal}
          isAdminSide={true}
          getCommunityGroupsWithCommunityDetails={getCommunityGroupsWithCommunityDetails}
          event={event}
        // siteID={props.siteID}
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
                    <div className="admin-tools-menu admin-group-page">

                      <div className="adm-group-heading">
                        <h3>
                          {RoleID != 1 &&
                            <Link to="/admin-tools">
                              <i
                                className="fa fa-long-arrow-left me-2"
                                aria-hidden="true"
                              ></i>
                            </Link>}
                          Group Events
                        </h3>
                        <div>
                          <>
                            <Link to="#" className="btn tmplt-btn Btn-fill" onClick={OpenModal}>
                              <i
                                className="fa fa-plus me-2 "
                                aria-hidden="true"
                              ></i>
                              Create event
                            </Link>
                          </>
                        </div>
                      </div>


                      <div className="Custom-event-design">
                        {event && event.length > 0 ? (
                          event.map(
                            (item) =>
                              item.groupList &&
                              item.groupList.length > 0 &&
                              item.groupList.map((data, index) => (
                                <div className="group-main-container" key={index}>
                                  <div className="event-card card-group-col custom-event">
                                    <div className="event-title">
                                      <h4>Upcomming Events</h4>
                                    </div>
                                    <div className="custom-padding-new">
                                      <div className="row justify-content-start">

                                        {data.groupeventList.upcommintEvents &&
                                          data.groupeventList.upcommintEvents
                                            .length > 0 ? (
                                          data.groupeventList.upcommintEvents.map(
                                            (groupEventListItem, index) => (
                                              <div
                                                key={groupEventListItem.eventID}
                                                className="col-md-3 mb-3"

                                                onClick={() =>
                                                  showEventDetials(
                                                    groupEventListItem.eventID
                                                  )
                                                }
                                              >
                                                <div className="admin-img">
                                                  <img
                                                    src={
                                                      groupEventListItem.coverImage
                                                        ? `${IMAGE_BASE_URL + groupEventListItem.coverImage}`
                                                        : process.env.PUBLIC_URL +
                                                        " /Images/group_cover_img.jpg "
                                                    }
                                                    alt=""
                                                    className="admin-group-img"
                                                  />
                                                  <p>
                                                    {groupEventListItem.eventName}
                                                  </p>
                                                </div>
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
                                  <div className="event-card card-group-col custom-event">
                                    <div className="event-title">
                                      <h4>Past Events</h4>
                                    </div>
                                    <div className="custom-padding-new">
                                      <div className="row justify-content-start">

                                        {data.groupeventList.outgoingEvents &&
                                          data.groupeventList.outgoingEvents
                                            .length > 0 ? (
                                          data.groupeventList.outgoingEvents.map(
                                            (groupEventListItem, index) => (
                                              <div
                                                className="col-md-3 mb-3"
                                                key={index}
                                                onClick={() =>
                                                  showEventDetials(
                                                    groupEventListItem.eventID
                                                  )
                                                }
                                              >
                                                <div className="admin-img">
                                                  <img
                                                    src={
                                                      groupEventListItem.coverImage
                                                        ? `${IMAGE_BASE_URL + groupEventListItem.coverImage}`
                                                        : process.env.PUBLIC_URL +
                                                        " /Images/group_cover_img.jpg "
                                                    }
                                                    alt=""
                                                    className="img-fluid"
                                                  />
                                                  <p>
                                                    {groupEventListItem.eventName}
                                                  </p>
                                                </div>
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
    </>
  );
};
export default AdminGroupEvent;
