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
  dispatch(addMessage(chatId, message));
  setTimeout(() => {
    dispatch(
      addMessage(chatId, {
        author: "Bot",
        text: "Message from bot",
      })
    );
  }, 1500);
};
