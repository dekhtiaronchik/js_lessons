import "./App.css";
import React from "react";
import ChatItem from "./components/Chats/ChatItem";
import ChatList from "./components/Chats/ChatList";

function App() {
  const [chats, setChats] = React.useState([
    { id: 123, name: "Чатик 1" },
    { id: 124, name: "Чатик 2" },
    { id: 125, name: "Чатик 3" },
  ]);
  const [currentChat, setCurrentChat] = React.useState(chats[0]);

  const handleChangeChat = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="app">
      <div className="container">
        <ChatList
          chats={chats}
          currentChat={currentChat}
          onChangeChat={handleChangeChat}
        ></ChatList>
        <ChatItem id={currentChat.id}></ChatItem>
      </div>
    </div>
  );
}

export default App;
