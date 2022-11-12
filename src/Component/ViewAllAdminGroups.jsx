import React from 'react';
import { AdminHeader } from './admin-header';
import SideBar from './SideBar/index';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import GroupService from "../Services/GroupService";
import {IMAGE_BASE_URL} from '../Config'
const ViewAllAdminGroup = () => {


    const [userGroup, setUserGroup] = useState([]);

    const search = useLocation().search;

    const getSiteID = new URLSearchParams(search).get("SiteID");
    const [Leftside, setLeftside] = useState(true);

    function Data() {
        setLeftside(!Leftside);
    }


    useEffect(() => {
        getAllGroupByCommunityID()
    }, []);

    const getAllGroupByCommunityID = async () => {
        const res = await GroupService.getAllGroupByCommunityID(getSiteID);
        if (res.data.data !== null) {
            if (res.data.length > 0) {
                setUserGroup(res.data);
            }
        }

    };

    return (
        <div>
            <AdminHeader />
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
                                        <div className="admin-group-page">
                                            <div className='adm-group-heading'>
                                                <h3><Link to="/admin-group"> <i className="fa fa-long-arrow-left me-2" aria-hidden="true"></i></Link>All Groups</h3>
                                                {/* <Link to="#" className="btn tmplt-btn"><i className="fa fa-plus me-2"
                                            aria-hidden="true"></i>Create</Link> */}
                                            </div>
                                            <div className="view-all-adm-group-cards">

                                                <div className="view-all-adm-group-container justify-content-center">

                                                    {userGroup.length > 0 ?
                                                        userGroup.map((option) => (
                                                            <div className='owl-cstm-item' key={option.groupName}>
                                                                <div className='item'>
                                                                    <img src={option.coverImage ?`${IMAGE_BASE_URL+option.coverImage}` : process.env.PUBLIC_URL + "/Images/Untitled.png"} alt="Picture" />
                                                                    <div className='group-type'>
                                                                        <p>{option.groupName}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )) :

                                                        ""
                                                    }
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ViewAllAdminGroup;
