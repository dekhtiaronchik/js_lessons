import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import App from "../App";
import Profile from "../components/Profile/Profile";
import ChatPage from "./Chats/ChatPage";
import News from "./News/News";
import Login from "./login/Login";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const isAuthed = useSelector((state) => state.profile.isAuthed);
  return isAuthed ? <Route {...props} /> : <Redirect to="/login" />;
};

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
            <Link to="/login">Login</Link>
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

        <PrivateRoute path="/profile">
          <Profile />
        </PrivateRoute>

        <PrivateRoute exact path="/chats">
          <ChatPage />
        </PrivateRoute>

        <PrivateRoute path="/chats/:chatId">
          <ChatPage />
        </PrivateRoute>

        <Route exact path="/news">
          <News />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route>
          <p>404: not found</p>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
