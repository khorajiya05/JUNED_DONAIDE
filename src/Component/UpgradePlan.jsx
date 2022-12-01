import { Component } from "react";
import { connect } from 'react-redux';
import UserService from "../Services/UserServices";
import MembershipService from "../Services/MemberShipService";
import Payment from "../Component/Payment";
import Header from '../Component/Header';

import { AdminHeader } from "./admin-header";
import SideBar from "../Component/SideBar/index";


class UpgradePlan extends Component {
  constructor() {
    super();
    // Step5
    this.validateSelectPlan = this.validateSelectPlan.bind(this);
    this.selectedradiovalue = this.selectedradiovalue.bind(this);
    // this.upgradePlan = this.upgradePlan.bind(this);

    this.state = {

      // Step5
      selectedplan: "",
      checkedRadioID: "",
      selectedplansubmitted: false,
      allMembershipData: [],
      allUserDetails: [],

      // Common Use
      errors: {},
      borderColorCss: "",
      path: "",
      isPayment: false,
      email: "",
      firstname: "",
      membershipID: "",
      Leftside: true,
    };
  }

  componentDidMount() {
    this.getMembershipData()
    this.getUserDetails()
  }

  async getMembershipData() {
    const res = await MembershipService.getAllMemberShip()
    const data = res.data

    const options = data.map(d => ({
      "_id": d._id,
      "memberShipName": d.memberShipName,
      "monthlyPrice": d.monthlyPrice,
      "noOfCommunity": d.noOfCommunity,
      "availablefeatures": d.availableFeatures
    }))
    this.setState({ allMembershipData: options })

  }

  async getUserDetails() {
    // const userid = localStorage.getItem("userID");
    const userid = this.props?.UserID
    const res = await UserService.getUserDetailsByUserID(userid)
    const data = res.data
    this.state.email = data.email;
    this.state.firstname = data.firstName;
    this.state.membershipID = data.membershipID;

    this.setState({ allUserDetails: data })
      ;
  }

  selectedradiovalue(e) {
    this.setState({ selectedplan: e.target.value });
  }

  validateSelectPlan(e) {

    let errors = {};
    // this.state.membershipID
    if (!this.state.selectedplan) {
      errors["selectedPlan"] = "Please select any one plan.";
    }
    else {
      errors = {};
      // this.upgradePlan();
      this.setState({ isPayment: true });
    }

    this.setState({ errors: errors });
  }


  Data() {
    this.setState({ Leftside: !this.state.Leftside });
  }

  render() {

    return (
      <div>
        {
          !this.state.isPayment ?
            (
              <div>
                {window.location.href.split('/')[3] === "upgrade-plan" ?
                  <><AdminHeader /><SideBar /></>
                  : <Header />}
                <div className="right-sidebar">
                  <main className="get-started-bg">
                    <div className="main-outer-container">
                      <div className="main-inner-container text-center">
                        <div className="inner-container-form">
                          <div className="inner-content-height">
                            <h3 className="main-heading">Start building your community in 5 simple steps</h3>
                            {/* Start Main Content section */}
                            <form id="msform">
                              {/* progressbar */}
                              <ul id="progressbar">
                                <li className="active" />
                                <li className="active" />
                                <li className="active" />
                                <li className="active" />
                                <li className="active" />
                              </ul>

                              {/* progressbar */}
                              {/* fieldsets */}
                              <div className="field-set-outer-box">
                                <fieldset className="inner-data">
                                  <h4 className="main-sub-heading text-center">
                                    Choose your plan now and start building your community{this.state.membershipID}
                                  </h4>
                                  <div className="form-group field-set-form">
                                    <div className="community-plan-accordion" id="selectcommunityplan">

                                      {this.state.allMembershipData.map((data) => (
                                        <div className="card" key={data?._id}>
                                          <label htmlFor={"customRadio1" + data._id}>
                                            <div className="card-header">
                                              <div className="custom-control custom-radio">

                                                <div className="plan-card-header">

                                                  <input
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={"#collapse" + data._id}
                                                    type="radio"
                                                    id={"customRadio1" + data._id}

                                                    name="customRadio"
                                                    value={data._id}
                                                    defaultChecked={this.state.selectedplan !== "" ? this.state.selectedplan : data._id === this.state.membershipID}
                                                    // checked={this.state.selectedplan!=="" ? this.state.selectedplan: data._id===this.state.membershipID}
                                                    className="form-check-input"
                                                    onChange={(e) => this.setState({ selectedplan: e.target.value })}
                                                  />
                                                  <label className="custom-control-label" htmlFor="customRadio1">
                                                    <sup>$</sup>
                                                    {data.monthlyPrice}
                                                    <span>/month</span>
                                                  </label>

                                                </div>

                                                <div className="card-header-prg">
                                                  <p>{data.noOfCommunity} site</p>
                                                </div>

                                              </div>
                                            </div>
                                          </label>
                                          <div
                                            id={"collapse" + data._id}
                                            className="collapse"
                                            data-bs-parent="#selectcommunityplan"
                                          >
                                            <div className="card-body">
                                              <p>
                                                <i className="fa fa-check" aria-hidden="true" /> {data.noOfCommunity} {data.availablefeatures}.
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                      )}
                                      <span style={{ color: "red" }}>{this.state.errors["selectedPlan"]}</span>
                                    </div>
                                  </div>
                                  <div className="text-end">
                                    <input
                                      type="button"
                                      className="btn tmplt-btn Btn-fill"
                                      defaultValue="Upgrade Plan" onClick={this.validateSelectPlan}
                                    />
                                  </div>
                                </fieldset>
                              </div>
                            </form>
                          </div>
                          {/* End Main Content section */}
                        </div>
                      </div>
                    </div>
                  </main>
                </div>
              </div>
            ) : (
              <Payment email={this.state.email} firstname={this.state.firstname} currency="USD" membershipID={this.state.selectedplan} type="UpgradePlan" />
            )
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    RoleID: state?.auth?.loginData?.RoleID || "",
    UserID: state?.auth?.loginData?.UserID || ""
  }
}

export default connect(mapStateToProps)(UpgradePlan)