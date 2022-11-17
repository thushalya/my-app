import React from "react";
import "./App.css";
import Router from "./navigation/Router";
import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import { onMessageListener } from "./firebaseInit";
import ReactNotificationComponent from "./views/notification/ReactNotifications";
import { useDispatch } from "react-redux";
import { increment } from "./redux/notification";
// import TokenRequest from "../src/views/notification/TokenRequest";
// import { onMessageListener } from "./utils/firebaseInit";
// import {useEffect, useState} from 'react';
// import {onMessageListener} from "./firebaseInit"

const CLIENT_ID = "1061743313688-iokgsqk1gm07khha74tq9evt4k798ucf.apps.googleusercontent.com";

function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (show) {
  //     dispatch(increment());
  //   }
  // }, [show]);
  onMessageListener()
    .then((payload) => {
      console.log("hey hey hey a new notification has arvied", payload);
      callDispatch();
      setShow(true);
      // toast.success(`${payload.notification.body}`)
      setNotification({
        // title: 'New notification',
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log(payload.notification);
    })
    .catch((err) => console.log("failed: ", err));

  const callDispatch = () => {
    dispatch(increment());
  };
  useEffect(() => {
    function start() {
      gapi.auth2.init({
        client_id: CLIENT_ID,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });

  return (
    <div className="App">
      <Router />
      {show && (
        <ReactNotificationComponent
          title={notification.title}
          body={notification.body}
        />
      )}
      
      
    </div>
  );
}

export default App;
