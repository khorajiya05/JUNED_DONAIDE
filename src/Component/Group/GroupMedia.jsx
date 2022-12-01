import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import CreateMediaPost from "./CreateMediaPost";
import FileViewer from "react-file-viewer";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { IMAGE_BASE_URL } from '../../Config'
const GroupMedia = (props) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const { groupPostData, fileName } = props;

  const [modalIsOpen, setIsOpen] = useState(false);

  const OpenModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {modalIsOpen && (
        <CreateMediaPost
          modalIsOpen={modalIsOpen}
          OpenModal={OpenModal}
          closeModal={closeModal}
        />
      )}
      <div className="row justify-content-center bg-grey-wall pt-4 pb-4 media-page">
        <div className="col-md-8">
          <div className="event-card  card-group-col Media-group custom-event">

            <div>
              <div className="group-tab-nav">
                <nav className="custom-nav-tab">
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                      className="nav-link active"
                      id="nav-home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#Photos"
                      type="button"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="true"
                    >
                      Photos
                    </button>
                    <button
                      className="nav-link"
                      id="nav-profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#Videos"
                      type="button"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                    >
                      Videos
                    </button>
                    <button
                      className="nav-link"
                      id="nav-profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#Doc"
                      type="button"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                    >
                      Documents
                    </button>
                  </div>
                </nav>

                <div className="tab-content text-center">
                  <div
                    className="tab-pane fade active show"
                    id="Photos"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <div className="ui-design-gallery">
                      <div className="row justify-content-start">
                        {groupPostData &&
                          groupPostData.length > 0 &&
                          groupPostData.map(
                            (data, index) =>
                              data.fileType && data.fileType === "Image" && (
                                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-6 mb-3" key={index}>
                                  <div className="group-img">
                                    <img
                                      src={
                                        data.postImageOrVedio
                                          ? `${IMAGE_BASE_URL + data.postImageOrVedio}`
                                          : ""
                                      }
                                      alt=""
                                      className="img-fluid"
                                    />
                                  </div>
                                </div>

                              )
                          )}
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="Videos"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <div className="ui-design-gallery">
                      <div className="row justify-content-start">
                        {groupPostData &&
                          groupPostData.length > 0 &&
                          groupPostData.map(
                            (data, index) =>
                              data.fileType && data.fileType === "Vedio" && (
                                <div className="col-md-3 mb-3" key={index}>
                                  <div className="video-play">
                                    <ReactPlayer
                                      className="react-player"
                                      url={
                                        data.postImageOrVedio
                                          ? `${IMAGE_BASE_URL + data.postImageOrVedio}`
                                          : ""
                                      }
                                      width="100%"
                                      height="100%"
                                      controls={true}
                                    />
                                  </div>
                                </div>
                              )
                          )}
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade"
                    id="Doc"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <div className="ui-design-gallery">
                      <div className="row ">
                        {groupPostData &&
                          groupPostData.length > 0 &&
                          groupPostData.map(
                            (data, index) =>
                              data.fileType && data.fileType === "Document" && (
                                <div className="col-md-4 mb-3 ">
                                  {data.fileName && data.fileName.length > 0 && data.fileName.split(".")[1] === "pdf" ? (
                                    <>
                                      <div className="docfile" key={index}>
                                        <i
                                          className="fa fa-file-pdf-o doc-icon"
                                          aria-hidden="true"
                                        ></i>
                                        <p>
                                          <a
                                            href={data.postImageOrVedio}
                                            download
                                          >
                                            {data.fileName}
                                          </a>
                                        </p>
                                      </div>
                                    </>
                                  ) : data.fileName && data.fileName.length > 0 && data.fileName.split(".")[1] === "docx" ? (
                                    <>

                                      <div className="docfile">
                                        <i
                                          className="fa fa-file-word-o doc-icon"
                                          aria-hidden="true"
                                        ></i>
                                        <p>
                                          <a href={data.postImageOrVedio} download>
                                            {data.fileName}
                                          </a>
                                        </p>
                                      </div>
                                    </>
                                  ) : data.fileName && data.fileName.length > 0 && data.fileName.split(".")[1] === "xlsx" ? (
                                    <div className="docfile">
                                      <i
                                        className="fa fa-file-text doc-icon"
                                        aria-hidden="true"
                                      ></i>
                                      <p>
                                        <a href={data.postImageOrVedio} download>
                                          {data.fileName}
                                        </a>
                                      </p>
                                    </div>
                                  ) : <div className="docfile">
                                    <i
                                      className="fa fa-file-o doc-icon"
                                      aria-hidden="true"
                                    ></i>
                                    <p>
                                      <a href={data.postImageOrVedio} download>
                                        {data.fileName}
                                      </a>
                                    </p>
                                  </div>}
                                </div>
                              )
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupMedia;
