import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { Link } from "react-router-dom";

function ChatList({ chats, currentChat, onChangeChat, chatId }) {
  const listChats = chats.map((chatItem) => (
    <Link to={`/chats/${chatItem.id}`} className="chat-list__link">
      <ListItem
        button
        key={chatItem.id}
        selected={chatItem.id === currentChat.id}
        onClick={() => onChangeChat(chatItem)}
      >
        <ListItemAvatar>
          <Avatar alt={chatItem.name} src="" />
        </ListItemAvatar>

        <ListItemText primary={chatItem.name} />
      </ListItem>
    </Link>
  ));

  return (
    <div className="chat-list-container">
      <List subheader="Список чатов">{listChats}</List>
    </div>
  );
}

export default ChatList;
