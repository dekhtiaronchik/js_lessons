import profileReducer from "./reducer";
import * as actions from "./actions";
it("", () => {
  const expected = {
    showName: true,
    name: "Default",
    age: "0",
  };
  const previousState = {
    showName: false,
    name: "Default",
    age: "0",
  };
  const action = {
    type: actions.CHANGE_SHOW_NAME,
  };
  const received = profileReducer(previousState, action);
  expect(received).toEqual(expected);
});
