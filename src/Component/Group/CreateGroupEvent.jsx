import { useState } from "react";
import Modal from "react-modal";

import "react-datepicker/dist/react-datepicker.css";
import GroupService from "../../Services/GroupService";
import { useFormik } from "formik";
import { useLocation } from "react-router";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { renderComponent } from "../../ReduxStore/Actions/renderComponent";
import { useDispatch, useSelector } from "react-redux";
import { addAmPMInTime } from "../Helper/checkValidDomain";
import { IMAGE_BASE_URL } from "../../Config";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "auto",
    transform: "translate(-50%, -50%)",
  },
  errorStyle: {
    color: "red",
    fontSize: "14px",
  },
};
const CreateGroupEvent = (props) => {

  let dispatch = useDispatch();

  const {
    modalIsOpen,
    OpenModal,
    closeModal,
    isAdminSide,
    getCommunityGroupsWithCommunityDetails,
    siteID,
    event,
    setIsOpen
  } = props;
  const { profilePicture, firstName, profileId } = useSelector((state) => state?.profileData?.profileData);


  let { renderCompReducer } = useSelector((state) => state);

  const [coverImage, setCoverImage] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);


  const search = useLocation().search;
  const getGroupID = new URLSearchParams(search).get("groupID");

  let getUpcomEventsList = async () => {
    try {
      const res = await GroupService.getUpcomingEventsList(getGroupID);
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };
  const changeHandlerImage = (event) => {
    formik.setFieldValue("CoverImage", event.target.files[0])

    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      setCoverImage(URL.createObjectURL(event.target.files[0]));
      setSelectedImg(e.target.result);
    };
  };

  const formik = useFormik({
    initialValues: {
      eventName: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      address: "",
      groupID: "",
      CoverImage: "",
      siteID: "",
      userID: "",
    },
    onSubmit: async (values) => {
      try {
        let getStartTimeAmPm = await addAmPMInTime(values.startTime);
        let getEndTimeAmPm = await addAmPMInTime(values.endTime);
        values.startTime = `${values.startTime} ${getStartTimeAmPm}`;
        values.endTime = `${values.endTime} ${getEndTimeAmPm}`;
        values.groupID = getGroupID ? getGroupID : `${values.groupID}`;
        values.userID = profileId;
        values.siteID = siteID;
        values.address = `${values.address}`;
        const config = {
          headers: { "content-type": "multipart/form-data" },
        };


        const res = await GroupService.addEventDetails(values, config);

        if (res.data.statusCode === 200) {
          NotificationManager.success("Success message", res.data.message);
          getUpcomEventsList();
          setIsOpen(false)
          getCommunityGroupsWithCommunityDetails();
          closeModal();
          dispatch(renderComponent(renderCompReducer.renderStatus + 1));
        } else {
          NotificationManager.error("Error message", res.data.message);
        }
      } catch (error) {
        if (error.response.status === 500) {
          NotificationManager.error("Error message", error.message);
        } else {
          NotificationManager.error("Error message", error.response.message);
        }
      }
    },
    validate: (values) => {
      let errors = {};
      if (!values.eventName) {
        errors.eventName = "Event name is required.";
      }
      if (!values.startDate) {
        errors.startDate = "Start name is required.";
      }
      if (!values.startTime) {
        errors.startTime = "Start time is required.";
      }
      if (!values.endDate) {
        errors.endDate = "End date is required.";
      }
      if (!values.endTime) {
        errors.endTime = "End time is required.";
      }
      if (!values.address) {
        errors.address = "Event Address is required.";
      }
      return errors;
    },
  });

  return (
    <div>
      <Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onAfterOpen={OpenModal}
        contentLabel="Example Modal"
        backdrop="static"
        onRequestClose={closeModal}
      >
        <div className="moda-dialogue-custom">
          <form onSubmit={formik.handleSubmit}>
            <div className="modal-header">
              <h5 className="mb-0">Create Events</h5>

              <button className="modal-close-btn" onClick={closeModal}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </button>
            </div>
            <div className="modal-body-create-grp modal-bodycstm1">
              <div className="group-user mt-4">
                <img
                  src={profilePicture ? (IMAGE_BASE_URL + profilePicture) : process.env.PUBLIC_URL + " /Images/guest-user.jpg "}
                  alt="banner"
                  className="commentprofile  "
                />
                <div className="username">
                  <h3>{firstName || ""}</h3>
                  <p>Host Your Profile</p>
                </div>
              </div>
              <div className="create-event-from mt-4">
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <div className="modal-create-group-upld-img mb-3">
                      <div className="create-group-upld-img">
                        <label>
                          {coverImage === null
                            ? ""
                            : coverImage !== null && (
                              <div className="">
                                <img
                                  alt="not fount"
                                  width={"100%"}
                                  src={coverImage}
                                />
                                {/* <br /> */}
                                {/* {selectedImg} */}
                              </div>
                            )}
                          <input
                            type="file"
                            name="myImage"
                            accept="image/*"
                            value={formik.values.myImage}
                            onChange={(event) => {
                              changeHandlerImage(event);
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12 mb-3">

                    {isAdminSide && (<>
                      <label className="form-label">Groups</label>
                      <select
                        name="groupID"
                        value={formik.values.groupID}
                        onChange={formik.handleChange}
                        className="create-community"
                      >
                        <option value="default">Select Group</option>
                        {event && event.length > 0
                          ? event.map(
                            (item) =>
                              item.groupList &&
                              item.groupList.length > 0 &&
                              item.groupList.map((data, index) => (
                                <option value={data.groupID} key={index}>
                                  {data.groupName}
                                </option>
                              ))
                          )
                          : "Loding..."}
                      </select></>
                    )}
                  </div>
                  <div className="col-md-12 mb-3">
                    <label className="form-label">Event Name</label>
                    <input
                      type="text"
                      name="eventName"
                      value={formik.values.eventName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
                      placeholder="Enter event name"
                    />
                    {formik.touched.eventName && formik.errors.eventName ? (
                      <div style={customStyles.errorStyle}>
                        {formik.errors.eventName}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Start date</label>
                    <input
                      type="date"
                      name="startDate"
                      min={new Date().toISOString().split("T")[0]}
                      value={formik.values.startDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
                    />
                    {formik.touched.startDate && formik.errors.startDate ? (
                      <div style={customStyles.errorStyle}>
                        {formik.errors.startDate}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Start Time</label>
                    <input
                      className="form-control"
                      type="time"
                      name="startTime"
                      value={formik.values.startTime}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      minTime={"7:00am"}
                    />
                    {formik.touched.startTime && formik.errors.startTime ? (
                      <div style={customStyles.errorStyle}>
                        {formik.errors.startTime}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">End date</label>
                    <input
                      type="date"
                      name="endDate"
                      disabled={formik.values.startDate === "" ? true : false}
                      min={
                        formik.values.startDate
                          ? new Date(formik.values.startDate)
                            .toISOString()
                            .split("T")[0]
                          : ""
                      }
                      // onChange={handleChange}
                      value={formik.values.endDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
                    />
                    {formik.touched.endDate && formik.errors.endDate ? (
                      <div style={customStyles.errorStyle}>
                        {formik.errors.endDate}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">End Time</label>
                    <input
                      className="form-control"
                      type="time"
                      name="endTime"
                      value={formik.values.endTime}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={formik.values.startDate === "" ? true : false}
                      minTime={new Date().toISOString().split("T")[1]}
                    />
                    {formik.touched.endTime && formik.errors.endTime ? (
                      <div style={customStyles.errorStyle}>
                        {formik.errors.endTime}
                      </div>
                    ) : null}
                  </div>
                  <div className="col-md-12 mb-3">
                    <input
                      type="textarea"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control"
                      placeholder="Enter event address"
                    />
                    {formik.touched.address && formik.errors.address ? (
                      <div style={customStyles.errorStyle}>
                        {formik.errors.address}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={closeModal}
                className="cancel-button"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="save-button"
              // onClick={GroupFormValidation}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <NotificationContainer />
    </div>
  );
};

export default CreateGroupEvent;
