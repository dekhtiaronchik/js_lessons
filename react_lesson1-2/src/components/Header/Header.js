import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { changeIsAuthenticated } from "../../store/profile/actions";

function Header() {
  const isAuthenticated = useSelector((state) => state.profile.isAuthenticated);
  const dispatch = useDispatch();
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log("onAuthStateChanged", { user });
      dispatch(changeIsAuthenticated(Boolean(user)));
    });
  }, []);

  const handleSignOut = (e) => {
    e.preventDefault();

    firebase.auth().signOut();
  };

  return (
    <header>
      <ul>
        {isAuthenticated && (
          <li>
            <Link to="/profile">profile</Link>
          </li>
        )}

        {isAuthenticated && (
          <li>
            <Link to="/chats">chats</Link>
          </li>
        )}

        <li>
          <Link to="/news">news</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signUp">SignUp</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link to="/" onClick={handleSignOut}>
              Sign out
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
