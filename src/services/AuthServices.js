import config from "../config.json";
import axios from "axios";
// import axios from "./HttpServices"
import token from "./Token.js";

const APIEndpoint = config.DOMAIN_NAME + "/auth";

const register = (data) => {
  // console.log(data);

  return axios({
    method: "post",
    url: APIEndpoint + "/register",
    data:{
      firstname: data["First Name"],
      lastname: data["Last Name"],
      email: data["Email"],
      password: data["Password"],
    },
    //  headers: {Authorization: `Bearer ${token.getAccessToken()}`}
  });
};

  const login = async(data)=>{

    const response = await axios({
      method : "post",
      url: APIEndpoint + '/login',
      data:{
        email : data["Email"],
        password : data["Password"],
      },
      withCredentials:true,
    });
    token.setAccessToken(response.data.access_token);
    return response;
  }
  const googleLogin = async(data)=>{

    const response = await axios({
      method : "post",
      url: APIEndpoint + '/google-login',
      data:{
        token: data["tokenId"],
        email: data["profileObj"]["email"],
        firstname: data["profileObj"]["givenName"],
        lastname: data["profileObj"]["familyName"],
        imagepath: data["profileObj"]["imageUrl"],
        googleId : data["profileObj"]["googleId"],
      },
      withCredentials:true,
    });
    token.setAccessToken(response.data.access_token);
    return response;
  }

  const logout = async (data) => {
    return axios({
      method: "get",
      url: APIEndpoint + "/logout",
    });
  };

export default {register,login,logout, googleLogin};
