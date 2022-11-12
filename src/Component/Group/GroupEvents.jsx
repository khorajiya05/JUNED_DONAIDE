import React, { useEffect, useState } from "react";
import CreateGroupEvent from "./CreateGroupEvent";
import GroupService from "../../Services/GroupService";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import moment from "moment";
import {IMAGE_BASE_URL} from '../../Config'
const GroupEvents = (props) => {


  const [modalIsOpen, setIsOpen] = useState(false);
  const [upComingEvents, setUpComingEvents] = useState([]);
  const [outGoingEvents, setOutGoingEvents] = useState([]);

  const navigate = useNavigate();

  const search = useLocation().search;
  const getGroupID = new URLSearchParams(search).get("groupID");

  const OpenModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  let getUpcomEventsList = async () => {
    try {
      const res = await GroupService.getUpcomingEventsList(getGroupID);

      if (res.data.length > 0) {
        setUpComingEvents(res.data);
      } else {
        setUpComingEvents([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  let getOutgoingEventsList = async () => {
    try {
      const res = await GroupService.getOutgoingEventsList(getGroupID);

      if (res.data.length > 0) {
        setOutGoingEvents(res.data);
      } else {
        setOutGoingEvents([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const showEventDetials = (id) => {
    navigate(`/event-details?eventId=${id}`);
  };

  useEffect(() => {
    getUpcomEventsList();
    getOutgoingEventsList();
  }, []);

  return (
    <div>
      {modalIsOpen && (
        <CreateGroupEvent
          modalIsOpen={modalIsOpen}
          OpenModal={OpenModal}
          closeModal={closeModal}
          setIsOpen={setIsOpen}
          siteID={props.siteID}
        />
      )}
      <div className="row justify-content-center bg-grey-wall pt-4 pb-4">
        <div className="col-md-8">
          <div className="event-card  card-group-col custom-event">
            <div className="event-title">
              <h4>Upcoming events</h4>
            
              <div>
                <div className="invite-remove-group-list-btn ms-auto">
                  <button
                    onClick={OpenModal}
                    type="button"
                    className="text-decoration-none post"
                    // className="post"
                  >
                    <i className="fa fa-plus me-2" aria-hidden="true"></i>
                    Create Event
                    
                  </button>
                </div>
              </div>
            </div>

            <div className="event-card-body">
              {upComingEvents !== undefined && upComingEvents.length > 0 ? (
                upComingEvents.map((events) => (
                  <div
                    className="row mb-3 event-section  "
                    onClick={() => showEventDetials(events.eventID)}
                  >
                    <div className="col-md-3">
                  
                      <img
                        src={
                          events.coverImage
                            ? `${IMAGE_BASE_URL+events.coverImage}`
                            : process.env.PUBLIC_URL +
                              " /Images/group_cover_img.jpg "
                        }
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="col-md-9">
                      <div className="event-info">
                        <h4>{events.eventName.toUpperCase()}</h4>
                        <div className="event-info-main">
                        <span className="upcomming-event">
                          <b>Start Date :</b>{" "}
                          {moment(events.startDate).format("YYYY-MM-DD")}{" "}
                          {events.startTime}
                        </span>
                   
                        <span className="upcomming-event">
                          <b>End Date :</b>
                          {moment(events.endDate).format("YYYY-MM-DD")}{" "}
                          {events.endTime}
                        </span>
</div>
                        <div className="cre-event">
                          <img
                            alt=""
                            src={
                              events.profilePicture
                                ? events.profilePicture
                                : `${process.env.PUBLIC_URL}Images/guest-user.jpg`
                            }
                          />
                          <p>
                            Created by <strong>{events.userName}</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center mt-4 mb-4 ">
                  <img
                    src="https://www.iconpacks.net/icons/1/free-calendar-icon-865-thumb.png"
                    alt=""
                    width={"130px"}
                  />
                  <p>No upcoming events.</p>
                </div>
              )}
            </div>
          </div>

          <div className="event-card  card-group-col custom-event mt-4">
            <div className="event-title mb-3">
              <h4>Past events</h4>
              <div></div>
            </div>

            <div className="event-card-body">
              {outGoingEvents !== undefined && outGoingEvents.length > 0 ? (
                outGoingEvents.map((events) => (
                  <div className="row mb-3">
                    <div className="col-md-3">
                      <img
                        src={
                          events.coverImage
                            ? `${IMAGE_BASE_URL+events.coverImage}`
                            : process.env.PUBLIC_URL +
                              " /Images/group_cover_img.jpg "
                        }
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="col-md-9">
                      <div className="event-info evn-date">
                        <h4>{events.eventName.toUpperCase()}</h4>
                        <div className="event-info-main">
                        <span className="past-event">
                          <b>Start Date :</b>{" "}
                          {moment(events.startDate).format("YYYY-MM-DD")}{" "}
                          {events.startTime}
                        </span>
                       
                        <span className="past-event">
                          <b>End Date :</b>
                          {moment(events.endDate).format("YYYY-MM-DD")}{" "}
                          {events.endTime}
                        </span>
                        </div>
                        <div className="cre-event">
                          <img
                            src={
                              events.profilePicture
                                ? events.profilePicture
                                : process.env.PUBLIC_URL +
                                  "/Images/guest-user.jpg"
                            }
                            alt=""
                          />
                          <p>
                            Created by <strong>{events.userName}</strong>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center mt-4 mb-4">
                  <img
                    src="https://www.iconpacks.net/icons/1/free-calendar-icon-865-thumb.png"
                    width={"130px"}
                    alt=""
                  />
                  <p>No past events.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupEvents;
