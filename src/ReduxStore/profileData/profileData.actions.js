import { CHANGE_ROLE_ID_IN_PROFILE_DATA, DO_EMPTY_PROFILE_DATA, GET_PROFILE_DATA, PROFILE_DATA_LOADED, PROFILE_DATA_LOADING, UPDATE_PROFILE_DATA } from "./profileData.constant";

/**
 * profile data loading action creator
 * @returns 
 */
export const profileDataLoadingAction = () => ({ type: PROFILE_DATA_LOADING });

/**
 * profile data loaded action creator
 * @returns 
 */
export const profileDataLoadedAction = () => ({ type: PROFILE_DATA_LOADED });

/**
 * get profile data action creator
 * @param data 
 * @returns 
 */
export const getProfilerofileDataAction = (data) => ({ type: GET_PROFILE_DATA, payload: data });

/**
 * update profile data action creator
 * @param data 
 * @returns 
 */
export const updateProfileDataAction = (data) => ({ type: UPDATE_PROFILE_DATA, payload: data });

/**
 * change role id in profile data action creator
 * @param {*} selectedRoleID 
 * @returns 
 */
export const changeRoleIdInProfileDataAction = (selectedRoleID) => ({ type: CHANGE_ROLE_ID_IN_PROFILE_DATA, payload: selectedRoleID })

/**
 * do empty profile data state action creator
 * @returns 
 */
export const doEmptyProfileAction = ()=> ({type:DO_EMPTY_PROFILE_DATA});