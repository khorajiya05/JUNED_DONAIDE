import { GET_PROFILE_DATA, PROFILE_DATA_LOADED, PROFILE_DATA_LOADING, UPDATE_PROFILE_DATA } from "./profileData.constant";

/**
 * profile data loading action creator
 * @returns 
 */
export const profileDataLoadingAction = () => ({type:PROFILE_DATA_LOADING});

/**
 * profile data loaded action creator
 * @returns 
 */
export const profileDataLoadedAction = () => ({type:PROFILE_DATA_LOADED});

/**
 * get profile data action creator
 * @param data 
 * @returns 
 */
export const getProfilerofileDataAction = (data) => ({type:GET_PROFILE_DATA,payload:data});

/**
 * update profile data action creator
 * @param data 
 * @returns 
 */
export const updateProfileDataAction = (data) => ({type:UPDATE_PROFILE_DATA, paylad:data});
