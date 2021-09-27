import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error.message);
    }
    console.log("login!");
  };

  const handleSubmit = () => {
    if (!email || !password) {
      setError("Заполните поля");
      return;
    }
    handleLogin();
  };

  return (
    <div>
      <p>Login</p>
      <div>
        <TextField
          placeholder="Email"
          value={email}
          variant="outlined"
          type="email"
          onChange={handleChangeEmail}
        />
      </div>
      <div>
        <TextField
          placeholder="Password"
          value={password}
          variant="outlined"
          type="password"
          onChange={handleChangePassword}
        />
      </div>
      <div>
        <Button onClick={handleSubmit}>Login</Button>
      </div>
      <p>{error}</p>
    </div>
  );
}

export default Login;
