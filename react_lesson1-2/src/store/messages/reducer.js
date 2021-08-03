import { ADD_MESSAGE } from "./actions";

const initialState = {
  messageList: {},
};

export default function messageReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case ADD_MESSAGE: {
      const currentList = state.messageList[payload.chatId] || [];
      return {
        ...state,
        messageList: {
          ...state.messageList,
          [payload.chatId]: [...currentList, payload.message],
        },
      };
    }
    default:
      return state;
  }
}
