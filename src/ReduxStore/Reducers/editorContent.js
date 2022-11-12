import {
    TEMPLATE_CONTENT_ID
  } from "../Constants/templateConstant";
  
 
  
      const editorReducer = (state = null, action)  => {
        switch (action.type) {
          case TEMPLATE_CONTENT_ID:
            return action.payload;
          default:
            return state;
        }
      
      };
  
  
      export default editorReducer;