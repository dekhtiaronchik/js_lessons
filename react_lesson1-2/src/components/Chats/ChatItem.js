import React from "react";
import MessagesList from "../MessageList/MessageList";
import MessageForm from "../MessageForm/MessageForm";

function ChatItem() {
  const [messages, setMessages] = React.useState([]);

  const timer = React.useRef(null);

  const createBotMessage = (messages, setMessages) => {
    timer.current = setTimeout(() => {
      const newMessages = [
        ...messages,
        { author: "Bot", text: "Message from bot" },
      ];
      setMessages(newMessages);
    }, 1500);
  };

  const onSubmitMessage = (message) => {
    const newMessages = [...messages, { author: "User", text: message }];
    setMessages(newMessages);
  };

  React.useEffect(() => {
    return () => clearTimeout(timer.current);
  });

  React.useEffect(() => {
    if (messages.length && messages[messages.length - 1].author === "User") {
      createBotMessage(messages, setMessages);
    }
  }, [messages]);

  return (
    <div className="chat-item">
      <MessagesList messages={messages} />
      <MessageForm onSubmit={onSubmitMessage} />
    </div>
  );
}

export default ChatItem;
