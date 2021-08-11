import React from "react";
import { Switch, Route } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import App from "../App";
import Profile from "../components/Profile/Profile";
import ChatPage from "./Chats/ChatPage";
import News from "./News/News";

export default function Routes(props) {
  return (
    <BrowserRouter>
      <header>
        <ul>
          <li>
            <Link to="/profile">profile</Link>
          </li>

          <li>
            <Link to="/chats">chats</Link>
          </li>

          <li>
            <Link to="/news">news</Link>
          </li>

          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </header>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>

        <Route path="/profile">
          <Profile />
        </Route>

        <Route exact path="/chats">
          <ChatPage />
        </Route>

        <Route path="/chats/:chatId">
          <ChatPage />
        </Route>

        <Route exact path="/news">
          <News />
        </Route>

        <Route>
          <p>404: not found</p>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
