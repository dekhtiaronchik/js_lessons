import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router";
import ChatMessages from "./ChatMessages";
import ChatList from "./ChatList";
import {
  addMessage,
  subscribeOnMessagesChangings,
} from "../../store/messages/actions";

function ChatPage() {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats.chatList);
  const messages = useSelector((state) => state.messages.messageList);
  const [currentChatId, setCurrentChatId] = React.useState(chats[0]?.id);
  const chatMessages = messages[currentChatId] || [];

  const { chatId: chatIdParam } = useParams();

  React.useEffect(() => {
    dispatch(subscribeOnMessagesChangings(currentChatId));
  }, []);

  const handleChangeChat = (chat) => {
    setCurrentChatId(chat.id);
  };

  const onAddMessage = (chatId, message) => {
    dispatch(addMessage(chatId, message));
  };

  const selectedChat = chats.find((chat) => chat.id === chatIdParam);
  if (!selectedChat && chatIdParam) {
    return <Redirect to="/chats" />;
  }

  if (selectedChat && currentChatId !== selectedChat.id) {
    setCurrentChatId(selectedChat.id);
  }

  return (
    <div className="container">
      <ChatList
        chats={chats}
        currentChatId={currentChatId}
        onChangeChat={handleChangeChat}
      ></ChatList>
      {chats.length ? (
        <ChatMessages
          chatId={currentChatId}
          messages={chatMessages}
          onAddMessage={onAddMessage}
        />
      ) : (
        <div>Добавьте новый чат, чтобы начать!</div>
      )}
    </div>
  );
}

export default ChatPage;
