import config from "../config.json";
import axios from "axios";
// import axios from "./HttpServices"
import token from "./Token.js";

const APIEndpoint = config.DOMAIN_NAME;

const getNotifications = () => {
    return axios({
        method: "get",
        url: APIEndpoint + '/notifications/history',
        headers: { Authorization: `Bearer ${token.getAccessToken()}` }
    });
};

const getNotificationCount = () => {
    return axios({
        method: "get",
        url: APIEndpoint + '/notifications/get-count',
        headers: { Authorization: `Bearer ${token.getAccessToken()}` }
    });
};

const readNotification = (data) => {
    return axios({
        method: "delete",
        url: APIEndpoint + `/notifications/delete/${data['symbol']}/${data['price']}`,
        headers: { Authorization: `Bearer ${token.getAccessToken()}` }
    });
};

const readAllNotifications = () => {
    return axios({
        method: "delete",
        url: APIEndpoint + `/notifications/delete/all`,
        headers: { Authorization: `Bearer ${token.getAccessToken()}` }
    });
};
// const addMarket = (data) => {
//     return axios({
//         method: "post",
//         url: APIEndpoint + "/add-market",
//         data: {
//             crypto: data["crypto"]
//         },
//         headers: { Authorization: `Bearer ${token.getAccessToken()}` }
//     });
    
// };

// const removeMarket = (data) => {
//     return axios({
//         method: "delete",
//         url: APIEndpoint + "/remove-market",
//         data: {
//             crypto: data
//         },
//         headers: { Authorization: `Bearer ${token.getAccessToken()}` }
//     });
// };

export default{
    getNotifications,
    getNotificationCount,
    readNotification,
    readAllNotifications
};
