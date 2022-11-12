import { AUTH_LOADED, AUTH_LOADING, LOGIN_SUCCESS, FORGOT_PASSWORD, RESET_FORGOT_PASSWORD, CHANGE_PASSWORD, LOGOUT } from "./auth.constant";

const INITIAL_STATE = {
  loading: false,
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

    case FORGOT_PASSWORD:
      return { ...state, loading: false };

    case RESET_FORGOT_PASSWORD:
      return { ...state, loading: false };

    case CHANGE_PASSWORD:
      return { ...state, loading: false };

    case LOGOUT:
      return { ...state, loginData: null };

    default:
      return state;
  }
};

export default authReducer;
