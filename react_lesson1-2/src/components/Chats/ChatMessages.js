import React from "react";
import { useDispatch } from "react-redux";
import MessagesList from "../MessageList/MessageList";
import MessageForm from "../MessageForm/MessageForm";
import { addMessageWithThunk } from "../../store/messages/actions";

function ChatMessages({ messages, chatId }) {
  const dispatch = useDispatch();

  const onSubmitMessage = (message) => {
    dispatch(
      addMessageWithThunk(chatId, {
        author: "user",
        text: message,
      })
    );
  };

  return (
    <div className="chat-item">
      <MessagesList messages={messages} />
      <MessageForm onSubmit={onSubmitMessage} />
    </div>
  );
}

export default ChatMessages;
