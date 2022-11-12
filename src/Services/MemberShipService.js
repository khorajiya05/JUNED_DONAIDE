import http from "../http-Common";

class MemberShip {
    getAllMemberShip() {
    return http.get("/MemberShip/GetAllMemberShip");
  }
  
  getMemberShipByMemberShipID(userID) {
    return http.get(`/MemberShip/GetMemberShipByMemberShipID/?membershipID=${userID}`);
  }

  getAllProfileDetails() {
    return http.get("/User/GetAllProfileDetails");
  }

  checkExistingEmailID(emailID) {
    return http.get(`/User/CheckExistingEmailID/?emailID=${emailID}`);
  }
  
  getMemberShipByUserID(userID) {
    return http.get(`/MemberShip/GetMemberShipByUserID?userID=${userID}`);
  }

}

export default new MemberShip();