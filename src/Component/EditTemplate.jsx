import React, { useState } from "react";

import { Editabletemplateheader } from "./EditTemplateHeader";
import { Link, useLocation } from "react-router-dom";
import Modal from "react-modal";
import CommunityService from "../Services/CommunityService";
import { useEffect } from "react";
import MainsectionComp from "../Component/EditTemplate/Mainsection";
import CommunitygroupComp from "../Component/EditTemplate/Communitygroup";
import FootersectionComp from "../Component/EditTemplate/Footersection";
import AboutUsComp from "../Component/EditTemplate//AboutUs";
import DefaultFirstSection from "../Component/EditTemplate/DefaultTemplate/DefaultFirstSection";
import DefaultSecondSection from "../Component/EditTemplate/DefaultTemplate/DefaultSecSection";
import DefaultThirdSection from "../Component/EditTemplate/DefaultTemplate/DefaultThirdSection";
import DefaultFourthSection from "../Component/EditTemplate/DefaultTemplate/DefaultFourthSection";
import UpdateFirstSection from "../Component/EditTemplate/UpdateEditTempComps/UpdateFirstSection";
import UpdateSecSection from "../Component/EditTemplate/UpdateEditTempComps/UpdateSecSection";
import UpdateThirdSection from "../Component/EditTemplate/UpdateEditTempComps/UpdateThirdSection";
import UpdateFourthSection from "../Component/EditTemplate/UpdateEditTempComps/UpdateFourthSection";
import { useDispatch, useSelector } from "react-redux";
import { getCommunityDataBySiteId } from "../ReduxStore/Actions/communityAction";
import { v4 as uuid } from "uuid";
import { IMAGE_BASE_URL } from "../Config";
// import data from "../http-Common";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Congratulation = () => {

  const { UserID } = useSelector((state) => state.auth?.loginData);

  const [logoImg, setLogoImg] = useState(null);
  const [selectedLogoImg, setSelectedLogoImg] = useState(null);
  const [imageForUpload, setImageForUpload] = useState(null);
  const [allCommunityData, setAllCommunityData] = useState([]);
  const [buisnessName, setBuisnessName] = useState("");
  const [buisnessNameView, setBuisnessNameView] = useState("");
  const [comHeadLoader, setComHeadLoader] = useState(false);
  const [text, setText] = useState("");
  const [URL, setURL] = useState("");
  const [UpdatebuttonHide, setUpdatebuttonHide] = useState(true);
  const [indexForMenuItem, setIndexForMenuItem] = useState("");
  const [renderComp, setRenderComp] = useState(0);
  const [defaultTemplateData, setDefaultTemplateData] = useState([]);
  const [sectionDataLoader, setSectionDataLoader] = useState(false);
  const [sectionData, setSectionData] = useState([]);
  const [isExists, setIsExists] = useState(false);
  const [addListItem, setAddListItem] = useState([]);

  const dispatch = useDispatch();
  const allReducers = useSelector((state) => state.openEditorReducer);


  const search = useLocation().search;

  let siteID = localStorage.getItem("siteIDs");

  const getSiteID = new URLSearchParams(search).get("id");

  localStorage.setItem("paramsSiteID", getSiteID);
  siteID = getSiteID !== null ? getSiteID : siteID;
  // To generate the unique id to track the every appended items in the MenuList
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);

  // To add the new menu item for community header
  const onAddMenuListHandler = (event) => {
    event.preventDefault();

    if (text === "") {
      return false;
    }
    setText("");
    addTodo(text);
  };

  // On file selection field from file input
  const changeHandler = (event) => {

    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (e) => {
      setSelectedLogoImg(global.URL.createObjectURL(event.target.files[0]));
      setImageForUpload(event.target.files[0]);
    };
  };
  console.log("I send in api:", imageForUpload);
  console.log("receive from api:", selectedLogoImg);

  //add todo list item
  const addTodo = (text) => {
    const menuItemID = small_id;

    if (addListItem === undefined || addListItem === null) {
      let copy = [...[]];
      copy = [...copy, { menuItemID, menuItemName: text, menuItemURL: URL }];

      setAddListItem(copy);
    } else {
      let copy = [...addListItem];
      copy = [...copy, { menuItemID, menuItemName: text, menuItemURL: URL }];

      setAddListItem(copy);
    }
  };

  const UpdateMenuListHandler = (event) => {
    event.preventDefault();
    if (text === "") {
      return false;
    }
    const oldData = addListItem?.filter((data, i) => i === indexForMenuItem);
    const dataFilter = addListItem?.filter((data, i) => i !== indexForMenuItem);

    const NewTodos1 = [
      ...dataFilter,
      {
        menuItemID: oldData[0].menuItemID,
        menuItemName: text,
        menuItemURL: oldData[0].menuItemURL,
      },
    ];

    setAddListItem(NewTodos1);

    setText("");
    setURL("");
    setIndexForMenuItem("");

    setUpdatebuttonHide(true);
  };

  const editItem = (data, index) => {
    setIndexForMenuItem(index);
    setText(data.menuItemName);
    setURL(data.menuItemURL);
    setUpdatebuttonHide(false);
  };

  const deleteItemCom = (e, index) => {
    e.preventDefault();

    const dataFilter = addListItem?.filter((data, i) => i !== index);

    setAddListItem(dataFilter);
  };

  // On file upload (click the upload button)
  const submitHandler = async (e) => {
    setAddListItem(allCommunityData.menuItemName);
    const formData = new FormData();
    formData.append("HeaderLogo", logoImg);
    console.log("f====", formData);
    if (allCommunityData.siteID === siteID) {
      const Updatecommunity = {
        // headerLogo: !logoImg ? allCommunityData.headerLogo : logoImg,
        headerLogo: imageForUpload ? imageForUpload : null,
        userID: UserID,
        siteID: getSiteID !== null ? getSiteID : siteID,
        buisnessName: !buisnessName
          ? allCommunityData.buisnessName
          : buisnessName,
        menuItemsStr: JSON.stringify(addListItem)
      };

      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      const res = await CommunityService.changeCommunityHeader(
        Updatecommunity,
        config
      );

      setLogoImg(res);
      // window.location.reload();
      setRenderComp(renderComp + 1);
      closeModal();
    } else {
      const community = {
        headerLogo: logoImg,
        userID: UserID,
        siteID: getSiteID !== null ? getSiteID : siteID,
        buisnessName: buisnessName,
        menuItems: addListItem,
      };
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      const res = await CommunityService.communityHeader(community, config);
      setLogoImg(res);
      // window.location.reload();
      setRenderComp(renderComp + 1);
      closeModal();
    }
  };


  /**
   * get all the community data api call
   */
  const getAllCommunityData = async () => {
    let userId = UserID;
    setComHeadLoader(true);
    const res = await CommunityService.getAllCommunityHeaderDetails(
      userId,
      getSiteID !== null ? getSiteID : siteID
    );
    setAllCommunityData(res.data);
    setLogoImg(res.data.headerLogo);
    setAddListItem(res.data.menuItems);
    setComHeadLoader(false);
  };

  useEffect(() => {
    dispatch(getCommunityDataBySiteId());
  }, []);

  /**
   * get communiti site detail by ID api call
   */
  let getCommuniSiteDetailsBySiteID = async () => {
    if (siteID !== null) {
      setSectionDataLoader(true);
      const getPublicSideUrl =
        await CommunityService.getCommunitySiteDetailsBySiteID(siteID);

      if (!getPublicSideUrl.data.hasOwnProperty("statusCode")) {
        setBuisnessName(
          getPublicSideUrl.data.communitySite[0].communitySiteName
        );
        setBuisnessNameView(
          getPublicSideUrl.data.communitySite[0].communitySiteName
        );
      }
      setSectionDataLoader(false);
    } else {
      if (allCommunityData.hasOwnProperty("buisnessName")) {
        if (allCommunityData.buisnessName !== null) {
          setBuisnessName(allCommunityData.buisnessName);
        } else {
          setSectionDataLoader(true);
          const getPublicSideUrl =
            await CommunityService.getCommunitySiteDetailsBySiteID(siteID);

          if (!getPublicSideUrl.data.hasOwnProperty("statusCode")) {
            setBuisnessName(
              getPublicSideUrl.data.communitySite[0].communitySiteName
            );
            setBuisnessNameView(
              getPublicSideUrl.data.communitySite[0].communitySiteName
            );
          }
          setSectionDataLoader(false);
        }
      } else {
        setSectionDataLoader(true);
        const getPublicSideUrl =
          await CommunityService.getCommunitySiteDetailsBySiteID(siteID);

        if (!getPublicSideUrl.data.hasOwnProperty("statusCode")) {
          setBuisnessName(
            getPublicSideUrl.data.communitySite[0].communitySiteName
          );
          setBuisnessNameView(
            getPublicSideUrl.data.communitySite[0].communitySiteName
          );
        }
        setSectionDataLoader(false);
      }
    }
  };

  useEffect(() => {
    getAllCommunityData();
    getCommuniSiteDetailsBySiteID();
    setBuisnessName(allCommunityData.buisnessName);
  }, [renderComp, allCommunityData.buisnessName]);

  //Add new code
  let firstTimeGetCommunityData = async (siteID) => {
    const res = await CommunityService.getCommunitySiteSection(siteID);

    if (res.data.length > 0) {
      let getFirstSecData = res.data.filter((value) => {
        if (value.order === 1) {
          return value;
        }
      });

      if (getFirstSecData.length !== 0) {
        localStorage.setItem("isExists", true);
      }
    }
  };

  const GetCommunitySiteSection = async () => {
    if (siteID !== null) {
      const res = await CommunityService.getCommunitySiteSection(siteID);
      if (res.data.length > 0) {
        let getFirstSecData = res.data.filter((value) => {
          if (value.order === 1) {
            return value;
          }
        });
        if (getFirstSecData.length !== 0) {
          localStorage.setItem("isExists", true);
        }
      }
    } else {
      firstTimeGetCommunityData(siteID);
    }
  };

  useEffect(() => {
    GetCommunitySiteSection();
  }, []);

  //End new code

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [editor, setToEditor] = useState(false);
  const [serviceList, setServiceList] = useState(1);
  const [modalIsOpen1, setIsOpen1] = React.useState(false);
  const [modalIsOpen2, setIsOpen2] = React.useState(false);
  const [modalIsOpen3, setIsOpen3] = React.useState(false);
  const [modalIsOpen4, setIsOpen4] = React.useState(false);
  const [modalIsOpen5, setIsOpen5] = React.useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [communitygroup, setCommunitygroup] = useState(false);
  const [mainSection, setMainsections] = useState(false);
  const [footersection, setFootersection] = useState(false);

  function openModal() {
    setRenderComp(renderComp + 1);
    setIsOpen(true);
  }

  function closeModal() {
    setRenderComp(renderComp + 1);
    setIsOpen(false);
    setSelectedLogoImg(null);
    setImageForUpload(null)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function deleteIcon(e) {
    setServiceList(serviceList.filter((serviceList) => e !== serviceList.id));
  }

  const AddedElement = () => (
    <Link to="#" className="btn ms-1 mb-2 me-1 tmplt-btn">
      <div
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Edit Button"
        className="section-edit-icon"
      ></div>
      <div
        className="section-dlt-icon"
        onClick={() => deleteIcon(serviceList.id)}
      ></div>
      Button
    </Link>
  );

  function openModal1() {
    setIsOpen1(true);
  }

  function closeModal1() {
    setIsOpen1(false);
  }

  function afterOpenModal1() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function openModal2() {
    setIsOpen2(true);
  }
  function closeModal2() {
    setIsOpen2(false);
  }

  function afterOpenModal2() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function openModal3() {
    setIsOpen3(true);
  }

  function closeModal3() {
    setIsOpen3(false);
  }

  function afterOpenModal3() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function openModal4() {
    setIsOpen4(true);
  }

  function closeModal4() {
    setIsOpen4(false);
  }

  function afterOpenModal3() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function openModal5() {
    setIsOpen5(true);
  }

  function closeModal5() {
    setIsOpen5(false);
  }

  function afterOpenModal5() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  let createSiteId = () => {
    if (siteID === null) {
      alert("Please create site id.");
    } else {
      setMainsections(true);
    }
  };

  return (
    <div>
      <Editabletemplateheader />
      <main className="get-started-bg">
        <div className="main-outer-container">
          <div className="main-inner-container">
            <div className="inner-container-template">
              <div className="inner-content-height">
                <Modal
                  isOpen={modalIsOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <div className="moda-dialogue-custom">
                    <div className="modal-header">
                      <h5 className="mb-0">Header section</h5>
                      <button className="modal-close-btn" onClick={closeModal}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                      </button>
                    </div>
                    <form>
                      <div className="modal-body">
                        <div className="upload-logo-edit-section">
                          <div className="upload-logo-button">
                            <h5>Upload Logo</h5>
                            <div className="cstm-logo-upld-btn">
                              <label
                                htmlFor="input-file"
                                className="upload-btn-logo"
                              >
                                <i
                                  className="fa fa-upload me-1 "
                                  aria-hidden="true"
                                ></i>{" "}
                                Upload Logo
                              </label>
                              <input
                                id="input-file"
                                type="file"
                                name="myFile"
                                onChange={changeHandler}
                              />
                            </div>
                          </div>
                          <div className="upload-logo-file-name">
                            {comHeadLoader ? (
                              <div
                                className="spinner-container"
                                style={{ height: "80px" }}
                              >
                                <div className="loading-spinner"></div>
                              </div>
                            ) : (
                              <img
                                src={(allCommunityData.headerLogo !== null || allCommunityData.headerLogo !== undefined) ? (selectedLogoImg ? selectedLogoImg : `${IMAGE_BASE_URL + allCommunityData.headerLogo}`) : `${process.env.PUBLIC_URL + "/Images/header_logo.png"}`}
                                alt=""
                                style={{ height: "50px", width: "50px" }}
                              />
                            )}
                          </div>
                        </div>
                        <div className="community-title-edit-section">
                          <div className="upload-menu-button">
                            <h5>Community Name</h5>
                          </div>
                          <input
                            className="form-control"
                            type="text"
                            name="community"
                            value={buisnessName ? buisnessName : ""}
                            onChange={(e) => setBuisnessName(e.target.value)}
                          />
                        </div>
                        <div className="menu-title-edit-section">
                          <div className="upload-menu-button">
                            <h5>Menu List</h5>
                            <div className="upload-menu-button-add-list">
                              <div className="row">
                                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
                                  <input
                                    className="form-control"
                                    placeholder="Enter List Name"
                                    type="text"
                                    value={text}
                                    id="menuList"
                                    onChange={(e) => setText(e.target.value)}
                                  />
                                </div>
                                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12">
                                  <input
                                    className="form-control"
                                    placeholder="Enter url"
                                    type="text"
                                    value={URL}
                                    id="menuList"
                                    onChange={(e) => setURL(e.target.value)}
                                  />
                                </div>
                                <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
                                  {UpdatebuttonHide === true ? (
                                    <button
                                      className="upload-btn-logo"
                                      onClick={onAddMenuListHandler}
                                    >
                                      <i
                                        className="fa fa-plus me-1 "
                                        aria-hidden="true"
                                      ></i>
                                      Add List
                                    </button>
                                  ) : (
                                    <button
                                      className="upload-btn-logo"
                                      onClick={UpdateMenuListHandler}
                                    >
                                      <i
                                        className="fa fa-plus me-1 "
                                        aria-hidden="true"
                                      ></i>
                                      Update List
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                            <br />
                          </div>
                          {addListItem?.map((data, index) => (
                            <div className="edit-template-menu-title">
                              <div
                                className="edit-title-menu"
                                key={data.menuItemID}
                              >
                                {data.menuItemName}
                              </div>
                              <div className="edit-title-menu-icons">
                                <i
                                  style={{ cursor: "pointer" }}
                                  className="fa fa-pencil-square-o"
                                  aria-hidden="true"
                                  onClick={() => editItem(data, index)}
                                ></i>

                                <i
                                  className="fa fa-trash"
                                  aria-hidden="true"
                                  onClick={(e) => deleteItemCom(e, index)}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button
                          type="button"
                          onClick={closeModal}
                          className="cancel-button"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="save-button"
                          onClick={submitHandler}
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </Modal>

                <Modal
                  isOpen={modalIsOpen1}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <div className="moda-dialogue-custom">
                    <div className="modal-header">
                      <h5 className="mb-0">Are you sure?</h5>
                      <button className="modal-close-btn" onClick={closeModal1}>
                        <i className="fa fa-times" aria-hidden="true"></i>
                      </button>
                    </div>
                    <form>
                      <div className="modal-body p-0">
                        <div className="menu-title-edit-section py-3">
                          <div className="text-center">
                            <h6 className="px-2">hello</h6>
                          </div>
                        </div>
                      </div>

                      <div className="modal-footer">
                        <button
                          type="button"
                          onClick={closeModal1}
                          className="save-button"
                        >
                          Cancel
                        </button>
                        <button type="button" className="cancel-button">
                          Delete
                        </button>
                      </div>
                    </form>
                  </div>
                </Modal>

                <nav
                  className={`navbar navbar-expand-md  template-navbr-edit ${window.location.href.split("/")[3] ===
                    `preview?id=${siteID}`
                    ? ""
                    : "edit-sec"
                    } shadow`}
                  onClick={() => allReducers.openPreviewEditCompStatus ? "" : openModal()}
                  id="top-template-nav-header"
                >
                  <a className="navbar-brand">
                    {comHeadLoader ? (
                      <div
                        className="spinner-container "
                        style={{ height: "80px" }}
                      >
                        <div className="loading-spinner"></div>
                      </div>
                    ) : (
                      <img
                        src={
                          allCommunityData.headerLogo !== undefined
                            ? allCommunityData.headerLogo !== null
                              ? `${IMAGE_BASE_URL + allCommunityData.headerLogo}`
                              : process.env.PUBLIC_URL +
                              "/Images/header_logo.png"
                            : process.env.PUBLIC_URL + "/Images/header_logo.png"
                        }
                        width={100}
                        alt="logo"
                      />
                    )}
                  </a>

                  <span className="community-name-header">
                    {allCommunityData.hasOwnProperty("buisnessName")
                      ? allCommunityData.buisnessName !== null
                        ? allCommunityData.buisnessName
                        : buisnessNameView !== ""
                          ? buisnessNameView
                          : "Community Name"
                      : buisnessNameView !== ""
                        ? buisnessNameView
                        : "Community Name"}
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
                      {allCommunityData.hasOwnProperty("menuItems")
                        ? allCommunityData.menuItems !== null
                          ? allCommunityData?.menuItems?.map((data) => (
                            <li className="nav-item " key={data.menuItemName}>
                              <a className="nav-link">{data.menuItemName}</a>
                            </li>
                          ))
                          : ""
                        : ""}
                    </ul>
                  </div>
                </nav>

                {sectionDataLoader ? (
                  <div className="spinner-container">
                    <div className="loading-spinner"></div>
                  </div>
                ) : (
                  <div>
                    <div
                      className="section-edit-icon"
                      onClick={() => createSiteId()}
                    ></div>

                    {allReducers.openFirstEditorStatus ? (
                      <MainsectionComp data={setMainsections} />
                    ) : !localStorage.getItem("isExists") ? (
                      <DefaultFirstSection />
                    ) : (
                      <UpdateFirstSection />
                    )}
                  </div>
                )}

                {sectionDataLoader ? (
                  <div className="spinner-container">
                    <div className="loading-spinner"></div>
                  </div>
                ) : (
                  <div className="">
                    {allReducers.openSecEditorStatus ? (
                      <AboutUsComp dataabout={setToEditor} />
                    ) : (
                      <>
                        {!localStorage.getItem("isExistsAbout") ? (
                          <DefaultSecondSection />
                        ) : (
                          <UpdateSecSection />
                        )}
                      </>
                    )}
                  </div>
                )}

                {sectionDataLoader ? (
                  <div className="spinner-container">
                    <div className="loading-spinner"></div>
                  </div>
                ) : (
                  <div className="">
                    {allReducers.openThirdEditorStatus ? (
                      <CommunitygroupComp datacomunity={setCommunitygroup} />
                    ) : (
                      <>
                        {!localStorage.getItem("isExistsCommunity") ? (
                          <DefaultThirdSection />
                        ) : (
                          <UpdateThirdSection />
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>

              {sectionDataLoader ? (
                <div className="spinner-container">
                  <div className="loading-spinner"></div>
                </div>
              ) : (
                <div className="mb-2">
                  {allReducers.openFourthEditorStatus ? (
                    <FootersectionComp datafooter={setFootersection} />
                  ) : (
                    <>
                      {!localStorage.getItem("isExistsFooter") ? (
                        <DefaultFourthSection />
                      ) : (
                        <UpdateFourthSection />
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Congratulation;
