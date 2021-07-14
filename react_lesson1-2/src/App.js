import "./App.css";
import React from "react";
import MessagesList from "./components/MessageList/MessageList";
import MessageForm from "./components/MessageForm/MessageForm";

function Message(props) {
  return <h3 className="header__message"> {props.message} </h3>;
}

const createBotMessage = (messages, setMessages) => {
  setTimeout(() => {
    const newMessages = [
      ...messages,
      { author: "Bot", text: "Message from bot" },
    ];
    setMessages(newMessages);
  }, 1500);
};

function App() {
  const [messages, setMessages] = React.useState([]);

  const onSubmitMessage = (message) => {
    const newMessages = [...messages, { author: "User", text: message }];
    setMessages(newMessages);
  };

  React.useEffect(() => {
    if (messages.length && messages[messages.length - 1].author === "User") {
      createBotMessage(messages, setMessages);
    }
  }, [messages]);

  return (
    <div className="App">
      <header className="App-header">
        My homework
        <Message message="Message from Message component"></Message>
        <MessagesList messages={messages} />
        <MessageForm onSubmit={onSubmitMessage} />
      </header>
    </div>
  );
}

export default App;
