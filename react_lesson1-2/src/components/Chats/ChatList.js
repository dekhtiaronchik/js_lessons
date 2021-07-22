import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

function ChatList({ chats, currentChat, onChangeChat }) {
  const listChats = chats.map((chatItem) => (
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
  ));

  return (
    <div className="chat-list-container">
      <List subheader="Список чатов">{listChats}</List>
    </div>
  );
}

export default ChatList;
