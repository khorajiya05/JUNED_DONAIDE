import { lazy } from "react";
let domain = window.location.href.split("/")[3]

export const publicRoutes = [
    {
        path: "/about-us",
        element: lazy(() => import("../Component/AboutUS"))
    },
    {
        path: "/contact-us",
        element: lazy(() => import("../Component/ContactUS"))
    },
    {
        path: "/join-group",
        element: lazy(() => import("../Component/JoinGroup"))
    },
    {
        path: "/",
        element: lazy(() => import("../Component/GetStarted"))
    },
    {
        path: "/forgotpassword",
        element: lazy(() => import("../Component/ForgotPassword"))
    },
    {
        path: "/resetpassword",
        element: lazy(() => import("../Component/ResetPassword"))
    },
    {
        path: "/onboarding",
        element: lazy(() => import("../Component/ContactInfo"))
    },
    {
        path: "/login",
        element: lazy(() => import("../Component/Login"))
    },
    // {
    //     path: `/${domain}`,
    //     element: lazy(() => import("../Component/ViewTemaplate"))
    // },
    // {
    //     path: "*",
    //     element: lazy(() => import("../Component/CommonComponents/Error"))
    // }
]

export const privateRoutes = [
    {
        path: "/congratulation",
        element: lazy(() => import("../Component/Congratulation"))
    },
    {
        path: "/payment",
        element: lazy(() => import("../Component/Payment"))
    },
    {
        path: "/admin-tools",
        element: lazy(() => import("../Component/admin-tools"))
    },
    {
        path: "/admin-group",
        element: lazy(() => import("../Component/Group/admin-group"))
    },
    {
        path: "/admin-group-media",
        element: lazy(() => import("../Component/Admin/AdminGroupMedia"))
    },
    {
        path: "/admin-group-detail",
        element: lazy(() => import("../Component/Group/admin-group-detail"))
    },
    {
        path: "/admin-group-events",
        element: lazy(() => import("../Component/Admin/AdminGroupEvent"))
    },
    {
        path: "/admin-help-support",
        element: lazy(() => import("../Component/Admin/HelpAndSupport"))
    },
    {
        path: "/termsandcondition",
        element: lazy(() => import("../Component/TermsAndCondition"))
    },
    {
        path: "/privacypolicy",
        element: lazy(() => import("../Component/PrivacyPolicy"))
    },
    {
        path: "/setting-progress",
        element: lazy(() => import("../Component/setting-progress"))
    },
    {
        path: "/edit/:name",
        element: lazy(() => import("../Component/EditTemplate"))
    },
    {
        path: "/dashboard",
        element: lazy(() => import("../Component/Dashboard"))
    },
    {
        path: "/tinymce",
        element: lazy(() => import("../Component/tinymce"))
    },
    {
        path: "/admindashboard",
        element: lazy(() => import("../Component/Admin-Dashboard"))
    },
    {
        path: "/communities",
        element: lazy(() => import("../Component/Template-Dashboard"))
    },
    {
        path: "/upgrade-plan",
        element: lazy(() => import("../Component/UpgradePlan"))
    },
    {
        path: "/create-community",
        element: lazy(() => import("../Component/CreateCommunity"))
    },
    {
        path: "/tinymce-about-us",
        element: lazy(() => import("../Component/tinymce-about-us"))
    },
    {
        path: "/preview",
        element: lazy(() => import("../Component/preview"))
    },
    {
        path: "/template",
        element: lazy(() => import("../Component/Template"))
    }

    , {
        path: "/tinymce-community-group",
        element: lazy(() => import("../Component/tinymce-community-group"))
    },
    {
        path: '/community-setting',
        element: lazy(() => import("../Component/Admin/AdminCommunity/CommunitySetting"))
    },
    {
        path: '/group-setting',
        element: lazy(() => import("../Component/Group/GroupSetting"))
    }

    , {
        path: "/tinymce-footer-section",
        element: lazy(() => import("../Component/tinymce-footer-section"))
    },
    {
        path: "/notification",
        element: lazy(() => import("../Component/Notifications"))
    },
    {
        path: "/Published",
        element: lazy(() => import("../Component/Published"))
    },
    {
        path: "/view-all-groups",
        element: lazy(() => import("../Component/ViewAllAdminGroups"))
    },
    {
        path: "/event-details",
        element: lazy(() => import("../Component/Group/GroupEventDetails"))
    },
    {
        path: "/vedio-player",
        element: lazy(() => import("../Component/VedioPlayer"))
    }

    , {
        path: "/member-view",
        element: lazy(() => import("../Component/Member/MemberView"))
    },
    {
        path: "/invite-member",
        element: lazy(() => import("../Component/Member/InviteMember"))
    },
    {
        path: "/permission",
        element: lazy(() => import("../Component/Admin/Permission"))
    },
    {
        path: "/role",
        element: lazy(() => import("../Component/Admin/Role"))
    },
    {
        path: "/owner-admin-list",
        element: lazy(() => import("../Component/OwerAdminList"))
    }
]