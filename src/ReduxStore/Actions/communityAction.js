import {  TEMPLATE_COMMUNITY_DETAILS_REQUEST, TEMPLATE_COMMUNITY_DETAILS_SUCCESS, TEMPLATE_COMMUNITY_DETAILS_FAIL } from "../Constants/communityConstants";
import CommunityService from "../../Services/CommunityService";


export const getCommunityDataBySiteId = ()=> async(dispatch)=> {
  try {
        dispatch({ type: TEMPLATE_COMMUNITY_DETAILS_REQUEST, payload: {loading: true} })
        const res  = await CommunityService.getAllCommunityData();
        dispatch({ type: TEMPLATE_COMMUNITY_DETAILS_SUCCESS, payload: { loading: false, payload: res.data }
        })
      } catch(error) {
        dispatch({ type: TEMPLATE_COMMUNITY_DETAILS_FAIL, payload: error.response && error.response.data.message? error.response.data.message : error.message
        })
  }
}

