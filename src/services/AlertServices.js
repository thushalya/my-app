import config from "../config.json";
import axios from "axios";
// import axios from "./HttpServices"
import token from "./Token.js";

const APIEndpoint = config.DOMAIN_NAME;

const getAllAlerts = () => {
    return axios({
        method: 'get',
        url: APIEndpoint + `/alert/get-all-alerts`,
        headers: { Authorization: `Bearer ${token.getAccessToken()}` }
    });
};

const getAlerts = (data) => {
    return axios({
        method: 'get',
        url: APIEndpoint + `/alert/get-alerts/${data}`,
        headers: { Authorization: `Bearer ${token.getAccessToken()}` }
    });
};


const addAlert = (data) => {
    return axios({
        method: 'post',
        url: APIEndpoint + `/alert/add-alert/${data.crypto_name}/${data.crypto_price}`,
        headers: { Authorization: `Bearer ${token.getAccessToken()}` }
    });
}

const removeAlert = (data) => {
    return axios({
        method: 'delete',
        url: APIEndpoint + `/alert/remove-alert/${data.crypto_name.split('/')[0]}/${data.crypto_price}`,
        data: data,
        headers: { Authorization: `Bearer ${token.getAccessToken()}` }
    });
}

const addToken = (token_) => {
    return axios({
        method: 'post',
        url: APIEndpoint + `/alert/add-token/${token_}`,
        headers: { Authorization: `Bearer ${token.getAccessToken()}` }
    });
}

const removeToken = (token_) => {
    return axios({
        method: 'delete',
        url: APIEndpoint + `/alert/remove-token/${token_}`,
        headers: { Authorization: `Bearer ${token.getAccessToken()}` }
    });
}

export default{
    getAlerts,
    addAlert,
    removeAlert,
    addToken,
    getAllAlerts,
    removeToken,

};