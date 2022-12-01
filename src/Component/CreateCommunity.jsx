import React from "react";
import Header from '../Component/Header';
import CommunityService from "../Services/CommunityService";
import Congratulation from '../Component/Congratulation';
import { connect } from "react-redux";
import { errorToast } from "./toast/toast";
import { getAllCommunityDataActionThunk } from "../ReduxStore/community/community.actions.async";
class AddContactInfo extends React.Component {

  constructor(props) {
    super(props);

    this.onChangeCommunityName = this.onChangeCommunityName.bind(this);
    this.onChangeCommunityURL = this.onChangeCommunityURL.bind(this);
    this.previousButtonCommunityInfo = this.previousButtonCommunityInfo.bind(this);
    this.validateCommunityInfo = this.validateCommunityInfo.bind(this);

    // Step4
    this.previousButtonCommunityLevel = this.previousButtonCommunityLevel.bind(this);
    this.validateCommunityLevel = this.validateCommunityLevel.bind(this);
    this.selectedfirstLevelValue = this.selectedfirstLevelValue.bind(this);
    this.selectedsecondLevelValue = this.selectedsecondLevelValue.bind(this);
    this.getAllCommunityData = this.getAllCommunityData.bind(this);
    this.saveCommunityInfo = this.saveCommunityInfo.bind(this);

    this.state = {

      // Step3
      communitysitename: "",
      communitydomain: "",
      communitysubmitted: false,
      errors: {},
      cssClass1: "",
      cssClass2: "",
      cssClass3: "",
      cssClass4: "",
      allDomainName: [],

      firstLevelSelectOptions: [],
      secondLevelSelectOptions: [],
      firstlevel: "",
      firstlevelname: "",
      secondlevel: "",
      secondlevelname: "",
      communitylevelsubmitted: false,
      userID: "",
      userName: "",
      CommunityData: {},
    };
  }

  validateDomain(value) {
    const domain = value + ".conation.io";
    const foundDomain = this.state.allDomainName.find(({ communityDomain }) => communityDomain === domain);
    if (foundDomain) {
      return false
    }
    else {
      return true;
    }
  }

  // Step3
  onChangeCommunityName(e) {
    const str = e.target.value;

    const separator = '-'

    const result = str.match(/[a-z]+|\d+/ig).join(separator)

    this.setState({
      communitysitename: e.target.value,
      communitydomain: result,
      errors: {}
    });
  }

  onChangeCommunityURL(e) {


    this.setState({
      communitydomain: e.target.value.replace(/ /g, '-'),

      errors: {}
    });
  }

  validateCommunityInfo() {
    let errors = {};

    if (!this.state.communitysitename) {
      errors["communityname"] = "Please enter community name.";
    }
    else if (!this.state.communitysitename) {
      errors["communityurl"] = "Please enter community URL.";
    }
    else {
      this.state.communitysubmitted = true;
      errors = {};
    }

    this.setState({ errors: errors });

    if (this.state.communitysubmitted) {
      this.state.cssClass3 = "active";
    }
  }

  previousButtonCommunityInfo() {
    let errors = {};
    this.state.communitysubmitted = false

    if (!this.state.communitysubmitted) {
      this.state.cssClass3 = "";
    }

    this.setState({ errors: errors });
  }

  async getFirstLevelOptions() {
    const res = await CommunityService.getAllFirstLevelLookUpData()
    const data = res.data

    const options = data.map(d => ({
      "value": d._id,
      "label": d.description
    }))
    this.setState({ firstLevelSelectOptions: options })
  }

  async getSecondLevelOptions() {
    const res = await CommunityService.getAllSecondLevelLookUpData()
    const data = res.data

    const options = data.map(d => ({
      "value": d._id,
      "label": d.description
    }))
    this.setState({ secondLevelSelectOptions: options })
  }

  componentDidMount() {
    this.getFirstLevelOptions()
    this.getSecondLevelOptions()
    this.getAllCommunityData()
  }

  async getAllCommunityData() {
    const res = await CommunityService.getAllCommunityData()
    const data = res.data

    const options1 = data.map(d => ({
      "communityDomain": d.communityDomain
    }))
    this.setState({ allDomainName: options1 })

  }

  selectedfirstLevelValue(e) {
    this.setState({ firstlevelname: e.target.value, firstlevel: e.target.value, errors: {} });

  }

  selectedsecondLevelValue(e) {
    this.setState({ secondlevelname: e.target.value, secondlevel: e.target.value, errors: {} });

  }

  validateCommunityLevel() {
    let errors = {};

    if (!this.state.firstlevelname || this.state.firstlevelname === "default") {
      errors["firstlevel"] = "Please select first level.";
    }
    else if (!this.state.secondlevelname || this.state.secondlevelname === "default1") {
      errors["secondlevel"] = "Please select second level.";
    }
    else {
      this.state.communitylevelsubmitted = true;
      errors = {};
    }

    this.setState({ errors: errors });

    if (this.state.communitylevelsubmitted) {
      this.state.cssClass4 = "active";
    }
  }

  previousButtonCommunityLevel() {
    var data = {
      firstlevelname: this.state.firstlevelname,
      firstlevel: this.state.firstlevel,
      secondlevelname: this.state.secondlevelname,
      secondlevel: this.state.secondlevel
    };
    this.state.communitysubmitted = false

    if (!this.state.communitysubmitted) {
      this.state.cssClass3 = "";
    }
    this.setState({ data: data });
  }

  getCommuniSiteDetailsBySiteID = async (id) => {
    const getPublicSideUrl =
      await CommunityService.getCommunitySiteDetailsBySiteID(id);
    this.setState({
      CommunityData: getPublicSideUrl.data.communitySite,
      communitylevelsubmitted: true
    })
  };

  saveCommunityInfo() {
    const userID = this.props?.UserID;
    const userName = this.props?.UserName;
    this.state.userID = userID;
    this.state.userName = userName;

    var createcommunitydata = {
      userid: userID,
      communitysitename: this.state.communitysitename,
      communitydomain: this.state.communitydomain + ".conation.io",
      firstlevel: this.state.firstlevel,
      secondlevel: 2,
      createddate: new Date(),
      createdby: userID,
      isactive: true,
    };
    CommunityService.communitySiteSetUp(createcommunitydata)
      .then(communityResponse => {
        if (communityResponse.data.status === "SUCCESS") {
          this.props.dispatch(getAllCommunityDataActionThunk());
          localStorage.setItem("lastCommunityID", communityResponse.data.data)
          this.getCommuniSiteDetailsBySiteID(communityResponse.data?.data)
        }
      })
      .catch(e => {
        console.log(e);
        errorToast("Something went wrong");
      });
  }

  render() {
    return (
      <div>
        {
          !this.state.communitysubmitted && !this.state.communitylevelsubmitted ?
            (
              <div>
                <Header />
                <main className="get-started-bg">
                  <div className="main-outer-container">
                    <div className="main-inner-container text-center">
                      <div className="inner-container-form">
                        <div className="inner-container-box">
                          <h3 className="main-heading">Start building your community in 5 simple steps</h3>
                          <form id="msform">
                            <ul id="progressbar">
                              <li className="active" />
                              <li className="active" />
                              <li className={this.state.cssClass3} />
                              <li className="" />
                              <li className="" />
                            </ul>
                            <div className="field-set-outer-box">
                              <fieldset className="inner-data">
                                <h4 className="main-sub-heading text-center">Create your community</h4>
                                <div className="form-group field-set-form">
                                  <div className="form-group mb-3">
                                    <input type="text" className="form-control cstm-field" placeholder="Community Name" name="communityname" value={this.state.communitysitename}
                                      onChange={this.onChangeCommunityName}
                                      id="commName" />
                                    <span style={{ color: "red" }}>{this.state.errors["communityname"]}</span>
                                  </div>
                                  <div className="form-group mb-3 community-url-field">
                                    <input type="text" className="form-control cstm-field" placeholder="Community URL" name="communityurl" value={this.state.communitydomain}
                                      onChange={this.onChangeCommunityURL}
                                    />
                                    <div className="cstm-url-field">conation.io</div>
                                    <span style={{ color: "red" }}>{this.state.errors["communityurl"]}</span>
                                  </div>
                                </div>
                                <div className="text-end">
                                  <input type="button" name="next" className="btn next next-button" defaultValue="Next" onClick={this.validateCommunityInfo} />
                                </div>
                              </fieldset>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            ) :
            (
              !this.state.communitylevelsubmitted && this.state.communitysubmitted ?
                (
                  <div>
                    <Header />
                    <main className="get-started-bg">
                      <div className="main-outer-container">
                        <div className="main-inner-container text-center">
                          <div className="inner-container-form">
                            <div className="inner-container-box">
                              <h3 className="main-heading">Start building your community in 5 simple steps</h3>
                              <form id="msform">
                                <ul id="progressbar">
                                  <li className="active" />
                                  <li className="active" />
                                  <li className={this.state.cssClass3} />
                                  <li className="" />
                                  <li className="" />
                                </ul>
                                <div className="field-set-outer-box">
                                  <fieldset className="inner-data">
                                    <h4 className="main-sub-heading text-center">Choose your community category</h4>
                                    <div className="form-group field-set-form">
                                      <div className="cstm-field-dropdown mb-3">
                                        <div className="select text-left">
                                          <select className="select" value={this.state.firstlevelname} onChange={this.selectedfirstLevelValue}>
                                            <option value="default">Choose First Level</option>
                                            {this.state.firstLevelSelectOptions.map((option) => (
                                              <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                          </select>
                                          <span style={{ color: "red" }}>{this.state.errors["firstlevel"]}</span>
                                        </div>
                                      </div>
                                      <div className="cstm-field-dropdown mb-3">
                                        <div className="select text-left">
                                          <select className="select" >
                                            <option value="default1">Choose Second Level</option>
                                            {this.state.secondLevelSelectOptions.map((option) => (
                                              <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                          </select>
                                          <span style={{ color: "red" }}>{this.state.errors["secondlevel"]}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-end">
                                      <input type="button" name="previous" className="previous btn previous-button-border" defaultValue="Previous" onClick={this.previousButtonCommunityLevel} />
                                      <input type="button" name="next" className="btn next next-button" defaultValue="Next" onClick={this.saveCommunityInfo} />
                                    </div>
                                  </fieldset>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </main>
                  </div>
                ) :
                (
                  <div>
                    {/* <Navigate to="/congratulation" replace={true} /> */}
                    <Congratulation type="CreateCommunity" CommunityData={this.state.CommunityData} />
                  </div>
                )
            )
        }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    UserName: state?.auth?.loginData?.UserName || "",
    UserID: state?.auth?.loginData?.UserID || ""
  }
}

export default connect(mapStateToProps)(AddContactInfo)