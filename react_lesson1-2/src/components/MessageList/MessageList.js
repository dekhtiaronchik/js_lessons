import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

function MessagesList(props) {
  const listMessages = props.messages.map((message, index) => (
    <ListItemText
      key={index}
      primary={message.author}
      secondary={message.text}
    ></ListItemText>
  ));
  return <List>{listMessages}</List>;
}

export default MessagesList;
