import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import RoleAndPermissionService from "../../Services/RoleAndPermissionService";
import UserServices from "../../Services/UserServices";

// import {
//   NotificationContainer,
//   NotificationManager,
// } from "react-notifications";
import "react-notifications/lib/notifications.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  errorStyle: {
    color: "red",
  },
};

const ChangeRoleModal = (porps) => {
  const { showRoleModal, closeRoleModal } = porps;
  const roleID = localStorage.getItem("roleID");
  const userID = localStorage.getItem("userID");
  const [allRole, setAllRole] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const getAllRole = async () => {
    const res = await RoleAndPermissionService.getAllRole();
    if (res.data) {
      setAllRole(res.data);
    }
  };

  const GetUserProfileDataById = async () => {
    const res = await UserServices.GetUserProfileDataById(userID);
    if (res.data) {
     
      if(res.data){
      
        localStorage.setItem("roleID",res.data.roleID)
      }

    }
  };
  const changeUserRole = async (e) => {
    const roleID = e.target.value;

    const res = await UserServices.changeUserRole(userID, roleID);
    if (res.data) {
   
        localStorage.setItem("roleID",res.data)
        GetUserProfileDataById()
    }
  };

  useEffect(() => {
    getAllRole();
    GetUserProfileDataById()
  }, []);

  console.log("roleID>>>>>>>>>>>111",roleID)
  return (
    <div>
      <Modal
        style={customStyles}
        isOpen={showRoleModal}
        onRequestClose={closeRoleModal}
        contentLabel="Example Modal"
        backdrop="static"
      >
        <div className="moda-dialogue-custom">
          <div className="modal-header">
            <h5 className="mb-0"> Change Role</h5>
            <button className="modal-close-btn" onClick={closeRoleModal}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
          <div>
            
            <select
              className="w-100"
              defaultValue={roleID}
              onChange={(e) => changeUserRole(e)}
            >
              {allRole &&
                allRole.map((item) => (
                <>
                 
                  <option defaultValue={roleID} key={item._id} value={item._id}>
                    {item.roleName}
            
                  </option>
                  </>  ))}{" "}
            </select>{" "}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ChangeRoleModal;
