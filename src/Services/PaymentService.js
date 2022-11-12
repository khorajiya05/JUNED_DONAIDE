import http from "../http-Common";

class PaymentService {
    
    payment(data) {
    return http.post("/Payment/Pay",data);
  }

}

export default new PaymentService();