import { COMMUNITY_USER_DETAILS_REQUEST, COMMUNITY_USER_DETAILS_SUCCESS, COMMUNITY_USER_DETAILS_FAIL,USER_PERMISSION } from "../Constants/templateConstant";

const initialState = {
  data: [],
  loading: false,
  error: ''
}

export const userReducer = (state = initialState, action) => {
    switch(action.type) {
      case COMMUNITY_USER_DETAILS_REQUEST:
        return { 
          ...state,
          loading: true,
          error: ''
         };

        case COMMUNITY_USER_DETAILS_SUCCESS:
        return { 
          ...state,
          loading: false, 
          data: action.payload
        };

        case COMMUNITY_USER_DETAILS_FAIL:
        return { 
          ...state, 
          loading: false, 
          error: action.payload 
        };

      default:
        return state;
    }
  };

  export const userPermissionReducer = (state = [], action) => {
    switch(action.type) {
      case USER_PERMISSION:
        return { 
          ...state,data:action.payload
         };

      default:
        return state;
    }
  };
  