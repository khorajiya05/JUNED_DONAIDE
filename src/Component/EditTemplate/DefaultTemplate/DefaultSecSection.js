import React, { useState, useEffect } from "react";
import CommunityService from "../../../Services/CommunityService";
import { useDispatch } from "react-redux";
import { openSecEditorAct } from "../../../ReduxStore/Actions/openEditorActs";
import { useLocation } from "react-router-dom";

let DefaultSecondSection = () => {
  const [defaultSecTemplateData, setDefaultSecTemplateData] = useState([]);
  let dispatch = useDispatch();
  const search = useLocation().search;

  let siteID = localStorage.getItem("siteIDs");

  const getSiteID = new URLSearchParams(search).get("id");

  siteID = getSiteID !== null ? getSiteID : siteID;

  const GetAllDefaultSectionsTemplate = async () => {
    const res = await CommunityService.getAllDefaultSectionsTemplate();

    setDefaultSecTemplateData(res.data[1].sectionContent);
  };

  useEffect(() => {
    GetAllDefaultSectionsTemplate();
  }, []);

  let createSiteId = (status) => {
    if (siteID === null) {
      alert("Please create site id.");
    } else {
      dispatch(openSecEditorAct(status));
      //  setMainsections(true)
    }
  };

  return (
    // <div className="templateherobanner templateherobanner-edit delete-sec">
    <div className="templateherobanner templateherobanner-edit delete-sec">
      <div
        // className={` ${allReducers.openPreviewEditCompStatus ? "" : "section-edit-icon"}`}
        className={` ${
          window.location.href.split("/")[3] === `preview?id=${siteID}`
            ? ""
            : "section-edit-icon"
        }`}
        onClick={() => createSiteId(true)}
      ></div>
      <section
        dangerouslySetInnerHTML={{
          __html: defaultSecTemplateData,
        }}
      ></section>
    </div>
  );
};

export default DefaultSecondSection;
