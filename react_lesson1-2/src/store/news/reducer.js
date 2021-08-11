import {
  SET_ERROR_STATUS,
  SET_IDLE_STATUS,
  SET_LOADING_STATUS,
  SET_NEWS_LIST,
} from "./actions";

const initialState = {
  list: [],
  status: "idle",
};

export default function newsReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_ERROR_STATUS:
      return {
        ...state,
        status: "error",
      };
    case SET_IDLE_STATUS:
      return { ...state, status: "idle" };
    case SET_LOADING_STATUS:
      return {
        ...state,
        status: "loading",
      };
    case SET_NEWS_LIST:
      return { ...state, list: payload.newsList };
    default:
      return state;
  }
}
