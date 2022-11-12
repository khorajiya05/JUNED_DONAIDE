import {
  ADMIN_SEND_MSG_MODAL_STATUS,
   MODAL_STATUS
  } from "../Constants/templateConstant";
  
  const initialState = {
    status: false,
    adminModalStatus: false,
    groupId : null,
    userId:null,
    adminUserId:null,
    communityId:null,
    userName:null
  }

export const modalReducer = (state = initialState, action) => {
  switch(action.type){
    case MODAL_STATUS:
      return { 
        ...state, 
        ...action.payload, 
      };

      case ADMIN_SEND_MSG_MODAL_STATUS:
      return { 
        ...state, 
        ...action.payload, 
      };

      default:
      return state;
  }
}