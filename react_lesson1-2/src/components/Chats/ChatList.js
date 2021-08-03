import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addChat, deleteChat } from "../../store/chats/actions";

function ChatList({ chats, currentChatId, onChangeChat }) {
  const [newChatName, setNewChatName] = React.useState("");

  const chatList = useSelector((state) => state.chats);
  const dispatch = useDispatch();

  const handleDeleteChat = (chatId) => {
    dispatch(deleteChat(chatId));
  };

  const handleChange = (e) => setNewChatName(e.target.value);

  const onAddChat = () => {
    dispatch(addChat(newChatName));
    setNewChatName("");
  };

  const listChats = chats.map((chatItem) => (
    <Link
      to={`/chats/${chatItem.id}`}
      className="chat-list__link"
      key={chatItem.id}
    >
      <ListItem
        button
        selected={chatItem.id === currentChatId}
        onClick={() => onChangeChat(chatItem)}
      >
        <ListItemAvatar>
          <Avatar alt={chatItem.name} src="" />
        </ListItemAvatar>

        <ListItemText primary={chatItem.name} />
        <button onClick={() => handleDeleteChat(chatItem.id)}>Удалить</button>
      </ListItem>
    </Link>
  ));

  return (
    <div className="chat-list-container">
      <input value={newChatName} onChange={handleChange}></input>
      <button onClick={onAddChat}>Новый чат</button>

      <List>{listChats}</List>
    </div>
  );
}

export default ChatList;
