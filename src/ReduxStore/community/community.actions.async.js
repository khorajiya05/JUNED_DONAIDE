import { errorToast } from "../../Component/toast/toast";
import CommunityService from "../../Services/CommunityService";
import { communityLoadedAction, communityLoadingAction, getAllCommunityDataAction } from "./community.actions";

/**
 * get all community data action thunk
 * @returns 
 */
export const getAllCommunityDataActionThunk = () => {
    return (dispatch) => {
        dispatch(communityLoadingAction());
        CommunityService.getAllCommunityData()
            .then(res => {
                dispatch(getAllCommunityDataAction(res.data));
                dispatch(communityLoadedAction());
            })
            .catch((error) => {
                dispatch(communityLoadedAction());
                if (error.response && error.response.data) {
                    errorToast(error.response.data.ErrorMessage);
                } else {
                    errorToast("something went wrong");
                }
            })
    }
}

// /**
//  * update profileData by id thunk
//  * @param {*} values 
//  * @param {*} config 
//  * @returns 
//  */
// export const updateProfileDataActionThunk = (values, config) => {
//     return (dispatch) => {
//         dispatch(profileDataLoadingAction());
//         GroupService.UpdateUserPofile(values, config)
//             .then(res => {
//                 dispatch(updateProfileDataAction(res.data?.data));
//                 dispatch(profileDataLoadedAction());
//                 NotificationManager.success("Profile Update successfully.");
//             })
//             .catch((error) => {
//                 dispatch(profileDataLoadedAction());
//                 if (error.response && error.response.data) {
//                     NotificationManager.error(error.response.data.ErrorMessage, "Error Message");
//                 } else {
//                     NotificationManager.error("something went wrong");
//                 }
//             })
//     }
// }