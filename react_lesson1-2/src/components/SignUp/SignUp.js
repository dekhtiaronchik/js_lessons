import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import firebase from "firebase";

export default function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUp = async () => {
    console.log("Создаем новый профиль");
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = () => {
    if (!email || !password) {
      setError("Заполните поля");
      return;
    }
    handleSignUp();
  };

  return (
    <div>
      <p>Sign up</p>
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
        <Button onClick={handleSubmit}>SignUp</Button>
      </div>
      <p>{error}</p>
    </div>
  );
}
