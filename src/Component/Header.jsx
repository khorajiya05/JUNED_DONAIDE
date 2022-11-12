import React from "react";
import logo from  "../Assests/Images/Combo-logo.png";
import { Link } from "react-router-dom";
export const Header = () => {
      return(
        <div className="container-xl container-lg coltainer-md container-sm container">
          <div className="row">
            <div className="col-md-12">
        <nav className="navbar navbar-expand-md custom-ui-header shadow mt-4" id="top-nav-header">
          <Link className="navbar-brand " to="/#">
            <img src={logo} width={140} alt="logo" />
          </Link>
          <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
             <i className="fa fa-bars fa-1x" aria-hidden="true" /> 
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav get-started-links ms-auto ">
              <li className="nav-item ">
                <Link className="nav-link" to="/#">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about-us">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact-us">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item d-flex align-items-center">
                <Link className="nav-link pe-0 Login-button" to="/login">
                  Login
                </Link>
                
                <Link className="nav-link ps-0 signup-button" to="/onboarding">
                  Signup
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        </div>
        </div>
        </div>
      )
  }
  
  export default Header;
