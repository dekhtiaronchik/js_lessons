import firebase from "firebase";

export const ADD_MESSAGE = "MESSAGES:ADD_MESSAGE";

export const addMessage = (chatId, message) => ({
  type: ADD_MESSAGE,
  payload: {
    chatId,
    message,
  },
});

export const addMessageWithThunk = (chatId, message) => (
  dispatch,
  getState
) => {
  firebase.database().ref("messages").child(chatId).push(message);
  dispatch(addMessage(chatId, message));
  setTimeout(() => {
    firebase.database().ref("messages").child(chatId).push({
      author: "Bot",
      text: "Message from bot",
    });
    dispatch(
      addMessage(chatId, {
        author: "Bot",
        text: "Message from bot",
      })
    );
  }, 1500);
};

export const subscribeOnMessagesChangings = (chatId) => {
  return (dispatch, getState) => {
    firebase
      .database()
      .ref("messages")
      .child(chatId)
      .on("child_added", (snapshot) => {
        console.log("child_added", snapshot.val());

        dispatch(addMessage(chatId, snapshot.val()));
      });

    firebase
      .database()
      .ref("messages")
      .child(chatId)
      .on("child_changed", (snapshot) => {
        console.log("child_changed", snapshot.val());

        dispatch(addMessage(chatId, snapshot.val()));
      });
  };
};
