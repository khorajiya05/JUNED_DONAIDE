import http from "../http-Common";

class GroupService {
    createGroup(data,config) {
        return http.post("/Group/CreateGroup", data,config);
    }

    inviteMembersViaLink(data,config) {
        return http.post("/Group/InviteMembersViaLink", data,config);
    }

    updateGroup(data,config) {
        return http.put("/Group/UpdateGroup", data,config);
    }

    getAllGroupByUserID(userID) {
        return http.get(`/Group/GetAllGroupByUserID?userID=${userID}`);
    }

    getAllGroupByCommunityID(siteID) {
        return http.get(`/Group/GetAllGroupByCommunityID?communityID=${siteID}`);
    }

    deleteGroup(groupID) {
        return http.delete(`/Group/DeleteGroup?groupID=${groupID}`);
    }

    getGroupByGroupID(groupID) {
        return http.get(`/Group/GetGroupByGroupID?groupID=${groupID}`);
    }

    getCommunityGroupsWithCommunityDetails(userID) {
        return http.get(`/Group/GetCommunityGroupsWithCommunityDetails?userID=${userID}`);
    }

    getAllGroupMembers(groupID) {
        return http.get(`/Group/GetAllGroupMembers?groupID=${groupID}`);
    }

    getGroupMembersDetailsByEmailId(emailId,communityID) {
        return http.get(`/Group/GetGroupMembersDetailsByEmailId?emailId=${emailId}&communityID=${communityID}`);
    }
    getGroupMember(groupMemberID) {
        return http.get(`/Group/GetGroupMembers?userID=${groupMemberID}`);
    }


    uploadGroupPostDetails(data,config) {
        return http.post("/Group/UploadGroupPostDetails", data,config);
    }

    getAllGroupPostDataByGroupIDCommunityID(groupId,communityId) {
        return http.get(`/Group/GetAllGroupPostDataByGroupIDCommunityID?groupID=${groupId}&communityID=${communityId}`);
    }

    createCommunityGroupComments(data) {
        return http.post("/Group/CreateCommunityGroupComments", data);
    }
    
    CreateGroupMember(data,config) {
        return http.post(`/Group/CreateGroupMember`,data,config);
    }

    getPostComments(postID) {
        return http.get(`Group/GetPostAllComments?PostID=${postID}`);
    }
    AddPostLike (data) {
        return http.post(`Group/AddPostLike `,data);
    }
    
    getCountOfLikeAndComments(postID) {
        return http.get(`Group/GetCountOfLikeAndComments?PostID=${postID}`);
    }
    AddCommentLike(data) {
        return http.post(`Group/AddCommentLike`,data);
    }
    addUserNotificationMessage(data) {
        return http.post(`Group/AddUserNotificationMessage`,data);
    }
    getAllNotificationMessageByUserID(memberID) {
        return http.get(`Group/GetAllNotificationMessageByUserID?memberID=${memberID}`);
    }

    getAllGroupMembersExceptAdmin(groupID) {
        return http.get(`/Group/GetAllGroupMembersExceptAdmin?groupID=${groupID}`);
    }

    GetAllGroupMembersExceptAdmin(groupID) {
        return http.get(`/Group/GetAllGroupMembersExceptAdmin?groupID=${groupID}`);
    }

    deleteGroupMember(groupMemberID){
        return http.delete(`/Group/DeleteGroupMember?groupMemberID=${groupMemberID}`);
    }
    groupMemberStatusUpdate(groupMemberID,status){
        return http.put(`/Group/GroupMemberStatusUpdate?groupMemberID=${groupMemberID}&status=${status}`);
    }
    AddInvitationHistory (data) {
        return http.post(`Group/AddInvitationHistory `,data);
    }
    UpdateInvitationHistoryStatus(data){
        return http.post(`Group/UpdateInvitationHistoryStatus `,data);
    }


    AddCommentReply(data){
        return http.post(`Group/AddCommentReply `,data);
    }

    addEventDetails(data,config){
        return http.post(`Group/AddEventDetails `,data,config);
    }

    getUpcomingEventsList(groupID){
        return http.get(`Group/GetUpcomingEventsList?groupID=${groupID}`); 
    }
    GetGroupEventById(eventID){
        return http.get(`Group/GetGroupEventById?eventID=${eventID}`); 
    }
    getOutgoingEventsList(groupID){
        return http.get(`Group/GetOutgoingEventsList?groupID=${groupID}`); 
    }
    GetAllGroupAdminList(groupID){
        return http.get(`Group/GetAllGroupAdminList?groupID=${groupID}`); 
    }
    AddEventConfirmationDetails(data){
        return http.post("Group/AddEventConfirmationDetails",data)
    }
    UpdateUserNotificationIsView(userId){
        return http.put(`/Group/UpdateUserNotificationIsView?userId=${userId}&isView=${true}`);
    }
    DeleteCommunityGroupComments(commentID){
        return http.delete(`/Group/DeleteCommunityGroupComments?commentID=${commentID}`);
    }
    GetEventdetailByUserIdAndEventId(userID,eventID){
        return http.get(`/Group/GetEventdetailByUserIdAndEventId?userID=${userID}&eventID=${eventID}`); 
    }  
    UpdateUserPofile(data,config){
        return http.put(`/Group/UpdateUserPofile`,data,config);
    }
}
export default new GroupService();