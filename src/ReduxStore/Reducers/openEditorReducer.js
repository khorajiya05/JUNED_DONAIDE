import { OPEN_FIRST_EDITOR, OPEN_SEC_EDITOR, OPEN_THIRD_EDITOR, OPEN_FOURTH_EDITOR, PREVIEW_EDIT_TEMPLATE_VIEW } from "../Constants/templateConstant";


const initialState = {
    openFirstEditorStatus: false,
    openSecEditorStatus: false,
    openThirdEditorStatus: false,
    openFourthEditorStatus: false,
    openPreviewEditCompStatus: false,
    //loading: true,
    //error: false,
};

export const openEditorReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_FIRST_EDITOR:
            return { ...state, openFirstEditorStatus: action.payload };
        case OPEN_SEC_EDITOR:
            return { ...state, openSecEditorStatus: action.payload };
        case OPEN_THIRD_EDITOR:
            return { ...state, openThirdEditorStatus: action.payload };
        case OPEN_FOURTH_EDITOR:
            return { ...state, openFourthEditorStatus: action.payload };
        case PREVIEW_EDIT_TEMPLATE_VIEW:
            return { ...state, openPreviewEditCompStatus: action.payload };
        default:
            return state;
    }

};


