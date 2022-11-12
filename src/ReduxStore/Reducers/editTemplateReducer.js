import {
  TEMPLATE_HEADING_REQUEST,
  TEMPLATE_DESC_REQUEST,
  TEMPLATE_LOGO_COMMUNITY_NAME,
} from "../Constants/templateConstant";

const initialState = {
  data: [],
}

const editTemplateReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEMPLATE_HEADING_REQUEST:
      return { ...state, headingText: action.payload };
    case TEMPLATE_DESC_REQUEST:
      return { ...state, description: action.payload };
      case TEMPLATE_LOGO_COMMUNITY_NAME:
        return { ...state, data: action.payload };  
    default:
      return state;
  }
};

export default editTemplateReducer;
