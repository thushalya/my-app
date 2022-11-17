

import config from "../../config.json";
// import axios from "../HttpServices";
// import token from "../Token";
import axios from 'axios';
const APIEndpoint = config.DOMAIN_NAME + "/admin";

const getUsers = (skip,take,search, filter)=> {
    let query = `/users?skip=${skip}&take=${take}`;
    if (search){
        query += `&search_by=${search}`;
    }
    if (filter==""){
      query += `&filter_by=firstname`;
    }
    else{
      query += `&filter_by=${filter}`;
    }
    return axios({
      method: "get",
      url: APIEndpoint +query,
    //   data: {
    //     new_password: data["password"],
    //     old_password: data["old_password"],
    //     user_id: data["user_id"],
    //   },
    //   headers: { Authorization: `Bearer ${token.getAccessToken()}` },
    });
  }
  
export default {
    getUsers
}
  