import React, { Component } from "react";
import UserService from "../Services/UserServices";
import CommunityService from "../Services/CommunityService";
import MembershipService from "../Services/MemberShipService";
import validator from "validator";
import Payment from "../Component/Payment";
import Congratulation from "../Component/Congratulation";
import Header from "../Component/Header";
import { Link, useNavigate as history } from "react-router-dom";

import { Tooltip } from "react-bootstrap";
import { OverlayTrigger } from "react-bootstrap";
export default class AddContactInfo extends Component {
  constructor() {
    super();

    // Step1
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePrivacyPolicy = this.onChangePrivacyPolicy.bind(this);
    this.validateContactInfo = this.validateContactInfo.bind(this);
    this.previousButtonContactInfo = this.previousButtonContactInfo.bind(this);

    // Step2
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.previousButtonPasswordInfo =
      this.previousButtonPasswordInfo.bind(this);
    this.validatePasswordInfo = this.validatePasswordInfo.bind(this);

    // Step3
    this.onChangeCommunityName = this.onChangeCommunityName.bind(this);
    this.onChangeCommunityURL = this.onChangeCommunityURL.bind(this);
    this.previousButtonCommunityInfo =
      this.previousButtonCommunityInfo.bind(this);
    this.validateCommunityInfo = this.validateCommunityInfo.bind(this);

    // Step4
    this.previousButtonCommunityLevel =
      this.previousButtonCommunityLevel.bind(this);
    this.validateCommunityLevel = this.validateCommunityLevel.bind(this);
    this.selectedfirstLevelValue = this.selectedfirstLevelValue.bind(this);
    this.selectedsecondLevelValue = this.selectedsecondLevelValue.bind(this);

    // Step5
    this.previousButtonSelectPlan = this.previousButtonSelectPlan.bind(this);
    this.validateSelectPlan = this.validateSelectPlan.bind(this);
    this.selectedradiovalue = this.selectedradiovalue.bind(this);

    // Final Step
    this.saveContactInfo = this.saveContactInfo.bind(this);
    this.saveCommunityInfo = this.saveCommunityInfo.bind(this);
    this.validatePhoneNumber = this.validatePhoneNumber.bind(this);
    this.getAllUserData = this.getAllUserData.bind(this);
    this.getAllCommunityData = this.getAllCommunityData.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.sendSubscriptionEmail = this.sendSubscriptionEmail.bind(this);
    this.passwordHideShow = this.passwordHideShow.bind(this);

    this.state = {
      // Step1
      userID: "",
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      contactsubmitted: false,
      isprivacypolicy: false,
      checked: false,
      roleid: null,

      // Step2
      password: "",
      confirmpassword: "",
      passwordsubmitted: false,

      // Step3
      communitysitename: "",
      communitydomain: "",

      communitysubmitted: false,

      // Step4
      allMembershipData: [],
      allUsers: [],
      allDomainName: [],

      firstLevelSelectOptions: [],
      secondLevelSelectOptions: [],
      firstlevel: "",
      firstlevelname: "",
      secondlevel: "",
      secondlevelname: "",
      communitylevelsubmitted: false,

      // Step5
      selectedplan: "",
      checkedRadioID: "",
      selectedplansubmitted: false,

      // Common Use
      errors: {},
      cssClass1: "",
      cssClass2: "",
      cssClass3: "",
      cssClass4: "",
      borderColorCss: "",
      path: "",
      isPayment: false,
      isValidMail: false,
      isCongratulation: false,
      setSiteID: "",
      CommunityData: {},
      passwordHideShow: false,
      confirmPasswordHideShow: false
    };
  }

  async getAllUserData() {
    const res = await MembershipService.getAllProfileDetails();
    const data = res.data;

    const options = data.map((d) => ({
      email: d.email,
    }));
    this.setState({ allUsers: options });
  }

  async getAllCommunityData() {
    const res = await CommunityService.getAllCommunityData();
    const data = res.data;

    const options1 = data.map((d) => ({
      communityDomain: d.communityDomain,
    }));
    this.setState({ allDomainName: options1 });
  }

  // Step1
  onChangeFirstName(e) {
    this.setState({
      firstname: e.target.value,
      errors: {},
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastname: e.target.value,
      errors: {},
    });
  }

  onChangePhone(e) {
    this.setState({
      phone: this.validatePhoneNumber(e.target.value),
      errors: {},
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,

      errors: {},
    });
  }

  onChangePrivacyPolicy(e) {
    this.setState({
      isprivacypolicy: e.target.checked,
      checked: e.target.checked,
      errors: {},
    });
  }

  validatePhoneNumber(value) {
    // if input value is falsy eg if the user deletes the input, then just return
    if (!value) return value;

    // clean the input for any non-digit values.
    const phoneNumber = value.replace(/[^\d]/g, "");

    // phoneNumberLength is used to know when to apply our formatting for the phone number
    const phoneNumberLength = phoneNumber.length;

    // we need to return the value with no formatting if its less then four digits
    // this is to avoid weird behavior that occurs if you  format the area code to early
    if (phoneNumberLength < 4) return phoneNumber;

    // if phoneNumberLength is greater than 4 and less the 7 we start to return
    // the formatted number
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }

    // finally, if the phoneNumberLength is greater then seven, we add the last
    // bit of formatting and return it.
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  }

  validateEmail(value) {
    const foundUser = this.state.allUsers.find(({ email }) => email === value);
    if (foundUser) {
      return false;
    } else {
      return true;
    }
  }

  validateDomain(value) {
    const domain = value + ".conation.io";
    const foundDomain = this.state.allDomainName.find(
      ({ communityDomain }) => communityDomain === domain
    );
    if (foundDomain) {
      return false;
    } else {
      return true;
    }
  }

  validateContactInfo() {
    let errors = {};

    let breakAfterDot = this.state.email.split('.')
    let afterDotStr = breakAfterDot[breakAfterDot.length - 1];
    let afterDotStrLen = breakAfterDot.length - 1;

    const afterDotEmailword = (this.state.email.match(new RegExp(afterDotStr, 'g')) || []).length;

    if (!this.state.firstname || this.state.firstname.trim() === "") {
      errors["firstname"] = "Please enter first name.";
    } else if (!this.state.lastname || this.state.lastname.trim() === "") {
      errors["lastname"] = "Please enter last name.";
    } else if (!this.state.phone) {
      errors["phonenumber"] = "Please enter phone number.";
    } else if (
      !/^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/i.test(this.state.phone)
    ) {
      errors["phonenumber"] = "Please enter valid phone number.";
    } else if (!this.state.email) {
      errors["email"] = "Please enter email.";
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)
    ) {
      errors["email"] = "Please enter valid email-id like(test@gmail.com)";
    } 
    // else if (
    //   afterDotStrLen > 1
    // ) {
    //   errors["email"] = "Please enter valid email-id like(test@gmail.com)";
    // }
     else if (!this.validateEmail(this.state.email)) {
      errors["email"] = "This email is already used.";
    } else if (this.state.isprivacypolicy === false) {
      errors["privacypolicy"] = "Please check privacy & policy checkbox.";
    } else {
      errors = {};
      this.state.contactsubmitted = true;
    }

    this.setState({ errors: errors });

    if (this.state.contactsubmitted) {
      this.state.cssClass1 = "active";
    }
  }

  previousButtonContactInfo() {
    let errors = {};

    var data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      phone: this.state.phone,
      email: this.state.email,
      isprivacypolicy: this.state.isprivacypolicy,
      createddate: new Date(),
      createdby: this.state.firstname,
      isactive: true,
      roleid: 3,
    };
    this.setState({ contactsubmitted: false });
    if (data.isprivacypolicy) {
      this.state.checked = true;
    }

    if (this.state.contactsubmitted) {
      this.state.cssClass1 = "";
    }

    this.setState({ errors: errors });
  }

  // Step2
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
      errors: {},
    });
  }

  onChangeConfirmPassword(e) {
    this.setState({
      confirmpassword: e.target.value,
      errors: {},
    });
  }

  validatePasswordInfo() {
    let errors = {};

    if (!this.state.password) {
      errors["password"] = "Please enter password.";
    } else if (
      !validator.isStrongPassword(this.state.password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      errors["password"] =
        "Please Enter Valid Password" +
        " (Minimum Lenght : 8" +
        " Mininum Lower Case Letters : 1" +
        " Minimum Upper Case Letters : 1" +
        " Minimum Numbers : 1" +
        " Minimum Symbols : 1)";
    } else if (this.state.password.length > 12) {
      errors["password"] = "Password max length should be 12";
    } else if (!this.state.confirmpassword) {
      errors["confirmpassword"] = "Please enter confirm password.";
    } else if (this.state.confirmpassword !== this.state.password) {
      errors["confirmpassword"] =
        "Confirm password is not matched with password.";
    } else {
      this.state.passwordsubmitted = true;
      errors = {};
    }

    this.setState({ errors: errors });

    if (this.state.passwordsubmitted) {
      this.state.cssClass2 = "active";
    }
  }

  previousButtonPasswordInfo() {
    let errors = {};
    this.state.passwordsubmitted = false;

    if (!this.state.passwordsubmitted) {
      this.state.cssClass2 = "";
    }

    this.setState({ errors: errors });
  }

  // Step3
  onChangeCommunityName(text) {
    const str = text;



    const separator = "-";

    const result = str.match(/[a-z]+|\d+/gi).join(separator);

    this.setState({
      communitysitename: text,
      communitydomain: str.match(/[a-z]+|\d+/gi).join(separator),
      errors: {},
    });
    this.setState({
      communitydomain: str.match(/[a-z]+|\d+/gi).join(separator),
    });
  }

  onChangeCommunityURL(text) {
    const str = text;

    const separator = "-";

    const result = str.match(/[a-z]+|\d+/gi).join(separator);



    this.setState({
      communitydomain: text.replace(/ /g, "-"),
      errors: {},
    });
  }

  validateCommunityInfo() {
    let errors = {};

    if (!this.state.communitysitename) {
      errors["communityname"] = "Please enter community name.";
    } else if (!this.state.communitydomain) {
      errors["communityurl"] = "Please enter community URL.";
    } else if (!/^[A-Z ]+/i.test(this.state.communitydomain)) {
      errors["communityurl"] = "Not allow spaces on community URL.";
    } else if (!this.validateDomain(this.state.communitydomain)) {
      errors["communityurl"] = "This domain name is already used.";
    } else {
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

    this.state.communitysubmitted = false;

    if (!this.state.communitysubmitted) {
      this.state.cssClass3 = "";
    }

    this.setState({ errors: errors });
  }

  // Step4

  // for bind dropdown
  async getFirstLevelOptions() {
    const res = await CommunityService.getAllFirstLevelLookUpData();
    const data = res.data;

    const options = data.map((d) => ({
      value: d._id,
      label: d.description,
    }));
    this.setState({ firstLevelSelectOptions: options });
  }

  async getSecondLevelOptions() {
    const res = await CommunityService.getAllSecondLevelLookUpData();
    const data = res.data;

    const options = data.map((d) => ({
      value: d._id,
      label: d.description,
    }));
    this.setState({ secondLevelSelectOptions: options });
  }

  componentDidMount() {
    this.getFirstLevelOptions();
    this.getSecondLevelOptions();
    this.getMembershipData();
    this.getAllUserData();
    this.getAllCommunityData();
  }

  selectedfirstLevelValue(e) {
    this.setState({
      firstlevelname: e.target.value,
      firstlevel: e.target.value,
      errors: {},
    });
  }

  selectedsecondLevelValue(e) {
    this.setState({
      secondlevelname: e.target.value,
      secondlevel: e.target.value,
      errors: {},
    });
  }

  validateCommunityLevel() {
    let errors = {};

    if (!this.state.firstlevelname || this.state.firstlevelname === "default") {
      errors["firstlevel"] = "Please select first level.";
    } else if (
      !this.state.secondlevelname ||
      this.state.secondlevelname === "default1"
    ) {
      errors["secondlevel"] = "Please select second level.";
    } else {
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
      secondlevel: this.state.secondlevel,
    };
    this.state.communitysubmitted = false;

    if (!this.state.communitysubmitted) {
      this.state.cssClass3 = "";
    }

    this.setState({ data: data });
  }

  // step5

  selectedradiovalue(e) {
    this.setState({ selectedplan: e.target.value });
  }

  validateSelectPlan(e) {
    let errors = {};

    if (!this.state.selectedplan) {
      errors["selectedPlan"] = "Please select any one plan.";
    } else {
      this.state.communitylevelsubmitted = true;
      this.state.checked = true;
      errors = {};
      this.saveContactInfo();

      if (this.state.selectedplan > "1") {
        this.state.isPayment = true;
        this.state.isCongratulation = false;
      } else {
        this.state.isCongratulation = true;
        this.state.isPayment = false;
      }
    }

    this.setState({ errors: errors });
  }

  previousButtonSelectPlan() {
    let errors = {};

    this.setState({
      communitylevelsubmitted: false
    })
    if (!this.state.communitylevelsubmitted) {

      this.setState({
        cssClass4: ""
      })
    }

    this.setState({ errors: errors });
  }

  // Final step
  saveContactInfo() {
    // this.state.path = "/congratulation";
    localStorage.clear();

    var createprofiledata = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      phone: this.state.phone,
      email: this.state.email,
      isprivacypolicy: this.state.isprivacypolicy,
      createddate: new Date(),
      createdby: this.state.firstname,
      isactive: true,
      password: this.state.password,
      roleid: 2,
      membershipid: this.state.selectedplan,
    };

    UserService.profileCreate(createprofiledata)
      .then((userResponse) => {
        this.setState({
          userID: userResponse.data.userID,
          firstname: userResponse.data.firstname,
          lastname: userResponse.data.lastname,
          phone: userResponse.data.phone,
          email: userResponse.data.email,
          isprivacypolicy: userResponse.data.isprivacypolicy,
          createddate: userResponse.data.createddate,
          createdby: userResponse.data.createdby,
          isactive: userResponse.data.isactive,
          roleid: userResponse.data.roleid,
        });

        this.saveCommunityInfo(userResponse.data.userId);


        localStorage.setItem("userID", userResponse.data.userId);
        localStorage.setItem("userName", userResponse.data.firstName);
        localStorage.setItem("roleID", userResponse.data.roleID);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  getCommuniSiteDetailsBySiteID = async (id) => {
    const getPublicSideUrl =
      await CommunityService.getCommunitySiteDetailsBySiteID(id);
    this.setState({
      CommunityData: getPublicSideUrl.data.communitySite
    })
  };

  saveCommunityInfo(userID) {
    this.state.userID = userID;
    var createcommunitydata = {
      userid: userID,
      communitysitename: this.state.communitysitename,
      communitydomain: this.state.communitydomain + ".conation.io",
      firstlevel: this.state.firstlevel,
      secondlevel: this.state.secondlevelname,
      createddate: new Date(),
      createdby: this.state.firstname,
      isactive: true,
    };

    // localStorage.setItem("CommunityName", this.state.communitysitename);

    CommunityService.communitySiteSetUp(createcommunitydata)
      .then((communityResponse) => {
        this.setState({ setSiteID: communityResponse.data.dat });

        localStorage.setItem("siteIDs", communityResponse.data.data);
        this.getCommuniSiteDetailsBySiteID(communityResponse.data.data)
      })
      .catch((e) => {
        console.log(e);
      });

    this.sendEmail();
    this.sendSubscriptionEmail();
  }



  //Common
  async getMembershipData() {
    const res = await MembershipService.getAllMemberShip();
    const data = res.data;

    const options = data.map((d) => ({
      _id: d._id,
      memberShipName: d.memberShipName,
      monthlyPrice: d.monthlyPrice,
      noOfCommunity: d.noOfCommunity,
      availablefeatures: d.availableFeatures,
    }));
    this.setState({ allMembershipData: options });

  }

  sendEmail() {
    let error = {};
    const emailName = this.state.firstname;
    const loginurl = "https://donaide-prod-web.azurewebsites.net/login";
    const emailDetails = {
      To: this.state.email,
      Name: this.state.firstname,
      Url: "https://donaide-prod-web.azurewebsites.net/login",
      Type: "Welcome",
    };

    UserService.sendEmail(emailDetails)
      .then((mailResponse) => {
        if (!mailResponse.status === "Accepted") {
          error["Error"] = "Somthing went wrong.";
        } else {
          if (this.state.isSuccess) {
            this.setState({ isPaymentSuccess: true });
          } else if (this.state.isFailed) {
            this.setState({ isPaymentSuccess: false });
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  sendSubscriptionEmail() {
    let error = {};
    localStorage.setItem("email", this.state.email);
    const emailDetails = {
      To: this.state.email,
      Type: "Subscription",
    };
    UserService.sendEmail(emailDetails)
      .then((mailResponse) => {
        if (!mailResponse.status === "Accepted") {
          error["Error"] = "Somthing went wrong.";
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  passwordHideShow(type){
    if(type === "password"){
      this.setState({passwordHideShow:!this.state.passwordHideShow})
    }else{
      this.setState({confirmPasswordHideShow:!this.state.confirmPasswordHideShow})
    }
  }

  render() {

    return (
      <div>
        <Header />
        {this.state.isPayment === false &&
          this.state.isCongratulation === false ? (
          <main className="get-started-bg">
            <div className="main-outer-container">
              <div className="main-inner-container text-center">
                <div className="inner-container-form mt-5">
                  <div className="inner-container-box custom-signup-form">
                    <h3 className="main-heading">
                      Start building your community in 5 simple steps
                    </h3>
                    {/* Start Main Content section */}
                    <form id="msform">
                      {/* progressbar */}
                      <ul id="progressbar">
                        <li className="active"><span>1</span></li>

                        <li className={this.state.cssClass1}><span>2</span></li>
                        <li className={this.state.cssClass2}><span>3</span></li>
                        <li className={this.state.cssClass3}><span>4</span></li>
                        <li className={this.state.cssClass4}><span>5</span></li>
                      </ul>
                      {/* progressbar */}
                      {/* fieldsets */}
                      <div className="field-set-outer-box">
                        {!this.state.contactsubmitted ? (
                          <fieldset className="inner-data">
                            <h4 className="main-sub-heading text-center">
                              What's your contact info?
                            </h4>
                            <div className="form-group field-set-form ">
                              <div className="form-group mb-3">
                                <input
                                  type="text"
                                  className="form-control cstm-field"
                                  placeholder="First Name"
                                  name="firstname}"
                                  value={this.state.firstname}
                                  onChange={this.onChangeFirstName}
                                />
                                <span style={{ color: "red" }}>
                                  {this.state.errors["firstname"]}
                                </span>
                              </div>

                              <div className="form-group mb-3">
                                <input
                                  type="text"
                                  className="form-control cstm-field"
                                  placeholder="Last Name"
                                  name="lastname"
                                  value={this.state.lastname}
                                  onChange={this.onChangeLastName}
                                />
                                <span style={{ color: "red" }}>
                                  {this.state.errors["lastname"]}
                                </span>
                              </div>
                              <div className="form-group mb-3">
                                <input
                                  type="text"
                                  className="form-control cstm-field"
                                  placeholder="Phone Number"
                                  name="phonenumber"
                                  value={this.state.phone}
                                  onChange={this.onChangePhone}
                                />
                                <span style={{ color: "red" }}>
                                  {this.state.errors["phonenumber"]}
                                </span>
                              </div>
                              <div className="form-group mb-3">
                                <input
                                  type="email"
                                  className="form-control cstm-field"
                                  placeholder="Email Address"
                                  name="email"
                                  value={this.state.email}
                                  onChange={this.onChangeEmail}
                                />
                                <span style={{ color: "red" }}>
                                  {this.state.errors["email"]}
                                </span>
                              </div>
                              <div className="term-condition-link">
                                <div>
                                  <label>
                                    <input
                                      type="checkbox"
                                      className="me-2"
                                      checked={this.state.checked}
                                      value={this.state.isprivacypolicy}
                                      onChange={this.onChangePrivacyPolicy}
                                    />
                                    I agree to the{" "}
                                    <Link
                                      to="/termsandcondition"
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      Terms and conditions
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                      to="/privacypolicy"
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      Privacy Policy
                                    </Link>{" "}
                                    of donaide plus.{" "}
                                  </label>
                                </div>
                                <span style={{ color: "red" }}>
                                  {this.state.errors["privacypolicy"]}
                                </span>
                              </div>
                            </div>

                            <div className="text-end">
                              <input
                                type="button"
                                name="next"
                                className="next btn next-button mb-3"
                                defaultValue="Next"
                                onClick={this.validateContactInfo}
                              />
                            </div>
                          </fieldset>
                        ) : !this.state.passwordsubmitted ? (
                          <fieldset className="inner-data">
                            <h4 className="main-sub-heading text-center">
                              Create your password
                            </h4>
                            <div className="form-group field-set-form">
                              <div className="form-group create-password-cstm mb-3">
                                <input
                                  type={this.state.passwordHideShow ?  "text" : "password"}
                                  data-toggle="tooltip"
                                  data-placement="right"
                                  title="Please Enter Valid Password
                                Use(Max Lenght : 8 
                                Mininum Lower Case Letters : 1 
                                Minimum Upper Case Letters : 1  
                                Minimum Numbers : 1  
                                Minimum Symbols : 1)"
                                  className="form-control cstm-field"
                                  placeholder="Password"
                                  name="password"
                                  value={this.state.password}
                                  onChange={this.onChangePassword}
                                />
                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip>
                                      Please Enter Valid Password Minimum Lenght
                                      : 8 Mininum Lower Case Letters : 1 Minimum
                                      Upper Case Letters : 1 Minimum Numbers : 1
                                      Minimum Symbols : 1
                                    </Tooltip>
                                  }
                                >
                                  {/* <i class="fa fa-eye" aria-hidden="true"></i> */}
                                  {
                                    this.state.passwordHideShow
                                      ?
                                      <i class="fa fa-eye" aria-hidden="true" onClick={() => this.passwordHideShow("password")}></i>
                                      :
                                      <i class="fa fa-eye-slash" aria-hidden="true" onClick={() => this.passwordHideShow("password")}></i>
                                  }
                                  {/* <i className="fa fa-info-circle"></i> */}

                                </OverlayTrigger>
                                <span style={{ color: "red" }}>
                                  {this.state.errors["password"]}{" "}
                                </span>
                              </div>
                              <div className="form-group create-password-cstm mb-3">
                                <input
                                  type={this.state.confirmPasswordHideShow ?  "text" : "password"}
                                  data-toggle="tooltip"
                                  data-placement="right"
                                  title="Confirm Password should be same as Password"
                                  className="form-control cstm-field"
                                  placeholder="Confirm Password"
                                  name="confirmpassword"
                                  value={this.state.confirmpassword}
                                  onChange={this.onChangeConfirmPassword}
                                />
                                <OverlayTrigger
                                  placement="top"
                                  overlay={
                                    <Tooltip>
                                      Please Enter Valid Password Minimum Lenght
                                      : 8 Mininum Lower Case Letters : 1 Minimum
                                      Upper Case Letters : 1 Minimum Numbers : 1
                                      Minimum Symbols : 1
                                    </Tooltip>
                                  }
                                >
                                  {/* <i className="fa fa-info-circle"></i> */}
                                  {
                                    this.state.confirmPasswordHideShow
                                      ?
                                      <i class="fa fa-eye" aria-hidden="true" onClick={() => this.passwordHideShow("confirmPassword")}></i>
                                      :
                                      <i class="fa fa-eye-slash" aria-hidden="true" onClick={() => this.passwordHideShow("confirmPassword")}></i>
                                  }
                                </OverlayTrigger>
                                <span style={{ color: "red" }}>
                                  {this.state.errors["confirmpassword"]}
                                </span>
                              </div>
                            </div>
                            <div className="text-end">
                              <input
                                type="button"
                                name="previous"
                                className="previous btn previous-button-border "
                                defaultValue="Previous"
                                onClick={this.previousButtonContactInfo}
                              />
                              <input
                                type="button"
                                name="next"
                                className="btn next next-button"
                                defaultValue="Next"
                                onClick={this.validatePasswordInfo}
                              />
                            </div>
                          </fieldset>
                        ) : !this.state.communitysubmitted ? (
                          <fieldset className="inner-data">
                            <h4 className="main-sub-heading text-center">
                              Create your community
                            </h4>

                            <div className="form-group field-set-form">
                              <div className="form-group mb-3">

                                <input
                                  type="text"
                                  className="form-control cstm-field"
                                  placeholder="Community Name"
                                  name="communityname"
                                  value={this.state.communitysitename}
                                  onChange={(e) =>
                                    this.setState({
                                      communitysitename: e.target.value,
                                      // errors: {},
                                      // communitydomain: e.target.value
                                      //   .match(/[a-z]+|\d+/gi)
                                      //   .join("-"),
                                    })
                                  }
                                  onMouseLeave={(e) => this.setState({
                                    communitydomain: e.target.value
                                      .match(/[a-z]+|\d+/gi)
                                      .join("-"),
                                  })}


                                />
                                <span style={{ color: "red" }}>
                                  {this.state.errors["communityname"]}
                                </span>
                              </div>
                              <div className="form-group mb-3 community-url-field">
                                <input
                                  type="text"
                                  className="form-control cstm-field"
                                  placeholder="Community URL"
                                  name="communityurl"
                                  value={this.state.communitydomain}
                                  onChange={(e) =>
                                    this.setState({
                                      communitydomain: e.target.value.replace(
                                        / /g,
                                        "-"
                                      ),
                                      errors: {},
                                    })
                                  }
                                />
                                <div className="cstm-url-field">
                                  conation.io
                                </div>
                                <span style={{ color: "red" }}>
                                  {this.state.errors["communityurl"]}
                                </span>
                              </div>
                            </div>
                            <div className="text-end">
                              <input
                                type="button"
                                name="previous"
                                className="previous btn previous-button-border"
                                defaultValue="Previous"
                                onClick={this.previousButtonPasswordInfo}
                              />
                              <input
                                type="button"
                                name="next"
                                className="btn next next-button"
                                defaultValue="Next"
                                onClick={this.validateCommunityInfo}
                              />
                            </div>
                          </fieldset>
                        ) : !this.state.communitylevelsubmitted ? (
                          <fieldset className="inner-data">
                            <h4 className="main-sub-heading text-center">
                              Choose your community category
                            </h4>

                            <div className="form-group field-set-form">
                              <div className="cstm-field-dropdown mb-3">
                                <div className="select text-left">
                                  <select
                                    className="select"
                                    value={this.state.firstlevelname}
                                    onChange={this.selectedfirstLevelValue}
                                  >
                                    <option value="default">
                                      Choose First Level
                                    </option>
                                    {this.state.firstLevelSelectOptions.map(
                                      (option) => (
                                        <option
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </option>
                                      )
                                    )}
                                  </select>
                                  <span style={{ color: "red" }}>
                                    {this.state.errors["firstlevel"]}
                                  </span>
                                </div>
                              </div>

                              <div className="cstm-field-dropdown mb-3">
                                <div className="select text-left">
                                  <select
                                    className="select"
                                    value={this.state.secondlevelname}
                                    onChange={this.selectedsecondLevelValue}
                                  >
                                    <option value="default1">
                                      Choose Second Level
                                    </option>
                                    {this.state.secondLevelSelectOptions.map(
                                      (option) => (
                                        <option
                                          key={option.value}
                                          value={option.value}
                                        >
                                          {option.label}
                                        </option>
                                      )
                                    )}
                                  </select>
                                  <span style={{ color: "red" }}>
                                    {this.state.errors["secondlevel"]}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="text-end">
                              <input
                                type="button"
                                name="previous"
                                className="previous btn previous-button-border"
                                defaultValue="Previous"
                                onClick={this.previousButtonCommunityLevel}
                              />
                              <input
                                type="button"
                                name="next"
                                className="btn next next-button"
                                defaultValue="Next"
                                onClick={this.validateCommunityLevel}
                              />
                            </div>
                          </fieldset>
                        ) : (
                          <fieldset className="inner-data">
                            <h4 className="main-sub-heading text-center">
                              Choose your plan now and start building your
                              community
                            </h4>
                            <div className="form-group field-set-form">
                              <div
                                className="community-plan-accordion"
                                id="selectcommunityplan"
                              >
                                {this.state.allMembershipData.map((data) => (
                                  <div className="card" key={data.id}>
                                    <label htmlFor={"customRadio1" + data._id}>
                                      <div className="card-header">
                                        <div className="custom-control custom-radio">
                                          <div className="plan-card-header">


                                            <input
                                              data-bs-toggle="collapse"
                                              data-bs-target={
                                                "#collapse" + data._id
                                              }
                                              type="radio"
                                              id={"customRadio1" + data._id}
                                              name="customRadio"
                                              value={data._id}
                                              className="form-check-input"
                                              onChange={this.selectedradiovalue}
                                            />
                                            <label
                                              className="custom-control-label"
                                              htmlFor="customRadio1"
                                            >
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
                                          <i
                                            className="fa fa-check"
                                            aria-hidden="true"
                                          />{" "}
                                          {data.noOfCommunity} with limited
                                          features.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                <span style={{ color: "red" }}>
                                  {this.state.errors["selectedPlan"]}
                                </span>
                              </div>
                            </div>
                            <div className="text-end">
                              <input
                                type="button"
                                name="previous"
                                className="previous btn previous-button-border"
                                defaultValue="Previous"
                                onClick={this.previousButtonSelectPlan}
                              />
                              <input
                                type="button"
                                name="button"
                                className="btn submit next-button"
                                defaultValue="Select Plan"
                                onClick={this.validateSelectPlan}
                              />
                            </div>
                          </fieldset>
                        )}
                      </div>
                    </form>
                  </div>
                  {/* End Main Content section */}
                </div>
              </div>
            </div>
          </main>
        ) : this.state.isCongratulation === true &&
          this.state.isPayment === false ? (
          <Congratulation />
        ) : (
          <Payment
            email={this.state.email}
            firstname={this.state.firstname}
            currency="USD"
            membershipID={this.state.selectedplan}
            type="NewSite"
            CommunityData={this.state.CommunityData}
          />
        )}
      </div>
    );
  }
}
