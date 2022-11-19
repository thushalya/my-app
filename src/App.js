import React from "react";
import "./App.css";
import Router from "./navigation/Router";
import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import { onMessageListener } from "./firebaseInit";
import ReactNotificationComponent from "./views/notification/ReactNotifications";
import { useDispatch } from "react-redux";
import { increment } from "./redux/notification";


function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });

  const dispatch = useDispatch();

  onMessageListener()
    .then((payload) => {
      console.log("hey hey hey a new notification has arvied", payload);
      callDispatch();
      setShow(true);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
      console.log(payload.notification);
    })
    .catch((err) => console.log("failed: ", err));

  const callDispatch = () => {
    dispatch(increment());
  };

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
