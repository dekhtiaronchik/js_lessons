import "./App.css";
import React from "react";
import ChatPage from "./components/Chats/ChatPage";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { changeIsAuthed } from "./store/profile/actions";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log("onAuthStateChanged", { user });
      dispatch(changeIsAuthed(Boolean(user)));
    });
  }, []);

  const handleSignOut = (e) => {
    e.preventDefault();

    firebase.auth().signOut();
  };

  return (
    <div className="app">
      <ChatPage />
      <a href="/" onClick={handleSignOut}>
        Sign out
      </a>
    </div>
  );
}

export default App;
