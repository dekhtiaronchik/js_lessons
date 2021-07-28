import React from "react";
import { useParams, Redirect } from "react-router";
import ChatMessages from "./ChatMessages";
import ChatList from "./ChatList";

const initialChats = [
  {
    id: "chat1",
    name: "Chat1",
    messages: [{ text: "FirstMessage", author: "Bot" }],
  },
  {
    id: "chat2",
    name: "Chat2",
    messages: [{ text: "FirstMessageHereToo!", author: "Bot" }],
  },
  {
    id: "chat3",
    name: "Chat3",
    messages: [{ text: "FirstMessageHereToo!", author: "Bot" }],
  },
];

function ChatPage() {
  const { chatId: chatIdParam } = useParams();

  const [chats, setChats] = React.useState(initialChats);
  const [currentChatId, setCurrentChatId] = React.useState(chats[0].id);

  const handleChangeChat = (chat) => {
    setCurrentChatId(chat.id);
  };

  const onAddMessage = (chatId, newMessage) => {
    const targetChatIndex = chats.findIndex((chat) => chat.id === chatId);
    if (targetChatIndex === -1) {
      return;
    }
    const targetChat = chats[targetChatIndex];
    const newChat = {
      ...targetChat,
      messages: [...targetChat.messages, newMessage],
    };
    const newChats = [
      ...chats.slice(0, targetChatIndex),
      newChat,
      ...chats.slice(targetChatIndex + 1),
    ];
    setChats(newChats);
  };

  const selectedChat = chats.find((chat) => chat.id === chatIdParam);
  if (!selectedChat && chatIdParam) {
    return <Redirect to="/chats" />;
  }

  if (selectedChat && currentChatId !== selectedChat.id) {
    setCurrentChatId(selectedChat.id);
  }
  const currentChat = chats.find((chat) => chat.id === currentChatId);

  return (
    <div className="container">
      <ChatList
        chats={chats}
        currentChatId={currentChatId}
        onChangeChat={handleChangeChat}
      ></ChatList>
      <ChatMessages
        chatId={currentChatId}
        messages={currentChat.messages}
        onAddMessage={onAddMessage}
      ></ChatMessages>
    </div>
  );
}

export default ChatPage;
