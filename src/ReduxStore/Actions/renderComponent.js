import { RENDER_COMPONENT} from "../Constants/templateConstant";

export const renderComponent = (renderStatus)=> {
  return({
    type:RENDER_COMPONENT,
    payload:renderStatus
  })
}

