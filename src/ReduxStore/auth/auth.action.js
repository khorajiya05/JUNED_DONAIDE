import { AUTH_LOADING, AUTH_LOADED, LOGIN_SUCCESS, LOGOUT, CHANGE_LOGED_USER_ROLE, CHANGE_ROLE_LOADED, CHANGE_ROLE_LOADING } from "./auth.constant"

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
const loginSuccess = (loginData) => ({ type: LOGIN_SUCCESS, payload: loginData });

/**
 * auth logout action creator
 * @returns
 */
const logout = () => ({ type: LOGOUT });

/**
 * change role lodaing action creator
 * @returns 
 */
const changeRoleLoadingAction = () => ({ type: CHANGE_ROLE_LOADING })

/**
 * change role loaded action creator
 * @returns 
 */
const changeRoleLoadedAction = () => ({ type: CHANGE_ROLE_LOADED })

/**
 * change role of logged user  actoin creator
 */
const changeRoleOfLoggedUserAction = (selectedRoleId) => ({ type: CHANGE_LOGED_USER_ROLE, payload: selectedRoleId });

export {
  authLoading,
  authLoaded,
  loginSuccess,
  logout,
  changeRoleLoadingAction,
  changeRoleLoadedAction,
  changeRoleOfLoggedUserAction,
};
