import React, { useState, useEffect } from "react";
import CommunityService from "../../../Services/CommunityService";
import { useDispatch, useSelector } from "react-redux";
import { openFourthEditorAct } from "../../../ReduxStore/Actions/openEditorActs"
import { useLocation } from "react-router-dom";

let DefaultFourthSection = () => {
    const [defaultFourthTemplateData, setDefaultFourthTemplateData] = useState([]);
    let dispatch = useDispatch();
    const search = useLocation().search;
    let siteID = localStorage.getItem("siteIDs");

    const getSiteID = new URLSearchParams(search).get("id");
  
    
      siteID = getSiteID !== null ?  getSiteID : siteID;

    const GetAllDefaultSectionsTemplate = async () => {
        const res = await CommunityService.getAllDefaultSectionsTemplate();
        setDefaultFourthTemplateData(res.data[3].sectionContent);
    };

    useEffect(() => {
        GetAllDefaultSectionsTemplate();
    }, []);

    let createSiteId = (status) => {

        if (siteID === null) {
            alert("Please create site id.");
        } else {
            dispatch(openFourthEditorAct(status));
        }
    }

    return (
        <div className="templateherobanner templateherobanner-edit delete-sec">
            <div
             
                className={` ${window.location.href.split('/')[3] === `preview?id=${siteID}`? "" : "section-edit-icon"}`}
                onClick={() => createSiteId(true)}
            ></div>
            <section
                dangerouslySetInnerHTML={{
                    __html: defaultFourthTemplateData,
                }}
            ></section>
        </div>
    )
}

export default DefaultFourthSection;
