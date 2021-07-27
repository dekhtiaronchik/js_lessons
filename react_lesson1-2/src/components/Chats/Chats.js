import React from "react";
import { useParams, Redirect } from "react-router";
import ChatItem from "./ChatItem";
import ChatList from "./ChatList";

function Chats() {
  const { chatId } = useParams();

  const [chats, setChats] = React.useState([
    { id: "chat1", name: "Чатик 1" },
    { id: "chat2", name: "Чатик 2" },
    { id: "chat3", name: "Чатик 3" },
  ]);
  const [currentChat, setCurrentChat] = React.useState(chats[0]);

  const handleChangeChat = (chat) => {
    setCurrentChat(chat);
  };

  const isChatExists = () => {
    return Boolean(chats.find((chat) => chat.id === chatId));
  };

  if (!isChatExists) {
    return <Redirect to="/chats" />;
  }

  return (
    <div className="container">
      <ChatList
        chats={chats}
        currentChat={currentChat}
        onChangeChat={handleChangeChat}
        chatId={chatId}
      ></ChatList>
      <ChatItem id={currentChat.id}></ChatItem>
    </div>
  );
}

export default Chats;
