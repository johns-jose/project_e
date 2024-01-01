import React from "react";
import Header from "../components/header/Header";
import Chat from "../components/chat/Chat";
import './chatPage.css'

function ChatPage() {
  return (
    <div>
      <Header />
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search for friends" className="chatMenuInput" />

          <div>
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
