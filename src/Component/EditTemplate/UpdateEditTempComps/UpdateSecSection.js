import React, { useState, useEffect } from "react";
import CommunityService from "../../../Services/CommunityService";
import { useDispatch, useSelector } from "react-redux";
import { openSecEditorAct } from "../../../ReduxStore/Actions/openEditorActs"
import { useLocation } from "react-router-dom";

let UpdateSecSection = () => {

  let [SectionSecData, setSecondtSecData] = useState([]);
  let dispatch = useDispatch();
  const allReducers = useSelector(state => state.openEditorReducer);
   const search = useLocation().search;


  let siteID = localStorage.getItem("siteIDs");

  const getSiteID = new URLSearchParams(search).get("id");

  
    siteID = getSiteID !== null ?  getSiteID : siteID;

  

  let firstTimeGetCommunityData =async (siteID)=>{
    const res = await CommunityService.getCommunitySiteSection(siteID);

    if (res.data.length > 0) {
      let getFirstSecData = res.data.filter((value) => {
        if (value.order === 2) {
          return value
        }
      })

      if (getFirstSecData.length !== 0) {
        setSecondtSecData(getFirstSecData[0].html);
        // setIsExists(true);
        localStorage.setItem("isExists", true);
      }else{
        localStorage.removeItem("isExists", false);

      }
    }
  }
  const GetCommunitySiteSection = async () => {

    if (siteID !== null) {
      const res = await CommunityService.getCommunitySiteSection(siteID);
     

      if (res.data.length > 0) {
        let getFirstSecData = res.data.filter((value) => {
          if (value.order === 2) {
            return value
          }
        })

        if (getFirstSecData.length !== 0) {
          setSecondtSecData(getFirstSecData[0].html);
          // setIsExists(true);
          localStorage.setItem("isExistsAbout", true);
        }
      }else{
        localStorage.removeItem("isExistsAbout", false);

      }
    } else {
      firstTimeGetCommunityData(siteID)
      
    }
  }

    //end new code

  useEffect(() => {
    GetCommunitySiteSection();
  }, [])

  let createSiteId = (status) => {
    if (siteID === null) {
        alert("Please create site id.")
    } else {
      dispatch(openSecEditorAct(status))
      //  setMainsections(true)
    }

  }

  return (
    <div className="templateherobanner templateherobanner-edit delete-sec">
      <div
        // className={` ${allReducers.openPreviewEditCompStatus ? "" : "section-edit-icon"}`}
        className={` ${window.location.href.split('/')[3] === `preview?id=${siteID}`? "" : "section-edit-icon"}`}
        onClick={() => createSiteId(true)}
      ></div>

      <section id="editor-about-us-first-bg"
        dangerouslySetInnerHTML={{
          __html: SectionSecData,
        }}
      ></section>
    </div>
  )
}

export default UpdateSecSection;
