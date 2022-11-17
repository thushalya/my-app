import config from "../config.json";
import axios from "axios";
// import axios from "./HttpServices"
// import token from "./Token";

const APIEndpoint = config.DOMAIN_NAME;

const getcryptolist = (data) => {
  console.log(data);

  return axios({
    method: "get",
    url: APIEndpoint + "/getcryptolist",
    //  headers: {Authorization: `Bearer ${token.getAccessToken()}`}
  });
};

const getstocklist = (data) => {
  console.log(data);

  return axios({
    method: "get",
    url: APIEndpoint + "/getstocklist",
    //  headers: {Authorization: `Bearer ${token.getAccessToken()}`}
  });
};

export default{
    getcryptolist,getstocklist
}