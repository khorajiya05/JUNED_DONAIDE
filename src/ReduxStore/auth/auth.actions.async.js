import { authLoading, loginSuccess, authLoaded, forgotPassword, resetForgotPasswordSuccess, changePassword, logout } from "./auth.action";
import UserService from "../../Services/UserServices";
import { NotificationManager } from "react-notifications";
import { setWithExpiry } from "../../utils/helpers/password";
import { getProfileDataActionThunk } from "../profileData/profileData.actions.async";
import { useNavigate } from "react-router";

/**
 * auth user login thunk
 * @param values
 */
export const loginActionThunk = (values, rememberMe) => {
  return (dispatch) => {
    dispatch(authLoading());
    setTimeout(() => {
      dispatch(authLoaded());
    }, 10000);
    UserService.login(values?.email, values?.password)
      .then((response) => {
        dispatch(getProfileDataActionThunk(response.data?.data?.UserID))
        dispatch(authLoaded());
        dispatch(loginSuccess(response.data?.data));
        localStorage.setItem("token", response.data.data?.Token);
        if (rememberMe) {
          setWithExpiry("encPass", values.password, values.email);
        }
        if (!rememberMe) {
          localStorage.removeItem("rememberMe");
        }
      })
      .catch((error) => {
        dispatch(authLoaded());
        if (error.response && error.response.data.status) {
          NotificationManager.error("Invalid username or password.");
        } else {
          NotificationManager.error("something went wrong");
        }
      });
  };
};

/**
 * auth user forgot password thunk
 * @param values
 * @returns
 */
// export const forgotPasswordActionThunk = (
//   values,
//   showConfirmModal
// ) => {
//   return (dispatch) => {
//     dispatch(authLoading());
//     requestFromServer
//       .authForgotPassword(values)
//       .then(() => {
//         dispatch(forgotPassword());
//         showConfirmModal();
//       })
//       .catch((error) => {
//         dispatch(authLoaded());
//         if (error.response && error.response.data) {
//           errorToast(error.response.data.message);
//         } else {
//           errorToast("Something went wrong.");
//         }
//       });
//   };
// };

/**
 * auth user reset forgot password thunk
 * @param values
 * @returns
 */
// export const ResetForgotPasswordActionThunk = (
//   values,
//   history
// ) => {
//   return (dispatch) => {
//     dispatch(authLoading());

//     requestFromServer
//       .authResetForgotPassword(values)
//       .then(async (response) => {
//         await dispatch(resetForgotPasswordSuccess());
//         history.push("/login");
//         successToast(response.data.message);
//         localStorage.removeItem("rememberMe");
//       })
//       .catch((error) => {
//         dispatch(authLoaded());
//         if (error.response && error.response.data) {
//           errorToast(error.response.data.message);
//         } else {
//           errorToast("Something went wrong.");
//         }
//       });
//   };
// };

/**
 * auth user change password thunk
 * @param values
 * @returns
 */
// export const changePasswordActionThunk = (
//   values
// ) => {
//   return (dispatch) => {
//     dispatch(authLoading());
//     requestFromServer
//       .authChangePassword(values)
//       .then((response) => {
//         dispatch(changePassword());
//         if (response.data && response.data.message) {
//           successToast(response.data.message);
//         }
//         localStorage.removeItem("rememberMe");
//         dispatch(logout());
//       })
//       .catch((error) => {
//         dispatch(authLoaded());
//         if (error.response && error.response.data) {
//           errorToast(error.response.data.message);
//         } else {
//           errorToast("Something went wrong.");
//         }
//       });
//   };
// };
