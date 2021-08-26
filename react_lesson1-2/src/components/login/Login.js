import React from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import firebase from "firebase";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isSigningUp, setIsSigningUp] = React.useState(false);

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleIsSigningUpChange = (e) => setIsSigningUp(e.target.checked);

  const handleSignUp = async () => {
    console.log("Создаем новый профиль");
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error.message);
    }
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
    if (isSigningUp) {
      handleSignUp();
      return;
    }
    handleLogin();
  };
  return (
    <div>
      {/* <form onSubmit={handleSubmit}> */}
      <p>{isSigningUp ? "Sign up" : "Login"}</p>
      <FormControlLabel
        control={
          <Checkbox
            checked={isSigningUp}
            onChange={handleIsSigningUpChange}
            color="primary"
          />
        }
        label={<p>Еще нет учетной записи?</p>}
      />
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
        <Button onClick={handleSubmit}>
          {isSigningUp ? "Sign up" : "Login"}
        </Button>
      </div>
      {/* </form> */}
      <p>{error}</p>
    </div>
  );
}

export default Login;
