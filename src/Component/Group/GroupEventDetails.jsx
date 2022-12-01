import React, { useEffect, useState } from "react";
import SideBar from "../SideBar/index";
import { AdminHeader } from "../admin-header";
import { useLocation } from "react-router";
import GroupService from "../../Services/GroupService";
import moment from "moment";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useSelector } from "react-redux";
import { IMAGE_BASE_URL } from "../../Config";

const EventDetails = () => {

  const { UserID } = useSelector((state) => state?.auth?.loginData);

  const [Leftside, setLeftside] = useState(true);
  const [loader, setLoader] = useState(false);
  const [eventdetails, setEventDetails] = useState({});
  const [confirmId, setConfirmID] = useState({});
  const search = useLocation().search;
  const eventId = new URLSearchParams(search).get("eventId");
  function Data() {
    setLeftside(!Leftside);
  }

  const GetGroupEventById = async () => {
    setLoader(true);
    const res = await GroupService.GetGroupEventById(eventId);
    setEventDetails(res.data);

    setLoader(false);
  };
  const GetEventdetailByUserIdAndEventId = async () => {
    const res = await GroupService.GetEventdetailByUserIdAndEventId(
      UserID,
      eventId
    );
    setConfirmID(res.data);
  };

  const AddEventConfirmationDetails = async (going, mayBe, cantGo) => {
    const data = {
      eventId: eventId,
      communityId: eventdetails.siteID,
      groupId: eventdetails.groupID,
      UserID,
      going: going,
      cantGo: cantGo,
      mayBe: mayBe,
      eventConfirmId:
        confirmId.data !== null ? confirmId.data.eventConfirmId : null,
    };

    const res = await GroupService.AddEventConfirmationDetails(data);
    if (res.data) {
      NotificationManager.success("Your response is send successfully.");
      GetGroupEventById();
      GetEventdetailByUserIdAndEventId();
    }
  };

  useEffect(() => {
    GetGroupEventById();
    GetEventdetailByUserIdAndEventId();
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
                  <div className="inner-content-height">
                    <div className="admin-tools-menu">
                      <div className="admin-tools-menu-heading mb-4">
                        <h3>Event Details</h3>
                      </div>
                      <div className="container-flude">
                        <div className="row justify-content-center">
                          <div className="col-md-8">
                            <div className="create-event-area event-card card-group-col custom-event">
                              <div className="event-title">
                                <h4>Event Details</h4>
                              </div>
                              <div className="event-container">{
                                loader ? <div className="spinner-container">
                                  <div className="loading-spinner"></div>
                                </div> : <div className="event-area-info p-4">
                                  <div className="date-event">
                                    {
                                      moment(eventdetails.startDate)
                                        .utc()
                                        .format("DD-MM-YYYY")
                                        .split("-")[0]
                                    }
                                  </div>
                                  <div className="row">
                                    <div className="col-md-12">
                                      <div className="evn-name mt-3">
                                        <h3>
                                          {eventdetails.eventName
                                            ? eventdetails.eventName.toUpperCase()
                                            : ""}
                                        </h3>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row main-event-design">
                                    <div className="col-md-12">
                                      <div className="evn-date mt-3">
                                        <div className="event-info-main">
                                          <span className="upcomming-event">
                                            {` Start Date : ${eventdetails &&
                                              moment(eventdetails.startDate)
                                                .utc()
                                                .format("DD-MM-YYYY") +
                                              eventdetails.startTime
                                              }`}
                                          </span>
                                          <span className="upcomming-event">
                                            {` End Date : ${eventdetails &&
                                              moment(eventdetails.endDate)
                                                .utc()
                                                .format("DD-MM-YYYY") +
                                              eventdetails.endTime
                                              }`}
                                          </span>
                                        </div>
                                        <div className=" Location-address">
                                          <h6>{eventdetails.address}</h6>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="eve-user mt-3">
                                    <div className="row align-items-center">
                                      <div className="col-md-4">
                                        <div className="eve-user-name d-flex align-items-center">
                                          <div className="me-3">
                                            <img
                                              src={eventdetails.profilePicture ? (IMAGE_BASE_URL + eventdetails.profilePicture) : process.env.PUBLIC_URL + "/Images/guest-user.jpg"}
                                              width="40"
                                              height="40"
                                              className="rounded-circle"
                                              alt=""
                                            />
                                          </div>
                                          <div>
                                            <p className="mb-0">
                                              {" "}
                                              <strong>
                                                {eventdetails.userName}
                                              </strong>{" "}
                                              invied you
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-8 text-end">
                                        <div className="even-invite-action">
                                          <button
                                            className="btn btn-secondary me-2"
                                            onClick={() =>
                                              AddEventConfirmationDetails(
                                                1,
                                                0,
                                                0
                                              )
                                            }
                                          >
                                            <p>{eventdetails.going}</p>
                                            <i
                                              className="fa fa-check"
                                              aria-hidden="true"
                                            ></i>{" "}
                                            Going
                                          </button>
                                          <button
                                            className="btn btn-secondary me-2"
                                            onClick={() =>
                                              AddEventConfirmationDetails(
                                                0,
                                                1,
                                                0
                                              )
                                            }
                                          >
                                            <p>{eventdetails.mayBe}</p>
                                            <i
                                              className="fa fa-question-circle"
                                              aria-hidden="true"
                                            ></i>{" "}
                                            Maybe
                                          </button>
                                          <button
                                            className="btn btn-secondary me-2"
                                            onClick={() =>
                                              AddEventConfirmationDetails(
                                                0,
                                                0,
                                                1
                                              )
                                            }
                                          >
                                            <p>{eventdetails.cantGo}</p>
                                            <i
                                              className="fa fa-times"
                                              aria-hidden="true"
                                            ></i>{" "}
                                            Can't go
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              }

                              </div>
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
        </div>
      </main>
      <NotificationContainer />
    </div>
  );
};

export default EventDetails;
