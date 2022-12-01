import {
    COMMUNITY_LOADED,
    GET_ALL_COMMUNITY_DATA,
    COMMUNITY_LOADING,
    UPDATE_COMMUNITY_DATA
} from "./community.constant";

/**
 * community data loading action creator
 * @returns 
 */
export const communityLoadingAction = () => ({ type: COMMUNITY_LOADING });

/**
 * community data loaded action creator
 * @returns 
 */
export const communityLoadedAction = () => ({ type: COMMUNITY_LOADED });

/**
 * get all community data action creator
 * @param data 
 * @returns 
 */
export const getAllCommunityDataAction = (data) => ({ type: GET_ALL_COMMUNITY_DATA, payload: data });

/**
 * update community data action creator
 * @param data 
 * @returns 
 */
export const updateCommunityDataAction = (data) => ({ type: UPDATE_COMMUNITY_DATA, payload: data });