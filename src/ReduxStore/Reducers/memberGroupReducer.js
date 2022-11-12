import {
    GET_JOIN_GROUP_MEM_DETAIL
  } from "../Constants/templateConstant";
  
 
  
      const memberGroupReducer = (state = null, action)  => {
        switch (action.type) {
          case GET_JOIN_GROUP_MEM_DETAIL:
            return action.payload;
          default:
            return state;
        }
      
      };
  
  
      export { memberGroupReducer};