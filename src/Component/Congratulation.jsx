import { Link } from "react-router-dom";
import Award from "../Assests/Images/award.png";
export const Congratulation = (props) => {

  console.log(props);
  const siteDomain = (props?.CommunityData || [])[0]?.communityDomain;
  const type = props.type;

  return (
    <div>
      <main className="get-started-bg">
        {type === "CreateCommunity" ? (
          <div className="main-outer-container">
            <div className="curve-up"></div>
            <div className="award-image">
              <img src={Award} alt="congratulation" />
            </div>
            <div className="congratulation-box text-center">
              <h1 className="cong-heading">THANK YOU</h1>
              <h3>for create new site!</h3>
              <p>
                We love to have you and we're excited for you to build your
                Community
              </p>
              <Link
                to="/communities"
                type="button"
                name="next"
                className="btn  let-get-rock-btn"
              >
                Go To Dashboard
              </Link>
            </div>
          </div>
        ) : type === "UpgradePlan" ? (
          <div className="main-outer-container">
            <div className="curve-up"></div>
            <div className="award-image">
              <img src={Award} alt="congratulation" />
            </div>
            <div className="congratulation-box text-center">
              <h1 className="cong-heading">THANK YOU</h1>
              <h3>for upgrade your plan!</h3>
              <p>
                We love to have you and we're excited for you to build your
                Community
              </p>
              <Link
                to="/communities"
                type="button"
                name="next"
                className="btn  let-get-rock-btn"
              >
                Go To Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <div className="main-outer-container">
            <div className="curve-up"></div>
            <div className="award-image">
              <img src={Award} alt="congratulation" />
            </div>
            <div className="congratulation-box text-center">
              <h1 className="cong-heading">THANK YOU</h1>
              <h3>for setting up an account!</h3>
              <p>
                We love to have you and we're excited for you to build your
                Community
              </p>

              {props.CommunityData.map((item) => (
                <Link key={item.communityId}
                  to={`/${siteDomain}`}
                  target="_blank"
                  // to={
                  //   "/edit/" +
                  //   item.communitySiteName +
                  //   "?id=" +
                  //   item.communityId
                  // }
                  type="button"
                  name="next"
                  className="btn  let-get-rock-btn"
                >
                  Let's Get Rocking
                </Link>
              ))}
              {/* <Link to="/communities" type="button" name="next" className="btn  let-get-rock-btn">Let's Get Rocking</Link> */}
              {/* <Link to={"/edit"+props.communityUrl} type="button" name="next" className="btn  let-get-rock-btn">Let's Get Rocking</Link> */}
              {/* <Link to={"/edit"+props.communityUrl} type="button" name="next" className="btn  let-get-rock-btn">Let's Get Rocking</Link> */}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Congratulation;
