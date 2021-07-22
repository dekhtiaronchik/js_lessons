import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function MessageForm({ onSubmit }) {
  const [text, setText] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(text);
    setText("");
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="message-container">
        <div className="message-container__text_field">
          <TextField
            className="message__text_field"
            variant="outlined"
            autoFocus
            required
            fullWidth
            placeholder="Введите сообщение"
            label="Сообщение"
            value={text}
            onChange={handleChange}
          />
        </div>
        <div className="message-container__button">
          <Button
            type="Submit"
            className="message__button"
            variant="outlined"
            color="primary"
          >
            Отправить
          </Button>
        </div>
      </div>
    </form>
  );
}

export default MessageForm;
