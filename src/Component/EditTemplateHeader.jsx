import React,{useState,useEffect} from "react";
// import Communitylogo from "../Assests/Images/community-logo.svg";
import logo from "../Assests/Images/Combo-logo.png";

import { Link, useLocation } from "react-router-dom";
import { previewEditTempView } from "../ReduxStore/Actions/openEditorActs";
import { useDispatch, useSelector } from "react-redux";
import UserService from "../Services/UserServices";
import CommunityService from "../Services/CommunityService";


export const Editabletemplateheader = ({
  showD = false,
  showP = false,
  showPub = false,
  showS = false,
}) => {
  let dispatch = useDispatch();
  const allReducers = useSelector((state) => state.openEditorReducer);
  const [sideDomain,setSideDomain] = useState(null)

  let siteID = localStorage.getItem("siteIDs");
  // let getSiteID =localStorage.getItem("communityID")
  const search = useLocation().search;
  const getSiteID = new URLSearchParams(search).get("id");

    siteID = getSiteID !== null ?  getSiteID : siteID;

  const sendEmail = () => {

    const emailDetails = {
      To: localStorage.getItem("email"),
      Type: "Published",
      Url:`https://donaide-prod-web.azurewebsites.net/${sideDomain}`

    }
    UserService.sendEmail(emailDetails)
      .then(mailResponse => {
        //alert("subscription")
        if (!mailResponse.status === "Accepted") {
          // error["Error"] = "Somthing went wrong.";
        }

      })
      .catch(e => {
        console.log(e);
      });
  }




  return (
    <div className="theme-header-2">
      <nav
        className="navbar navbar-expand-md shadow  fixed-top "
        id="top-admin-header"
      >
        <Link to={""} className="navbar-brand " href="/#">
          {/* <img src={Communitylogo} alt="Picture" /> */}
          <img src={logo} width={140} alt="logo" />
        </Link>
        <ul className="navbar-nav adm-header-nav ms-auto ">
        
          {!allReducers.openPreviewEditCompStatus ? (
            <>
              <li className="nav-item template-header-edit-btn">
                <Link
                  to="/admin-tools"
                  className="skip-template-btn"
                  showP={false}
                // onClick={() => dispatch(previewEditTempView(true))}
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item template-header-edit-btn">
                <Link
                  to={`/preview?id=${siteID}`}
                  className="skip-template-btn"
                  showP={false}
                  onClick={() => dispatch(previewEditTempView(true))}
                >
                  Preview
                </Link>
              </li>
            </>

          ) : (
            <>
              <li className="nav-item template-header-edit-btn">
                <Link
                  to="/communities"
                  className="skip-template-btn"
                  showP={false}
     
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item template-header-edit-btn">
                <Link
                  to={`/edit/:name?id=${siteID}`}
                  className="skip-template-btn"
                  showP={false}
                  onClick={() => dispatch(previewEditTempView(false))}
                >
                  Edit
                </Link>
              </li>
            </>
          )}
      
          <li className="nav-item template-header-edit-btn">
            <Link
              to="/setting-progress"
              className="edit-template-btn"
              showPub={false}
              onClick={sendEmail}
            >
              Publish
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Editabletemplateheader;
