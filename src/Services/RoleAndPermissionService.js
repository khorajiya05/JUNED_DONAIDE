import http from "../http-Common";

class RoleAndPermissionService {
    
    getRoleByUserID(userID) {
        return http.get(`/RoleAndPermission/GetRoleByUserID?userID=${userID}`);
    }

    getAllPermissionByUserAndRole(userID,roleID) {
        return http.get(`/RoleAndPermission/GetAllPermissionByUserAndRole?userID=${userID}&roleID=${roleID}`);
    }

    assignUserPermission(data) {
        return http.post("/RoleAndPermission/AssignUserPermission", data);
    }

    getUserPermissionList(userID,roleID) {
        return http.get(`/RoleAndPermission/GetUserPermissionList?userID=${userID}&roleID=${roleID}`);
    }
    getAllRole() {
        return http.get(`/RoleAndPermission/GetAllRole`);
    }

}


export default new RoleAndPermissionService();