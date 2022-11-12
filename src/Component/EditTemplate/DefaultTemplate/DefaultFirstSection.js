import React, { useState, useEffect } from "react";
import CommunityService from "../../../Services/CommunityService";
import { useDispatch, useSelector } from "react-redux";
import { openFirstEditorAct } from "../../../ReduxStore/Actions/openEditorActs"
import { useLocation } from "react-router-dom";

let DefaultFirstSection = () => {
    const [defaultFirstTemplateData, setDefaultFirstTemplateData] = useState([]);
    let dispatch = useDispatch();
    const allReducers = useSelector(state => state.openEditorReducer);
  
    const search = useLocation().search;


  let siteID = localStorage.getItem("siteIDs");

  const getSiteID = new URLSearchParams(search).get("id");

  
    siteID = getSiteID !== null ?  getSiteID : siteID;


    const GetAllDefaultSectionsTemplate = async () => {

        try{
            const res = await CommunityService.getAllDefaultSectionsTemplate();
    
           
            if(res.data[0]._id === 1){

                // localStorage.setItem("isExists",false)
                setDefaultFirstTemplateData(res.data[0].sectionContent);
            }
            
        }catch(error){
            console.log(error.message);

        }
       
    };

    useEffect(() => {
        GetAllDefaultSectionsTemplate();
    }, []);

    let createSiteId = (status) => {
        if (siteID === null) {
            alert("Please create site id.")
        } else {
            dispatch(openFirstEditorAct(status))
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
                    __html: defaultFirstTemplateData,
                }}
            ></section>
        </div>
    )
}



export default DefaultFirstSection;
