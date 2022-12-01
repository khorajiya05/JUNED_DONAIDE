import { useEffect, useState } from "react";
import Modal from "react-modal";
import "react-notifications/lib/notifications.css";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";


import RoleAndPermissionService from "../../Services/RoleAndPermissionService";
import { changeLogedUserRoleActionThunk } from "../../ReduxStore/auth/auth.actions.async";


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

  const dispatch = useDispatch();

  const { showRoleModal, closeRoleModal } = porps;
  const { RoleID, UserID } = useSelector((state) => state?.auth?.loginData);

  const [allRole, setAllRole] = useState([]);

  /**
   * get all role api call
   */
  const getAllRole = async () => {
    const res = await RoleAndPermissionService.getAllRole();
    if (res.data) {
      setAllRole(res.data || []);
    } else {
      setAllRole([]);
    }
  };

  /**
   * change role submit api call
   * @param {} e 
   */
  const changeUserRole = async (e) => {
    dispatch(changeLogedUserRoleActionThunk(UserID, e.target?.value));
    closeRoleModal();
  };

  useEffect(() => {
    getAllRole();
  }, []);

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
              onChange={(e) => changeUserRole(e)}
            >
              {allRole &&
                allRole?.map((item) => (
                  <>
                    <option
                      selected={Number(item?._id) === Number(RoleID) ? true : false}
                      key={item?._id}
                      value={item?._id}
                    >
                      {item?.roleName}
                    </option>
                  </>
                ))
              }
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ChangeRoleModal;
