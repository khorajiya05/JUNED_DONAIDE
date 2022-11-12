import React from "react";

import { Link } from "react-router-dom";
import logo from "../Assests/Images/Combo-logo.png";
import { previewEditTempView } from "../ReduxStore/Actions/openEditorActs";
import {useDispatch,} from "react-redux";
export const Templateheader = () => {

  let dispatch = useDispatch();
  return (
    <div>
      <nav
        className="navbar navbar-expand-md shadow  fixed-top "
        id="top-admin-header"
      >
        <Link to={""} className="navbar-brand " href="/#">
          <img src={logo} width={140} alt="logo" />
        </Link>
        <ul className="navbar-nav adm-header-nav ms-auto ">
          <li className="nav-item template-header-edit-btn" onClick={()=>dispatch(previewEditTempView(false))}>
            <Link to="" className=" edit-template-btn">
              Edit
            </Link>
          </li>
          <li className="nav-item template-header-edit-btn">
            <Link to="/setting-progress" className=" edit-template-btn">
         
              Publish
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Templateheader;
