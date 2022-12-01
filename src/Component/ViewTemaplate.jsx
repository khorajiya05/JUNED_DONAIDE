import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import CommunityService from "../Services/CommunityService";
import { useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import AddGroupModal from "./Group/joinGroupModal";
import { modalAct } from "../ReduxStore/Actions/modalActs";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_BASE_URL } from "../Config";
import { getAllCommunityDataActionThunk } from "../ReduxStore/community/community.actions.async";

const ViewTemplate = () => {

  let dispatch = useDispatch();
  let location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const { siteName } = params;
  let newLocation = location?.pathname?.split("/");
  const modalReducer = useSelector((state) => state.modalReducer);
  const { allCommunityData } = useSelector((state) => state?.community);

  const [defaultTemplateData, setDefaultTemplateData] = useState([]);
  const [communityGroup, setCommunityGroup] = useState([]);
  const [communitySiteSection, setCommunitySiteSection] = useState([]);
  const [communityHeader, setCommunityHeader] = useState({});
  let [DefaultmainSection, setDefaultMainSection] = useState(null);
  let [DefaultaboutSection, setDefaultAboutSection] = useState(null);
  let [DefaultGroupSection, setDefaultGropuSection] = useState(null);
  let [DefaultFooterSection, setDefaultFooterSection] = useState(null);

  let [firstSection, setFirstSection] = useState(null);
  let [aboutSection, setAboutSection] = useState(null);
  let [gropuSection, setGropuSection] = useState([]);
  let [FooterSection, setFooterSection] = useState(null);
  const [comHeadLoader, setComHeadLoader] = useState(false);
  const [comSectionLoader, setSectionHeadLoader] = useState(false);


  const GetAllDefaultSectionsTemplate = async () => {
    const res = await CommunityService.getAllDefaultSectionsTemplate();
    setDefaultTemplateData(res.data);
    res.data.map((value) => {
      if (value._id === 1) {
        setDefaultMainSection(value.sectionContent);
      }
      if (value._id === 2) {
        setDefaultAboutSection(value.sectionContent);
      }
      if (value._id === 3) {
        setDefaultGropuSection(value.sectionContent);
      }
      if (value._id === 4) {
        setDefaultFooterSection(value.sectionContent);
      }
    });
  };

  const getCommunitySiteSectionByDomain = async () => {
    const res = await CommunityService.getCommunitySiteSectionByDomain(
      newLocation[1]
    );
    setComHeadLoader(true);
    if (res.data.communityHeader) {
      setCommunityHeader(res.data.communityHeader);
    }
    setComHeadLoader(false);
    if (res.data.groupList) {
      setCommunityGroup(res.data.groupList);
    }
    if (res.data.siteSectionList) {
      setCommunitySiteSection(res.data.siteSectionList);
    }

    setSectionHeadLoader(true);
    if (Array.isArray(res.data.siteSectionList)) {
      res.data.siteSectionList.map((value) => {
        if (value.order === 1) {
          setFirstSection(value.html);
        }
        if (value.order === 2) {
          setAboutSection(value.html);
        }
        if (value.order === 4) {
          setFooterSection(value.html);
        }
      });
    }
    setSectionHeadLoader(false);
  };

  const openGroupModal = (groupID) => {
    dispatch(modalAct({ status: !modalReducer.status, groupId: groupID }));
  };

  useEffect(() => {
    GetAllDefaultSectionsTemplate();
  }, [defaultTemplateData._id]);

  useEffect(() => {
    getCommunitySiteSectionByDomain();
  }, []);

  useEffect(() => {
    if (allCommunityData === null || allCommunityData === undefined || allCommunityData === "") {
      dispatch(getAllCommunityDataActionThunk());
      return;
    }
    const isExistCommunity = allCommunityData?.findIndex((site) => site?.communityDomain === location.pathname?.split("/")[1]) > -1;
    if (!isExistCommunity) {
      Promise.resolve(dispatch(getAllCommunityDataActionThunk()))
        .then(() => {
          const isExistCommunity = allCommunityData?.findIndex((site) => site?.communityDomain === location.pathname?.split("/")[1]) > -1;
          if (!isExistCommunity) {
            navigate("/");
          }
        })
    }
  }, [allCommunityData, dispatch, navigate, siteName])

  console.log(location.pathname);
  return (
    <div>
      <main className="get-started-bg">
        <div className="inner-container-template m-0">
          <div className="inner-content-height p-0 m-0">
            <nav
              className="navbar navbar-expand-md mt-0 shadow"
              id="top-template-nav-header"
            >
              <a className="navbar-brand " href="/#">
                {comHeadLoader ? (
                  <div className="spinner-container">
                    <div className="loading-spinner"></div>
                  </div>
                ) : (
                  <img
                    src={
                      communityHeader.headerLogo
                        ? IMAGE_BASE_URL + communityHeader.headerLogo
                        : process.env.PUBLIC_URL + "/Images/header_logo.png"
                    }
                    alt=""
                    style={{ height: "50px", width: "50px" }}
                  />
                )}
              </a>
              <span className="community-name-header">
                {communityHeader.buisnessName
                  ? communityHeader.buisnessName
                  : localStorage.getItem("CommunityName")}
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
                  {communityHeader.menuItems
                    ? communityHeader.menuItems.map((value) => (
                      <>
                        <li className="nav-item" key={value.menuItemName}>
                          <Link
                            className="nav-link"
                            target="_blank"
                            to={`/${value.menuItemURL}`}
                          >
                            {value.menuItemName}
                          </Link>
                        </li>
                      </>
                    ))
                    : ""}
                </ul>
              </div>
            </nav>
            {comSectionLoader ? (
              <div className="spinner-container">
                <div className="loading-spinner"></div>
              </div>
            ) : (
              <>
                <div>
                  {firstSection !== null ? (
                    <section
                      id="editor-herobanner-first-bg"
                      dangerouslySetInnerHTML={{ __html: firstSection }}
                    ></section>
                  ) : (
                    <section
                      dangerouslySetInnerHTML={{
                        __html: DefaultmainSection,
                      }}
                    ></section>
                  )}
                </div>
                <div>
                  {aboutSection !== null ? (
                    <section
                      id="editor-about-us-first-bg"
                      dangerouslySetInnerHTML={{ __html: aboutSection }}
                    ></section>
                  ) : (
                    <section
                      id="editor-about-us-first-bg"
                      dangerouslySetInnerHTML={{
                        __html: DefaultaboutSection,
                      }}
                    ></section>
                  )}
                </div>

                <div className="text-align-center Group-section-main">
                  <h3 className="border-0">Community Group</h3>
                  <div className="Group-section">
                    {gropuSection !== null ? (
                      <>
                        {communityGroup &&
                          communityGroup.map((item) => (
                            <div
                              className="view-all-adm-group-container  col-md-3"
                              key={item.groupName}
                            >
                              <img
                                src={
                                  item.coverImage
                                    ? `${IMAGE_BASE_URL + item.coverImage}`
                                    : process.env.PUBLIC_URL +
                                    "/Images/Untitled.png"
                                }
                                alt=""
                              />

                              <p>{item.groupName}</p>
                              <button
                                type="button"
                                className="joinBtn joinbtn2 "
                                onClick={() => openGroupModal(item.groupID)}
                                style={{ cursor: "pointer" }}
                              >
                                Join Group
                              </button>
                              <AddGroupModal />
                            </div>
                          ))}
                      </>
                    ) : (
                      <section
                        id="editor-about-us-first-bg"
                        dangerouslySetInnerHTML={{
                          __html: DefaultGroupSection,
                        }}
                      ></section>
                    )}
                  </div>
                </div>
                <div>
                  {FooterSection !== null ? (
                    <section
                      dangerouslySetInnerHTML={{ __html: FooterSection }}
                    ></section>
                  ) : (
                    <section
                      dangerouslySetInnerHTML={{
                        __html: DefaultFooterSection,
                      }}
                    ></section>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewTemplate;
