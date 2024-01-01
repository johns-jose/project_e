import React from "react";
import "./message.css";

function Message() {
  return (
    <div className={"message own,message"}>
      <div className="messageTop">
        <img className="messageImg" src="./images/Service 24_7.svg" alt="" />
        <p className="messageText">hello How are you</p>
      </div>
      <div className="messageBottom">2 days ago</div>
    </div>
  );
}

export default Message;
