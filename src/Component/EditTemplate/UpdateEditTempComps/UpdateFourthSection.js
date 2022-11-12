import React, { useState, useEffect } from "react";
import CommunityService from "../../../Services/CommunityService";
import { useDispatch, useSelector } from "react-redux";
import { openFourthEditorAct } from "../../../ReduxStore/Actions/openEditorActs";
import { useLocation } from "react-router-dom";

let UpdateFourthSection = () => {

  let [SectionFourthData, setFourthSecData] = useState([]);
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
        if (value.order === 4) {
          return value
        }
      })

      if (getFirstSecData.length !== 0) {
        setFourthSecData(getFirstSecData[0].html);
        // setIsExists(true);
        localStorage.setItem("isExistsFooter", true);
      }else{
        localStorage.removeItem("isExistsFooter", false);

      }
    }
  }

  const GetCommunitySiteSection = async () => {

    if (siteID !== null) {
      const res = await CommunityService.getCommunitySiteSection(siteID);
    

      if (res.data.length > 0) {
        let getFirstSecData = res.data.filter((value) => {
          if (value.order === 4) {
            return value
          }
        })

        if (getFirstSecData.length !== 0) {
          setFourthSecData(getFirstSecData[0].html);
          // setIsExists(true);
          localStorage.setItem("isExistsFooter", true);
        }
      }else{
        localStorage.removeItem("isExistsFooter", false);

      }
    } else {
      firstTimeGetCommunityData(siteID)
      
    }

    // if (res.data[0].order === 1) {
    //   setFirstSecData(res.data[0].html);
    //   // setIsExists(true);
    //   localStorage.setItem("isExists", true);
    // }
  };

  useEffect(() => {
    GetCommunitySiteSection();
  }, [])

  // useEffect(() => {
  //   GetCommunitySiteSection();
  // }, [])

  let createSiteId = (status) => {

    if (siteID === null) {
      alert("Please create site id.")
    } else {
      dispatch(openFourthEditorAct(status))
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
      <section
        dangerouslySetInnerHTML={{
          __html: SectionFourthData,
          // __html: sectionData[3] !== undefined ? sectionData[3].html : defaultTemplateData[3].SectionContent,

        }}
      >
      </section>
    </div>
  )
}

export default UpdateFourthSection;
