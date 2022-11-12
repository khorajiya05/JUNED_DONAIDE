import { MODAL_STATUS,ADMIN_SEND_MSG_MODAL_STATUS} from "../Constants/templateConstant";

export const modalAct = (status)=> {
  return({
    type:MODAL_STATUS,
    payload:status
  })
}

export const adminSendMsgModalAct = (status)=> {
  return({
    type:ADMIN_SEND_MSG_MODAL_STATUS,
    payload:status
  })
}



