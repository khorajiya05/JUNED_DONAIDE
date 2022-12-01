import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CommunityService from "../Services/CommunityService";
import { renderComponent } from "../ReduxStore/Actions/renderComponent";

export const Settingprogress = () => {

  let dispatch = useDispatch();
  const location = useLocation();

  let { renderCompReducer } = useSelector((state) => state);

  const { search } = location;
  const getSiteID = new URLSearchParams(search).get("id");
  let siteID = localStorage.getItem("siteIDs");

  // let siteIDs = localStorage.getItem("siteIDs");
  // let paramsSiteID = localStorage.getItem("paramsSiteID");
  let ID = getSiteID == null ? siteID : getSiteID;

  const [loading, setLoad] = useState(true);
  const [loadingDomain, setLoadDomain] = useState(false);
  const [userDomai, setUserDomai] = useState({});
  const [sideDomain, setSideDomain] = useState(null);

  let getCommuniSiteDetailsBySiteID = async () => {
    setLoadDomain(true)
    const getPublicSideUrl = await CommunityService.getCommunitySiteDetailsBySiteID(ID);
    if (getPublicSideUrl.status === 200) {
      setSideDomain((getPublicSideUrl.data?.communitySite || [])[0]?.communityDomain);
    }
    setLoadDomain(false)
  };

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 4000);
    getCommuniSiteDetailsBySiteID();
  }, []);

  return (
    <div>
      <main className="get-started-bg">
        {loading ? (
          <div className="main-inner-container text-center">
            <div className="inner-container-form">
              <div className="inner-container-box">
                <div className="setting-progress-box">
                  <img
                    src="Images/setting-progress-tick-icon.svg"
                    alt="Picture"
                  />
                  <h3>
                    Thank you for setting up an account. We love to have you and
                    we're excited for you to build your Community yay.
                  </h3>

                  <div className="system-gif">
                    <img src="Images/system-progress.gif" alt="Picture" />
                  </div>
                  <h4>Please wait till your community settings is complete.</h4>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="setting-prgrs-website-container">
              <div className="container">
                <div className="row justify-content-center min-vh-100 align-content-center">
                  <div className="col-xxl-6 col-xl-7 col-md-8 col-sm-12">
                    <div className="text-center w-100">
                      <img src="/Images/success.gif" className="text-center" />
                    </div>
                    <h2 className="text-center  ">Congratulations!</h2>
                    <h5 className="text-center mb-4">
                      Your site is published now
                    </h5>
                    <div className="URL-setting-visit field-set-form">
                      <input
                        type="text"
                        className="url-preview form-control cstm-field"
                        // value={`https://donaide-evmt-web.chetu.com/${sideDomain}`}
                        value={`https://donaide-evmt-stage-web.azurewebsites.net/${sideDomain}`}
                      />
                      <div
                        className="URL-setting-btns"
                        onClick={() => {
                          dispatch(
                            renderComponent(renderCompReducer.renderStatus + 1)
                          );
                        }}
                      >
                        {loadingDomain ? <div className="spinner-container">
                          <div className="loading-spinner"></div>
                        </div> : <Link
                          className="btn next next-button"
                          to={`/${sideDomain}`}
                          target="_blank"
                          rel="noreferrer"

                        >
                          Visit Now
                        </Link>}


                        <Link
                          to="/communities"
                          name="next"
                          className="btn next next-button"
                          value="Next"
                        >
                          Dashboard{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div >
  );
};

export default Settingprogress;
