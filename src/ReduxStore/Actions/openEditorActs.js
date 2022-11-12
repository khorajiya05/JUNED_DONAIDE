import {  OPEN_FIRST_EDITOR, OPEN_SEC_EDITOR, OPEN_THIRD_EDITOR,OPEN_FOURTH_EDITOR,PREVIEW_EDIT_TEMPLATE_VIEW } from "../Constants/templateConstant";

export const openFirstEditorAct = (status)=> {
  return({
    type:OPEN_FIRST_EDITOR,
    payload:status
  })
}

export const openSecEditorAct = (status)=> {
  return({
    type:OPEN_SEC_EDITOR,
    payload:status
  })
}

export const openThirdEditorAct = (status)=> {
  return({
    type:OPEN_THIRD_EDITOR,
    payload:status
  })
}

export const openFourthEditorAct = (status)=> {
  return({
    type:OPEN_FOURTH_EDITOR,
    payload:status
  })
}

export const previewEditTempView = (status)=> {
  return({
    type:PREVIEW_EDIT_TEMPLATE_VIEW,
    payload:status
  })
}