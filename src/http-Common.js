import axios from "axios";

export default axios.create({
  // baseURL: "http://192.168.1.137:81",//local
  baseURL: "https://donaide-evmt-stage-api.azurewebsites.net/",//stage

  // baseURL: "https://donaide-prod-web.azurewebsites.net",// for live web check
  //baseURL: "https://donaide-evmt-qa.chetu.com/",
  // baseURL: "https://donaideplusapi.azurewebsites.net",// for live check
  headers: {
    "Content-type": "application/json",
    // "authorization": `Bearer${ JSON.parse(localStorage.getItem("token"))}`

  }

});



