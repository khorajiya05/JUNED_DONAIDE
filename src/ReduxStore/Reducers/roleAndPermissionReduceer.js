import {
    ROLE_AND_PERMISSIONS_REQUEST,
    ROLE_AND_PERMISSIONS_SUCCESS,
    ROLE_AND_PERMISSIONS_FAIL,
  } from "../Constants/roleAndPermission";
  
  const initialState = {
    data: [],
    loading: false,
    error: null
  }

export const roleAndPermision = (state = initialState, action) => {
  switch(action.type){
    case ROLE_AND_PERMISSIONS_REQUEST:
      return { 
        ...state, 
        loading: true, 
        error: null 
      };

      case ROLE_AND_PERMISSIONS_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        data: action.payload
      };

      case ROLE_AND_PERMISSIONS_FAIL:
      return { 
        loading: false, 
        error: action.payload,
        data: []
      };

      default:
      return state;
  }
}