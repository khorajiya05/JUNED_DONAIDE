import React, { useState, useEffect } from "react";
import CommunityService from "../../../Services/CommunityService";
import { useDispatch, useSelector } from "react-redux";
import { openThirdEditorAct } from "../../../ReduxStore/Actions/openEditorActs";
import { useLocation } from "react-router-dom";

let UpdateThirdSection = () => {

  let [SectionThirdData, setThirdSecData] = useState([]);
  let dispatch = useDispatch();
  const allReducers = useSelector(state => state.openEditorReducer);
  const search = useLocation().search;


  let siteID = localStorage.getItem("siteIDs");

  const getSiteID = new URLSearchParams(search).get("id");

  
    siteID = getSiteID !== null ?  getSiteID : siteID;
  
  const GetCommunitySiteSection = async () => {

    const res = await CommunityService.getCommunitySiteSection(siteID);


    if (res.data.length > 0) {
      let getThirdSecData = res.data.filter((value) => {
        if (value.order === 3) {
          return value
        }
      })

      if (getThirdSecData.length !== 0) {
        setThirdSecData(getThirdSecData[0].html);
        // setIsExists(true);
        // localStorage.setItem("isExists", true);
      }
    }
  //   if (res.data[2].order === 3) {
  //     setThirdSecData(res.data[2].html);
  //     // setIsExists(true);
  //     localStorage.setItem("isExists", true);
  // }
  };

  useEffect(() => {
    GetCommunitySiteSection();
  }, [])

  let createSiteId = (status) => {

    if (localStorage.getItem("siteIDs") === null) {
      alert("Please create site id.")
    } else {
      dispatch(openThirdEditorAct(status))
      //  setMainsections(true)
    }

  }

  return (
    <div className="templateherobanner templateherobanner-edit delete-sec">
      <div
        // className={` ${allReducers.openPreviewEditCompStatus ? "" : "section-edit-icon"}`}
        onClick={() => createSiteId(true)}
      ></div>
      <section
        dangerouslySetInnerHTML={{
          __html: SectionThirdData,
          // __html: sectionData[2] !== undefined ? sectionData[2].html : defaultTemplateData[2].SectionContent,

        }}
      >
      </section>
    </div>
  )
}

export default UpdateThirdSection;
