import React from "react";
import MessagesList from "../MessageList/MessageList";
import MessageForm from "../MessageForm/MessageForm";

function ChatMessages({ messages, onAddMessage, chatId }) {
  const timer = React.useRef(null);

  const createBotMessage = () => {
    timer.current = setTimeout(() => {
      onAddMessage(chatId, { author: "Bot", text: "Message from bot" });
    }, 1500);
  };

  const onSubmitMessage = (message) => {
    onAddMessage(chatId, { author: "User", text: message });
  };

  React.useEffect(() => {
    return () => clearTimeout(timer.current);
  });

  React.useEffect(() => {
    if (messages.length && messages[messages.length - 1].author === "User") {
      createBotMessage();
    }
  }, [messages]);

  return (
    <div className="chat-item">
      <MessagesList messages={messages} />
      <MessageForm onSubmit={onSubmitMessage} />
    </div>
  );
}

export default ChatMessages;
