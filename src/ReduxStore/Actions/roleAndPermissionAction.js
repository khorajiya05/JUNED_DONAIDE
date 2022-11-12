import {
  ROLE_AND_PERMISSIONS_REQUEST,
  ROLE_AND_PERMISSIONS_SUCCESS,
  ROLE_AND_PERMISSIONS_FAIL,
} from "../Constants/roleAndPermission";
import RoleAndPermissionService from "../../Services/RoleAndPermissionService";

export const getRoleAndPermissionListByID =
  (userID, roleID) => async (dispatch) => {
    try {
      dispatch({
        type: ROLE_AND_PERMISSIONS_REQUEST,
        payload: { loading: true },
      });
      const res = await RoleAndPermissionService.getUserPermissionList(
        userID,
        roleID
      );
      dispatch({
        type: ROLE_AND_PERMISSIONS_SUCCESS,
        payload: { loading: false, payload: res.data },
      });
    } catch (error) {
      dispatch({
        type: ROLE_AND_PERMISSIONS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
