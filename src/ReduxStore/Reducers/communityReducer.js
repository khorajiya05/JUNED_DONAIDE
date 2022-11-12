import {
    TEMPLATE_COMMUNITY_DETAILS_REQUEST,
    TEMPLATE_COMMUNITY_DETAILS_SUCCESS,
    TEMPLATE_COMMUNITY_DETAILS_FAIL,
  } from "../Constants/communityConstants";
  
  const initialState = {
    data: [],
    loading: false,
    error: null
  }

export const communityReducer = (state = initialState, action) => {
  switch(action.type){
    case TEMPLATE_COMMUNITY_DETAILS_REQUEST:
      return { 
        ...state, 
        loading: true, 
        error: null 
      };

      case TEMPLATE_COMMUNITY_DETAILS_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        data: action.payload
      };

      case TEMPLATE_COMMUNITY_DETAILS_FAIL:
      return { 
        loading: false, 
        error: action.payload,
        data: []
      };

      default:
      return state;
  }
}