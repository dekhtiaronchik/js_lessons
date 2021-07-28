import { CHANGE_NAME, CHANGE_SHOW_NAME, CHANGE_AGE } from "./actions";

const initialState = {
  showName: false,
  name: "Default",
  age: "0",
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SHOW_NAME:
      return {
        ...state,
        showName: !state.showName,
      };
    case CHANGE_NAME:
      return {
        ...state,
        name: action.payload.name,
      };
    case CHANGE_AGE:
      return {
        ...state,
        age: action.payload.age,
      };
    default:
      return state;
  }
}
