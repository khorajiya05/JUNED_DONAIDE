import { RENDER_COMPONENT } from "../Constants/templateConstant";

const initialState = {
  renderStatus: 0,
}

export const renderCompReducer = (state = initialState, action) => {
    switch(action.type) {
      case RENDER_COMPONENT:
        return {...state,renderStatus : action.payload};
      default:
        return state;
    }
  };

  
  