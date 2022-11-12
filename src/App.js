import React from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

import GetStarted from "./Component/GetStarted";
import ContactInfo from "./Component/ContactInfo";
import Congratulation from "./Component/Congratulation";

import TermsAndCondition from "./Component/TermsAndCondition";
import PrivacyPolicy from "./Component/PrivacyPolicy";
import Login from "./Component/Login";
import Admintools from "./Component/admin-tools";
import Admingroup from "./Component/Group/admin-group";
import ForgotPassword from "./Component/ForgotPassword";
import ResetPassword from "./Component/ResetPassword";
import Settingprogress from "./Component/setting-progress";
import Payment from "./Component/Payment";
import Template from "./Component/Template";
import EditTemplate from "./Component/EditTemplate";
import Dashboard from "./Component/Dashboard";
import AdminDashboard from "./Component/Admin-Dashboard";
import TemplateDashboard from "./Component/Template-Dashboard";
import "owl.carousel/dist/assets/owl.carousel.css";
import TinyMce from "./Component/tinymce";
import "owl.carousel/dist/assets/owl.theme.default.css";
import UpgradePlan from "./Component/UpgradePlan";
import CreateCommunity from "./Component/CreateCommunity";
import AboutUsTinyMCE from "./Component/tinymce-about-us";
import CommunityGroupTinyMCE from "./Component/tinymce-community-group";
import FooterTinyMCE from "./Component/tinymce-footer-section";
import AdminGroupDetail from "./Component/Group/admin-group-detail";
import Preview from "./Component/preview";
import ViewTemplate from "./Component/ViewTemaplate";
import Published from "./Component/Published";
import ViewAllAdminGroup from "../src/Component/ViewAllAdminGroups";
import { JoinGroup } from "./Component/JoinGroup";
import VedioPlayer from "../src/Component/VedioPlayer";
import AdminGroupEvent from "./Component/Admin/AdminGroupEvent";
import MemberView from "./Component/Member/MemberView";
import InviteMember from "./Component/Member/InviteMember";
import Permission from "./Component/Admin/Permission";
import Role from './Component/Admin/Role'
import Notification from "./Component/Notifications";
import OwerAdminList from './Component/OwerAdminList'


import Error from "./Component/CommonComponents/Error";
import CommunitySetting from "./Component/Admin/AdminCommunity/CommunitySetting";
import GroupSetting from "./Component/Group/GroupSetting";
import PrivateRoute from './Component/CommonComponents/PrivateRoute';
import GroupEventDetails from './Component/Group/GroupEventDetails'
import AboutUS from "./Component/AboutUS";
import ContactUS from "./Component/ContactUS";
import AdminGroupMedia from './Component/Admin/AdminGroupMedia'
import HelpAndSupport from "./Component/Admin/HelpAndSupport";
import AppRouter from "./routes/AppRoutes";
let App = () => {


  // let domain = window.location.href.split("/")[3]


  return (
    <>
      <div className="App">
        <AppRouter />
      </div>
      <NotificationContainer />
    </>

  );
};

export default App;
