import http from "../../http-Common";

/**
 * post the data of contact us form  api call
 * @param {*} firstName 
 * @param {*} phoneNumber 
 * @param {*} email 
 * @param {*} organization 
 * @param {*} message 
 * @param {*} to 
 * @param {*} type 
 * @returns 
 */
export const contactUsSubmitFormAPICall = (firstName, phoneNumber, email, organization, message, to, type = "ContactUS") => {
    return http.post("/SendEmail/SendEmail", { to, type, firstName, phoneNumber, email, organization, message });
}