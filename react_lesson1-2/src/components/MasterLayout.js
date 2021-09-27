import React from "react";
import { Switch, Route, Redirect } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header/Header";
import Profile from "./Profile/Profile";
import ChatPage from "./Chats/ChatPage";
import News from "./News/News";
import Login from "./login/Login";
import SignUp from "./SignUp/SignUp";
import HomePage from "./HomePage";
import { useSelector } from "react-redux";

const PrivateRoute = (props) => {
  const isAuthenticated = useSelector((state) => state.profile.isAuthenticated);
  return isAuthenticated ? <Route {...props} /> : <Redirect to="/login" />;
};

export default function MasterLayout(props) {
  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route exact path="/">
          <HomePage />
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

        <Route exact path="/signUp">
          <SignUp />
        </Route>

        <Route>
          <p>404: not found</p>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
