import React from "react";
import logo from "../Assests/Images/Logo.svg";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import { useState } from "react";
import { useEffect } from "react";
import TemplateHeader from "./Template-Header";
import CommunityService from "../Services/CommunityService";
import { useLocation, useNavigate } from "react-router";
import DefaultThirdSection from "./EditTemplate/DefaultTemplate/DefaultThirdSection";
import UpdateThirdSection from "./EditTemplate/UpdateEditTempComps/UpdateThirdSection";

import GroupService from "../Services/GroupService";
const ViewTemplate = () => {
  alert("Web Public");
  const [sectionData, setSectionData] = useState([]);
  const [allCommunityData, setAllCommunityData] = useState({});
  const [defaultTemplateData, setDefaultTemplateData] = useState([]);
  const [isExists, setIsExists] = useState(false);
  let [mainSection, setMainSection] = useState(null)
  let [aboutSection, setAboutSection] = useState(null)
  let [CommuSection, setCommuSection] = useState(null)
  let [FooterSection, setFooterSection] = useState(null)
  
  const [userGroup, setUserGroup] = useState([]);
  let [DefaultmainSection, setDefaultMainSection] = useState(null)
  let [DefaultaboutSection, setDefaultAboutSection] = useState(null)
  let [DefaultCommuSection, setDefaultCommuSection] = useState(null)
  let [DefaultFooterSection, setDefaultFooterSection] = useState(null)

  const communityID = localStorage.getItem("communityID")
  const search = useLocation().search;
  const siteID1 = new URLSearchParams(search).get("id");
  localStorage.setItem("siteID", siteID1);
  let navigate = useNavigate()


  useEffect(() => {
    GetAllDefaultSectionsTemplate();
  }, [defaultTemplateData._id]);

  const GetAllDefaultSectionsTemplate = async () => {
    const res = await CommunityService.getAllDefaultSectionsTemplate();
    setDefaultTemplateData(res.data);

    res.data.map(value => {
      if (value._id === 1) {
        setDefaultMainSection(value.sectionContent);
      }
      if (value._id === 2) {
        setDefaultAboutSection(value.sectionContent);
      }
      if (value._id === 3) {
        setDefaultCommuSection(value.sectionContent);
      }
      if (value._id === 4) {
        setDefaultFooterSection(value.sectionContent);
      }
    })
    // setDefaultMainSection(res.data[0].sectionContent)
    // setDefaultAboutSection(res.data[1].sectionContent)
    // setDefaultCommuSection(res.data[2].sectionContent)
    // setDefaultFooterSection(res.data[3].sectionContent)
  };
 

  const GetCommunitySiteSection = async () => {
    const siteID = localStorage.getItem("siteIDs");
    const res = await CommunityService.getCommunitySiteSection(siteID);
   

    if (Array.isArray(res.data)) {

      res.data.map(value => {
        if (value.order === 1) {
          setMainSection(value.html);
        }
        if (value.order === 2) {
          setAboutSection(value.html);
        }
        if (value.order === 3) {
          setCommuSection(value.html);
        }
        if (value.order === 4) {
          setFooterSection(value.html);
        }
      })


      if (sectionData.length === 4) {
        setIsExists(true);
      }
    }

  };

  const getAllCommunityData = async () => {
    let userId = localStorage.getItem("userID");
    let siteID = localStorage.getItem("siteIDs");

    const res = await CommunityService.getAllCommunityHeaderDetails(
      userId,//userid
      siteID//side-id
    );
    if (!res.data.hasOwnProperty("status")) {
      setAllCommunityData(res.data);
    }


  };

  useEffect(() => {
    getAllCommunityData();
  }, [allCommunityData.buisnessName]);

  const state = {
    responsive: {
      0: {
        items: 1,
      },
      450: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  };



  return (
    <div>
      <main className="get-started-bg">
        <div className="inner-container-template m-0">
          <div className="inner-content-height">
            <nav
              className="navbar navbar-expand-md mt-0 shadow"
              id="top-template-nav-header"
            >
              <a className="navbar-brand " href="/#">
                {/* <img src={
                  allCommunityData.hasOwnProperty("headerLogo")
                    ?
                    allCommunityData.headerLogo !== null
                      ? allCommunityData.headerLogo
                      : logo : logo
                }
                  width={100} alt="logo" /> */}
                <img src={
                  allCommunityData.headerLogo !== undefined
                    ?
                    allCommunityData.headerLogo !== null ?
                      allCommunityData.headerLogo
                      : process.env.PUBLIC_URL + "/Images/header_logo.png"
                    : process.env.PUBLIC_URL + "/Images/header_logo.png"

                }
                  style={{ height: "50px", width: "50px" }} />
              </a>
              <span className="community-name-header">
                {
                  allCommunityData.hasOwnProperty("buisnessName")
                    ?
                    allCommunityData.buisnessName !== null
                      ? allCommunityData.buisnessName
                      : localStorage.getItem("CommunityName") !== undefined ? localStorage.getItem("CommunityName") : "Community Name" : localStorage.getItem("CommunityName") !== undefined ? localStorage.getItem("CommunityName") : "Community Name"
                }
              </span>
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
                  {
                    allCommunityData.hasOwnProperty("menuItems")
                      ?
                      allCommunityData.menuItems !== null
                        ? allCommunityData.menuItems.map(value => (
                          <>
                            <li className="nav-item" key={value.menuItemName}>
                              <a className="nav-link" href="/#">
                                {value.menuItemName}
                              </a>
                            </li>
                          </>
                        ))
                        :
                        ""
                  
                      :
                      ""
                 
                  }
                </ul>

              </div>
            </nav>

            {/* {!Array.isArray(sectionData) */}

            {/* {mainSection !== null
              ?
              <section id="editor-herobanner-first-bg"
                // key={mainSection.order}
                // id={mainSection.order}
                dangerouslySetInnerHTML={{ __html: mainSection }}
              ></section>
              :
              <section
                // key={data._id}
                // id={data._id}
                dangerouslySetInnerHTML={{
                  __html: DefaultmainSection,
                }}
              >
              </section>

            } */}

            {/* {aboutSection !== null
              ?
              <section id="editor-about-us-first-bg"
                // key={aboutSection.order}
                // id={aboutSection.order}
                dangerouslySetInnerHTML={{ __html: aboutSection }}
              ></section>
              :
              <section id="editor-about-us-first-bg"
                // key={data._id}
                // id={data._id}
                dangerouslySetInnerHTML={{
                  __html: DefaultaboutSection,
                }}
              >
              </section>

            } */}

            {/* {CommuSection !== null
              ?
              <DefaultThirdSection />
              :
              <DefaultThirdSection />

            } */}

            {/* <DefaultThirdSection />


            {FooterSection !== null
              ?
              <section
                // key={aboutSection.order}
                // id={aboutSection.order}
                dangerouslySetInnerHTML={{ __html: FooterSection }}
              ></section>
              :
              <section
                // key={data._id}
                // id={data._id}
                dangerouslySetInnerHTML={{
                  __html: DefaultFooterSection,
                }}
              >
              </section>

            } */}


            {/* {aboutSection !== null
              ?
              <section
                key={aboutSection.order}
                id={aboutSection.order}
                dangerouslySetInnerHTML={{ __html: aboutSection.html }}
              ></section>
              :
              DefaultaboutSection
            }

            {CommuSection !== null
              ?
              <section
                key={CommuSection.order}
                id={CommuSection.order}
                dangerouslySetInnerHTML={{ __html: CommuSection.html }}
              ></section>
              :
              DefaultCommuSection
            }

            {FooterSection !== null
              ?
              <section
                key={FooterSection.order}
                id={FooterSection.order}
                dangerouslySetInnerHTML={{ __html: FooterSection.html }}
              ></section>
              :
              <section
              key={DefaultFooterSection._id}
              id={DefaultFooterSection._id}
              dangerouslySetInnerHTML={{
                __html: DefaultFooterSection.sectionContent,
              }}
            ></section>
             
            } */}



            {/* {!Array.isArray(sectionData)
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
              : Array.isArray(sectionData) && sectionData.map((data) => {
                  return (
                    <>
                      <section
                        key={data.order}
                        id={data.order}
                        dangerouslySetInnerHTML={{ __html: data.html }}
                      ></section>
                    </>
                  );
                })} */}
          </div>
          {/* <div className='tmplt-footer'>
                            <p className='m-0'>Copyright © 2022 Donaide. All rights reserved.</p>
                        </div> */}
        </div>
      </main>
    </div>
  );
};

export default ViewTemplate;
