function MessagesList(props) {
  const listMessages = props.messages.map((message, index) => (
    <li key={index}>
      {message.author}: {message.text}
    </li>
  ));
  return <ul>{listMessages}</ul>;
}

export default MessagesList;
