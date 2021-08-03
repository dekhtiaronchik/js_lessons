import { ADD_CHAT, DELETE_CHAT } from "./actions";

const initialState = {
  chatList: [
    {
      id: "id0",
      name: "Chat 1",
    },
    {
      id: "id1",
      name: "Chat 2",
    },
  ],
};

export default function chatsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CHAT:
      return {
        ...state,
        chatList: [
          ...state.chatList,
          {
            id: `id${state.chatList.length}`,
            name: action.payload.name,
          },
        ],
      };
    case DELETE_CHAT: {
      const filtered = state.chatList.filter(
        (chat) => chat.id !== action.payload.chatId
      );
      return {
        ...state,
        chatList: [...filtered],
      };
    }
    default:
      return state;
  }
}
