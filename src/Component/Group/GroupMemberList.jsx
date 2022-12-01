import React from "react";
import { useSelector } from "react-redux";
import { IMAGE_BASE_URL } from "../../Config";

const GroupMemberList = (props) => {
  
  const { groupMembersDetails ,permission} = props;
  const {RoleID} = useSelector((state) => state?.auth?.loginData);


  return (

    <div className="container-fluid admin-group-page bg-grey-wall">
      <div className="row justify-content-center mt-3  ">
        <div className="col-md-8">
          <div className="group-member-page-outer custom-group-member">
          {/* { permission&&permission.length>0 &&
                                permission.filter(
                                  (e) => e.permissionName === "Create Group"
                                ).length > 0 ? ( */}
            <ul className="group-member-lists ">
              {groupMembersDetails.length > 0 ? (
                <>
                  {groupMembersDetails.map((memberData, i) => (
                    <li key={i}>
                      <a href="#">
                        <img
                          src={
                            memberData.profilePicture
                              ? IMAGE_BASE_URL+memberData.profilePicture
                              : process.env.PUBLIC_URL +
                                " /Images/guest-user.jpg "
                          }
                          alt=""
                        />
                        <div className="notification-page-content">
                          <h5>
                            <span>
                              {memberData.firstName} {memberData.lastName} {RoleID===4?"Group Admin":""}
                            </span>
                          </h5>
                          <p>{memberData.email}</p>
                          {/* <p className="post-time">{memberData.notificationTime}</p> */}
                        </div>
                      </a>
                    </li>
                  ))}
                </>
              ) : (
                ""
              )}
            </ul>
      {/* )    :<h4 style={{textAlign:"center"}}>You do not have access to see the group  member</h4>    } */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupMemberList;
