import React from "react";
import { useParams, Redirect } from "react-router";
import ChatItem from "./ChatItem";
import ChatList from "./ChatList";

function ChatPage() {
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

  const selectedChat = chats.find((chat) => chat.id === chatId);
  if (!selectedChat && chatId) {
    return <Redirect to="/chats" />;
  }

  if (selectedChat && currentChat.id !== selectedChat.id) {
    setCurrentChat(selectedChat);
  }

  return (
    <div className="container">
      <ChatList
        chats={chats}
        currentChat={currentChat}
        onChangeChat={handleChangeChat}
      ></ChatList>
      <ChatItem id={currentChat.id}></ChatItem>
    </div>
  );
}

export default ChatPage;
