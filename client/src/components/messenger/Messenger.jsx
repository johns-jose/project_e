import React from "react";
import "./messenger.css";
import Message from "../message/Message";
import Header from "../header/Header";

function Messenger() {
  return (
    <div className="chatBoxContainer">
      <Header />
      <div className="chatBox">
        <div className="chatBoxWrapper">
          <>
            <div className="chatBoxTop">
              <div>
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
              </div>
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="write something..."
              ></textarea>
              <button className="chatSubmitButton">Send</button>
            </div>
          </>

          <span className="noConversationText">
            Open a conversation to start a chat.
          </span>
        </div>
      </div>
    </div>
  );
}

export default Messenger;
