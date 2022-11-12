import http from "../http-Common";

class SendSMSService {

    sendSMS(toNumber,message) {
        return http.post(`/SMS/SendSMS?toNumber=${toNumber}&message=${message}`);
    }
}

export default new SendSMSService();