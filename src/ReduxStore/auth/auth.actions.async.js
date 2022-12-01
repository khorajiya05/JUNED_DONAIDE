import { NotificationManager } from "react-notifications";

import { authLoading, loginSuccess, authLoaded, changeRoleLoadingAction, changeRoleLoadedAction, changeRoleOfLoggedUserAction } from "./auth.action";
import UserService from "../../Services/UserServices";
import { setWithExpiry } from "../../utils/helpers/password";
import { getProfileDataActionThunk } from "../profileData/profileData.actions.async";
import UserServices from "../../Services/UserServices";
import { changeRoleIdInProfileDataAction } from "../profileData/profileData.actions";

/**
 * auth user login thunk
 * @param values
 */
export const loginActionThunk = (values, rememberMe) => {
  return (dispatch) => {
    dispatch(authLoading());
    setTimeout(() => {
      dispatch(authLoaded());
    }, 10000);
    UserService.login(values?.email, values?.password)
      .then((response) => {

        dispatch(getProfileDataActionThunk(response.data?.data?.UserID))

        dispatch(authLoaded());
        dispatch(loginSuccess(response.data?.data));

        localStorage.setItem("token", response.data.data?.Token);

        if (rememberMe) {
          setWithExpiry("encPass", values.password, values.email);
        }
        if (!rememberMe) {
          localStorage.removeItem("rememberMe");
        }
        
      })
      .catch((error) => {
        dispatch(authLoaded());
        if (error.response && error.response.data.status) {
          NotificationManager.error("Invalid username or password.");
        } else {
          NotificationManager.error("something went wrong");
        }
      });
  };
};

/**
 * change role of current loged user Action thunk
 * @param {*} UserID 
 * @param {*} selectedRoleId 
 * @returns 
 */
export const changeLogedUserRoleActionThunk = (UserID, selectedRoleId) => {
  return (dispatch) => {
    dispatch(changeRoleLoadingAction());
    UserServices.changeUserRole(UserID, selectedRoleId)
      .then((response) => {
        if (response.data?.status === "SUCCESS" || Number(response.data?.statusCode) === Number(200)) {
          dispatch(changeRoleOfLoggedUserAction(selectedRoleId))
          dispatch(changeRoleIdInProfileDataAction(selectedRoleId))
        }
        dispatch(changeRoleLoadedAction());
      })
      .catch((error) => {
        dispatch(changeRoleLoadedAction());
        NotificationManager.error("something went wrong");
      })
  }
}
