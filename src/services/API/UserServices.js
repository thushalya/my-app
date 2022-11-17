import config from "../../config.json";
// import axios from "../HttpServices";
import token from "../Token.js";
import axios from 'axios';

//API endpoint
const APIEndpoint = config.DOMAIN_NAME + "/api";

const updateprofile = (data,id) => {
  console.log(data)
  return axios({
    method: "post",
    url: APIEndpoint + `/user/update-profile/${id}`,
    data: {
      firstname: data["First Name"],
      lastname: data["Last Name"],
      country:data['Country'],
     
      dob:data['DOB']
    },
    headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });
};

const getUser = (id) => {
  return axios({
    method: 'get',
    url: APIEndpoint + `/user/${id}`,
    headers: { Authorization: `Bearer ${token.getAccessToken()}` }
  });
}


const updatePasswordByUser = (data) => {
  console.log("data sent", data)
  return axios({
    method: "post",
    url: APIEndpoint + "/user/update-password-by-user",
    data: {
      new_password: data["password"],
      old_password: data["old_password"],
      user_id: data["user_id"],
    },
    headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });
}


const updatePhoto = (id,formData) => {
  console.log(id,formData)
  return axios({
    method: "post",
    url: APIEndpoint + `/user/update-photo/${id}`,
    data:formData,
    headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });
}


const changeActivation = (data) => {
  return axios({
    method: "post",
    url: APIEndpoint + "/user/change-active",
    data: {
      user_id: data["user_id"],
    },
    headers: { Authorization: `Bearer ${token.getAccessToken()}` },
  });
}


export default {
  updateprofile,
  getUser,
  updatePasswordByUser,
  updatePhoto,
  
  changeActivation
}
