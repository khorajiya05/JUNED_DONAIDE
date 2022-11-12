import http from "../http-Common";

class CommunityService {

    getAllFirstLevelLookUpData() {
    return http.get("/Site/GetAllFirstLevelLookUpData");
  }

  getAllSecondLevelLookUpData() {
    return http.get("/Site/GetAllSecondLevelLookUpData");
  }

  getAllCommunityData() {
    return http.get("/Site/GetAllCommunityData");
  }

  communitySiteSetUp(data) {
    return http.post("/Site/CommunitySiteSetUp",data);
  }

  getUserCommunityByUserID(userID) {
    return http.get(`/Site/GetUserCommunityByUserID?userID=${userID}`);
  }

  getAllDefaultSectionsTemplate() {
    return http.get("/Template/GetAllDefaultSectionsTemplate");
  }

  addCommunitySiteSection(data) {
    
    return http.post("/Site/AddCommunitySiteSection",data);
  }

  updateCommunitySiteSection(data) {
    return http.put("/Site/UpdateCommunitySiteSection",data);
  }

  getCommunitySiteSection(siteID) {
    return http.get(`/Site/GetCommunitySiteSection?siteID=${siteID}`);
  }

  getAllCommunitySiteDetailsByUserID(userID,siteID) {
  
    return http.get(`/Site/GetAllCommunitySiteDetailsByUserID?userID=${userID}&siteID=${siteID}`);
  }

//create the new community header into the site database
  communityHeader(data,config) {
    return http.post("/Site/CommunityHeader",data,config);
  }

//fetching the existing community header details about the logged-in user from the site database
  getAllCommunityHeaderDetails(userID,siteID) {
  
    return http.get(`/Site/getAllCommunityHeaderDetails?userID=${userID}&siteID=${siteID}`);
  }

//update the existing community details into the database
  changeCommunityHeader(data,config) {
  
    return http.put("/Site/ChangeCommunityHeader",data,config);
  } 

  //update the existing community details into the database
  getCommunitySiteDetailsBySiteID(sideID) {
  
    return http.get(`/Site/GetCommunitySiteDetailsBySiteID?siteID=${sideID}`);
  } 

  //update the existing community details into the database
  getUserCommunityCount(userID) {
    return http.get(`/Site/GetUserCommunityCount?userID=${userID}`);
  } 

  updateSitePublishStatus(siteID,publishStatus) {
    return http.put(`/Site/UpdateSitePublishStatus?siteID=${siteID}&publishStatus=${publishStatus}`);
  } 
 
  getCommunitySiteSectionByDomain(domainName) {
    return http.get(`Site/GetCommunitySiteSectionByDomain?domainName=${domainName}`);
  } 
  AddCommunityAdminDetails(data,config){
    return http.post("/Site/AddCommunityAdminDetails",data,config);
  }

  GetCommunityAdminList(CommunityId) {
    return http.get(`Site/GetCommunityAdminList?CommunityId=${CommunityId}`);
  } 

  DeleteCommuinty(SiteID) {
    return http.delete(`Site/DeleteCommuinty?siteID=${SiteID}`);
  } 




 
}

export default new CommunityService();