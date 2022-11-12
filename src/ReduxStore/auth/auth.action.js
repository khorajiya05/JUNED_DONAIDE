import { AUTH_LOADING, AUTH_LOADED, LOGIN_SUCCESS, LOGOUT, FORGOT_PASSWORD, RESET_FORGOT_PASSWORD, CHANGE_PASSWORD } from "./auth.constant"

/**
 * auth pending action creator
 * @returns
 */
const authLoading = () => ({ type: AUTH_LOADING });

/**
 * auth success action creator
 * @returns
 */
const authLoaded = () => ({ type: AUTH_LOADED });

/**
 * auth login action creator
 * @param token
 * @returns
 */
const loginSuccess = (loginData) =>
  ({ type: LOGIN_SUCCESS, payload: loginData });

/**
 * auth logout action creator
 * @returns
 */
const logout = () => ({ type: LOGOUT });

/**
 * auth forgot password action creator
 * @returns
 */
const forgotPassword = () => ({ type: FORGOT_PASSWORD });

/**
 * auth reset forgot password action creator
 * @returns
 */
const resetForgotPasswordSuccess = () => ({ type: RESET_FORGOT_PASSWORD });

/**
 * auth change password action creator
 * @returns
 */
const changePassword = () => ({ type: CHANGE_PASSWORD });

export {
  authLoading,
  authLoaded,
  loginSuccess,
  logout,
  forgotPassword,
  resetForgotPasswordSuccess,
  changePassword,
};
