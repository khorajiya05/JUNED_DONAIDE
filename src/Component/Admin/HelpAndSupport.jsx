import React, { useState } from "react";
import { AdminHeader } from "../admin-header";
import { Link } from "react-router-dom";
import SideBar from "../SideBar/index";

const HelpAndSupport = () => {
  const [Leftside, setLeftside] = useState(true);
  const roleID = localStorage.getItem("roleID");
  function Data() {
    setLeftside(!Leftside);
  }
  return (
    <>
      <AdminHeader Sidebar={Data} />

      <main className="">
        <div className="main-outer-container">
          <div className="dashboard-outer-container">
            <div className="inner-container-template m-0">
              <div
                className={
                  Leftside
                    ? "dashboard-container "
                    : "dashboard-container active"
                }
              >
                <SideBar />

                <div className="right-sidebar">
                  <div className="inner-content-height">
                    <div className="admin-tools-menu ">
                      <div className="admin-tools-menu-heading">
                        <h3>
                        {roleID!=1&&
                          <Link to="/admin-tools">
                            <i
                              className="fa fa-long-arrow-left me-2"
                              aria-hidden="true"
                            ></i>
                          </Link>}
                          Help and Support
                        </h3>
                      </div>

                      <div className="rolespermission-inner-box mb-4">
                        <div class="accordion" id="accordionExample">
                          <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                              <button
                                class="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                              >
                                Accordion Item #1
                              </button>
                            </h2>
                            <div
                              id="collapseOne"
                              class="accordion-collapse collapse show"
                              aria-labelledby="headingOne"
                              data-bs-parent="#accordionExample"
                            >
                              <div class="accordion-body">
                                <strong>
                                  This is the first item's accordion body.
                                </strong>{" "}
                                It is shown by default, until the collapse
                                plugin adds the appropriate classes that we use
                                to style each element. These classes control the
                                overall appearance, as well as the showing and
                                hiding via CSS transitions. You can modify any
                                of this with custom CSS or overriding our
                                default variables. It's also worth noting that
                                just about any HTML can go within the{" "}
                                <code>.accordion-body</code>, though the
                                transition does limit overflow.
                              </div>
                            </div>
                          </div>
                          <div class="accordion-item">
                            <h2 class="accordion-header" id="headingTwo">
                              <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseTwo"
                              >
                                Accordion Item #2
                              </button>
                            </h2>
                            <div
                              id="collapseTwo"
                              class="accordion-collapse collapse"
                              aria-labelledby="headingTwo"
                              data-bs-parent="#accordionExample"
                            >
                              <div class="accordion-body">
                                <strong>
                                  This is the second item's accordion body.
                                </strong>{" "}
                                It is hidden by default, until the collapse
                                plugin adds the appropriate classes that we use
                                to style each element. These classes control the
                                overall appearance, as well as the showing and
                                hiding via CSS transitions. You can modify any
                                of this with custom CSS or overriding our
                                default variables. It's also worth noting that
                                just about any HTML can go within the{" "}
                                <code>.accordion-body</code>, though the
                                transition does limit overflow.
                              </div>
                            </div>
                          </div>
                          <div class="accordion-item">
                            <h2 class="accordion-header" id="headingThree">
                              <button
                                class="accordion-button collapsed"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseThree"
                                aria-expanded="false"
                                aria-controls="collapseThree"
                              >
                                Accordion Item #3
                              </button>
                            </h2>
                            <div
                              id="collapseThree"
                              class="accordion-collapse collapse"
                              aria-labelledby="headingThree"
                              data-bs-parent="#accordionExample"
                            >
                              <div class="accordion-body">
                                <strong>
                                  This is the third item's accordion body.
                                </strong>{" "}
                                It is hidden by default, until the collapse
                                plugin adds the appropriate classes that we use
                                to style each element. These classes control the
                                overall appearance, as well as the showing and
                                hiding via CSS transitions. You can modify any
                                of this with custom CSS or overriding our
                                default variables. It's also worth noting that
                                just about any HTML can go within the{" "}
                                <code>.accordion-body</code>, though the
                                transition does limit overflow.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tmplt-footer">
                    <p className="m-0">
                      Copyright © 2022 Donaide. All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default HelpAndSupport;
