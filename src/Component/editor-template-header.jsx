import React from "react";
import logo from "../Assests/Images/Combo-logo.png";
import {IMAGE_BASE_URL} from '../Config'


import { Link } from "react-router-dom";

export const Editortemplateheader = () => {
  return (
    <div className="theme-header">
      <nav
        className="navbar navbar-expand-md shadow  fixed-top "
        id="top-admin-header"
      >
        <Link to={""} className="navbar-brand " href="/#">
          <img src={`${IMAGE_BASE_URL+logo}`} width={140} alt="logo" />
        </Link>

        <ul className="navbar-nav adm-header-nav ms-auto ">
          <li className="nav-item template-header-edit-btn">
            <a href="./edit-template" className="skip-template-btn">
              Close
            </a>
          </li>
          <li className="nav-item template-header-edit-btn">
            <a href="./edit-template" className="edit-template-btn">
              Save
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Editortemplateheader;
