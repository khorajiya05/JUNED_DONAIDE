import { COMMUNITY_USER_DETAILS_REQUEST, COMMUNITY_USER_DETAILS_SUCCESS, COMMUNITY_USER_DETAILS_FAIL, USER_PERMISSION } from "../Constants/templateConstant";
import MemberShipService from "../../Services/MemberShipService";

export const userLogin = () => async (dispatch) => {
  try {
    dispatch({ type: COMMUNITY_USER_DETAILS_REQUEST, payload: { loading: true, error: '' } });
    const res = await MemberShipService.getAllProfileDetails();
    dispatch({ type: COMMUNITY_USER_DETAILS_SUCCESS, payload: { loading: false, payload: res.data } });
  } catch (error) {
    dispatch({ type: COMMUNITY_USER_DETAILS_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message });
  }
};


export const loginInUserPermis =(data) => {
  return ({
    type: USER_PERMISSION,
    payload: data
  })
};
