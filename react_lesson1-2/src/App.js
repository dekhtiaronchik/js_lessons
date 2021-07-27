import "./App.css";
import React from "react";
import Chats from "./components/Chats/Chats";
// import ChatItem from "./components/Chats/ChatItem";
// import ChatList from "./components/Chats/ChatList";

function App() {
  // const [chats, setChats] = React.useState([
  //   { id: "chat123", name: "Чатик 1" },
  //   { id: "chat124", name: "Чатик 2" },
  //   { id: "chat125", name: "Чатик 3" },
  // ]);
  // const [currentChat, setCurrentChat] = React.useState(chats[0]);

  // const handleChangeChat = (chat) => {
  //   setCurrentChat(chat);
  // };

  return (
    <div className="app">
      {/* <div className="container"> */}
      <Chats />
      {/* <ChatList
          chats={chats}
          currentChat={currentChat}
          onChangeChat={handleChangeChat}
        ></ChatList>
        <ChatItem id={currentChat.id}></ChatItem> */}
      {/* </div> */}
    </div>
  );
}

export default App;
