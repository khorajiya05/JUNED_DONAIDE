import { getProfilerofileDataAction, profileDataLoadedAction, profileDataLoadingAction, updateProfileDataAction } from "./profileData.actions";
import { NotificationManager } from "react-notifications";
import UserServices from "../../Services/UserServices";
import GroupService from "../../Services/GroupService";

/**
 * get profileData thunk
 * @param {*} profileId 
 * @returns 
 */
export const getProfileDataActionThunk = (profileId) => {
    return (dispatch) => {
        dispatch(profileDataLoadingAction());
        UserServices.GetUserProfileDataById(profileId)
            .then(res => {
                dispatch(getProfilerofileDataAction(res.data));
                dispatch(profileDataLoadedAction());
            })
            .catch((error) => {
                dispatch(profileDataLoadedAction());
                if (error.response && error.response.data) {
                    NotificationManager.error(error.response.data.ErrorMessage, "Error Message");
                } else {
                    NotificationManager.error("something went wrong");
                }
            })
    }
}

/**
 * update profileData by id thunk
 * @param {*} values 
 * @param {*} config 
 * @returns 
 */
export const updateProfileDataActionThunk = (values, config) => {
    return (dispatch) => {
        dispatch(profileDataLoadingAction());
        GroupService.UpdateUserPofile(values,config)
            .then(res => {
                dispatch(updateProfileDataAction(res.data?.data));
                dispatch(profileDataLoadedAction());
                NotificationManager.success("Profile Update successfully.");
            })
            .catch((error) => {
                dispatch(profileDataLoadedAction());
                if (error.response && error.response.data) {
                    NotificationManager.error(error.response.data.ErrorMessage, "Error Message");
                } else {
                    NotificationManager.error("something went wrong");
                }
            })
    }
}