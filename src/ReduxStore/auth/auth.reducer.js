import { AUTH_LOADED, AUTH_LOADING, CHANGE_LOGED_USER_ROLE, CHANGE_ROLE_LOADED, CHANGE_ROLE_LOADING, LOGIN_SUCCESS, LOGOUT } from "./auth.constant";

const INITIAL_STATE = {
  loading: false,
  changeRoleLoading: false,
  loginData: null

};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return { ...state, loading: true };

    case AUTH_LOADED:
      return { ...state, loading: false };

    case LOGIN_SUCCESS:
      return { ...state, loading: false, loginData: action.payload?.Token ? action.payload : null };

    case LOGOUT:
      localStorage.removeItem("token");
      return { ...state, loginData: null };

    case CHANGE_ROLE_LOADING:
      return { ...state, changeRoleLoading: true };

    case CHANGE_ROLE_LOADED:
      return { ...state, changeRoleLoading: false };

    case CHANGE_LOGED_USER_ROLE:
      return { ...state, changeRoleLoading: false, loginData: { ...state.loginData, RoleID: action?.payload } }
    default:
      return state;
  }
};

export default authReducer;
