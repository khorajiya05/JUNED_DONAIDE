import {
  TEMPLATE_ABOUTUS_HEADING_REQUEST,
  TEMPLATE_ABOUTUS_DESC_REQUEST,
} from "../Constants/templateConstant";

const initialState = {
  headingText1: "",
  description1: "",
  //loading: true,
  //error: false,
};

    const aboutusReducer = (state = initialState, action)  => {
      switch (action.type) {
        case TEMPLATE_ABOUTUS_HEADING_REQUEST:
          return { ...state, headingText: action.payload };
        case TEMPLATE_ABOUTUS_DESC_REQUEST:
          return { ...state, description: action.payload };
        default:
          return state;
      }
    
    };


    export default aboutusReducer;