import React, { useState, useEffect } from "react";
import CommunityService from "../../../Services/CommunityService";
import { useDispatch, useSelector } from "react-redux";
import { openThirdEditorAct } from "../../../ReduxStore/Actions/openEditorActs";
import { modalAct } from "../../../ReduxStore/Actions/modalActs";

import OwlCarousel from "react-owl-carousel";
import GroupService from "../../../Services/GroupService";
import { Link, useLocation } from "react-router-dom";
import { checkValidDomain } from "../../Helper/checkValidDomain";
import { isCursorAtEnd } from "@testing-library/user-event/dist/utils";
import AddGroupModal from "../../Group/joinGroupModal";
import { IMAGE_BASE_URL } from "../../../Config";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const state = {
  responsive: {
    0: {
      items: 1,
    },
    450: {
      items: 2,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 4,
    },
  },
};

let DefaultThirdSection = () => {
  const [defaultThirdTemplateData, setDefaultThirdTemplateData] = useState([]);
  let dispatch = useDispatch();
  const allReducers = useSelector((state) => state.openEditorReducer);
  const modalReducer = useSelector((state) => state.modalReducer);

  const search = useLocation().search;
  let pathname = useLocation().pathname;

  let siteID = localStorage.getItem("siteIDs");

  const getSiteID = new URLSearchParams(search).get("id");

  siteID = getSiteID !== null ? getSiteID : siteID;

  const GetAllDefaultSectionsTemplate = async () => {
    const res = await CommunityService.getAllDefaultSectionsTemplate();
    setDefaultThirdTemplateData(res?.data[2]?.sectionContent);
  };

  useEffect(() => {
    GetAllDefaultSectionsTemplate();
  }, []);

  let createSiteId = (status) => {
    if (localStorage.getItem("siteIDs") === null) {
      alert("Please create site id.");
    } else {
      dispatch(openThirdEditorAct(status));
    }
  };

  const [userGroup, setUserGroup] = useState([]);

  useEffect(() => {
    getAllGroupByCommunityID();
  }, []);

  const getAllGroupByCommunityID = async () => {
    const res = await GroupService.getAllGroupByCommunityID(siteID);
    if (res.data.data !== null) {
      setUserGroup(res.data);
    }
  };

  let openGroupModal = (groupID) => {
    dispatch(modalAct({ status: !modalReducer.status, groupId: groupID }));
  };

  return (
    <div className="templateherobanner templateherobanner-edit delete-sec">
      <div
        className={` ${allReducers.openPreviewEditCompStatus}`}
        onClick={() => createSiteId(true)}
      ></div>

      <div className="tmplt-community-group">
        <h3 className="border-0">Community Group</h3>

        <div className="view-all-adm-group-cards border-bottom-0">
          <div className="view-all-adm-group-container justify-content-center">
            {userGroup.length > 0 ? (
              userGroup.map((option, index) => (
                <>
                  <div
                    className="owl-cstm-item joinGroup joinGroup2"
                    key={index}
                  >
                    {checkValidDomain(window.location.href.split("/")[3]) ||
                      pathname === "/preview" ? (
                      ""
                    ) : (""
                      //   <button
                      //     type="button"
                      //     className="joinBtn joinbtn2 "
                      //     onClick={() => openGroupModal(option.groupID)}
                      //     style={{ cursor: "pointer" }}
                      //   >
                      //     Join Group
                      //   </button>
                    )}
                    <Link to="/admin-group-detail" className="item">
                      <img
                        src={
                          option.coverImage
                            ? `${IMAGE_BASE_URL + option.coverImage}`
                            : process.env.PUBLIC_URL + "/Images/Untitled.png"
                        }
                        alt="Picture"
                      />
                      <div className="group-type">
                        <p>{option.groupName}</p>
                      </div>
                    </Link>
                  </div>

                  <AddGroupModal />
                </>
              ))
            ) : (
              <>
                <div className="owl-cstm-item">
                  <Link to="/admin-group-detail" className="item">
                    <img src="../Images/community-edit-img.jpg" alt="Picture" />
                    <div className="group-type">
                      <p>Group Name Here</p>
                    </div>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        {pathname === "/preview" ? (
          ""
        ) : checkValidDomain(window.location.href.split("/")[3]) ? (
          ""
        ) : (
          <Link
            to="/admin-group"
            className="btn tmplt-btn Btn-fill custom-manage-button"
          >
            <i className="fa fa-plus me-2" aria-hidden="true"></i>Manage Group
          </Link>
        )}
      </div>
    </div>
  );
};

export default DefaultThirdSection;
