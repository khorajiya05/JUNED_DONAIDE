
import http from "../http-Common";

class UserService {
  profileCreate(data) {
    return http.post("/User/Profile",data);
  }

  profileUpdate(userID, data) {
    return http.put(`/User/UpdateProfile/${userID}`, data);
  }

  activeDeactiveUserProfile(userID) {
    return http.put(`/User/ActiveDeactiveUserProfile/${userID}`);
  }

  changeUserRole(id, roleID) {
    return http.put(`/User/ChangeUserRole?userID=${id}&roleID=${roleID}`);
  }

  deleteProfileByUserID(id) {
    return http.delete(`/User/DeleteProfileByUserID/${id}`);
  }

  login(email,password) {
    return http.post(`/User/Login?email=${email}&password=${password}`);
  }

  resetPassword(id,password,confirmPassword) {
    return http.post(`/User/ResetPassword?userID=${id}&newPassword=${password}&confirmPassword=${confirmPassword}`);
  }

  generateToken(email,password) {
    return http.post(`/User/GenerateToken/${email}${password}`);
  }

  payment(data) {
    return http.post("/Payment/Pay",data);
  }

  sendEmail(data) {
    return http.post("/SendEmail/SendEmail",data);
  }
  
  upgradePlan(data) {
    return http.put("/User/UpgradePlan",data);
  }

  getUserDetailsByUserID(userid) {
    return http.get(`/User/GetProfileDetailsByUserID?userID=${userid}`);
  }
  GetAllOrnerAdmin() {
    return http.get(`/User/GetAllOrnerAdmin`);
  }
  GetUserPermissionById(userId,roleID) {
    return http.get(`/User/GetUserPermissionById?id=${userId}&roleID=${roleID}`);
  }
  GetUserProfileDataById(ProfileId) {
    return http.get(`/User/GetUserProfileDataById?ProfileId=${ProfileId}`);
  }

}

export default new UserService();