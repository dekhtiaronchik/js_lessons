import React from "react";

function MessageForm({ onSubmit }) {
  const [text, setText] = React.useState();

  return (
    <div>
      <input
        type="text"
        onChange={(event) => {
          setText(event.target.value);
        }}
      ></input>
      <button onClick={() => onSubmit(text)}>Send</button>
    </div>
  );
}

export default MessageForm;
