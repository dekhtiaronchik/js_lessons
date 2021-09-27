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
  setTimeout(() => {
    firebase.database().ref("messages").child(chatId).push({
      author: "Bot",
      text: "Message from bot",
    });
  }, 1500);
};

export const subscribeOnMessagesChangings = (chatId) => {
  return (dispatch, getState) => {
    firebase
      .database()
      .ref("messages")
      .child(chatId)
      .on("child_added", (snapshot) => {
        dispatch(addMessage(chatId, snapshot.val()));
      });

    firebase
      .database()
      .ref("messages")
      .child(chatId)
      .on("child_changed", (snapshot) => {
        dispatch(addMessage(chatId, snapshot.val()));
      });
  };
};
