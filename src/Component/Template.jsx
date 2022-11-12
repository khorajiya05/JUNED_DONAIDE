import React from "react";
import logo from "../Assests/Images/Logo.svg";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import { useState } from "react";
import { useEffect } from "react";
import TemplateHeader from "./Template-Header";
import CommunityService from "../Services/CommunityService";
import { useLocation } from "react-router";

const Congratulation = () => {
  const [sectionData, setSectionData] = useState([]);
  const [allCommunityData, setAllCommunityData] = useState([]);
  const [defaultTemplateData, setDefaultTemplateData] = useState([]);
  const [isExists, setIsExists] = useState(false);
  const [comHeadLoader, setComHeadLoader] = useState(false);
  const search = useLocation().search;
  const siteID1 = new URLSearchParams(search).get("id");
  localStorage.setItem("siteID", siteID1);

  useEffect(() => {
    GetAllDefaultSectionsTemplate();
  }, [defaultTemplateData._id]);

  const GetAllDefaultSectionsTemplate = async () => {
    const res = await CommunityService.getAllDefaultSectionsTemplate();
    setDefaultTemplateData(res.data);
  };

  useEffect(() => {
    GetCommunitySiteSection();
  }, [sectionData]);

  const GetCommunitySiteSection = async () => {
    const siteID = localStorage.getItem("siteID");
    const res = await CommunityService.getCommunitySiteSection(siteID);
    setSectionData(res.data);

    if (sectionData.length === 4) {
      setIsExists(true);
    }
  };

  const getAllCommunityData = async () => {
    let userId = localStorage.getItem("userID");
    let siteID = localStorage.getItem("siteID");
    setComHeadLoader(true);
    const res = await CommunityService.getAllCommunityHeaderDetails(
      userId,
      siteID
    );
    setAllCommunityData(res.data);
    setComHeadLoader(false);
  };

  useEffect(() => {
    getAllCommunityData();
  }, [allCommunityData.buisnessName]);



  return (
    <div>
      <TemplateHeader />
      <main className="get-started-bg">
        <div className="main-outer-container">
          <div className="main-inner-container">
            <div className="inner-container-template">
              <div className="inner-content-height">
                <nav
                  className="navbar navbar-expand-md  shadow"
                  id="top-template-nav-header"
                >
                  <a className="navbar-brand " href="/#">
                  {comHeadLoader? <div className="spinner-container">
                                <div className="loading-spinner"></div>
                              </div>: <img src={logo} width={100} alt="logo" />} 
                  </a>
                  <span className="community-name-header">Community Name</span>
                  <button
                    className="navbar-toggler "
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#tmplt-collapsibleNavbar"
                  >
                    <i className="fa fa-bars fa-1x" aria-hidden="true" />
                  </button>
                  <div
                    className="collapse navbar-collapse"
                    id="tmplt-collapsibleNavbar"
                  >
                    <ul className="navbar-nav get-started-links ms-auto ">
                      <li className="nav-item ">
                        <a className="nav-link" href="/#">
                          Contact Us
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/#">
                          Make a Donation
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>

                {!isExists
                  ? defaultTemplateData.map((data) => {
                      return (
                        <>
                          <section
                            key={data._id}
                            id={data._id}
                            dangerouslySetInnerHTML={{
                              __html: data.sectionContent,
                            }}
                          ></section>
                        </>
                      );
                    })
                  : sectionData.map((data) => {
                      return (
                        <>
                          <section
                            key={data.order}
                            id={data.order}
                            dangerouslySetInnerHTML={{ __html: data.html }}
                          ></section>
                        </>
                      );
                    })}
              </div>
              {/* <div className='tmplt-footer'>
                            <p className='m-0'>Copyright © 2022 Donaide. All rights reserved.</p>
                        </div> */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Congratulation;
