import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Profile from "./Profile";

const middlewares = [];
const mockStore = configureStore(middlewares);

it("should dispatch changeName action when checkbox is clicked", () => {
  // arrange
  const initialState = {
    profile: {
      showName: false,
      name: "Default",
      age: "0",
    },
  };
  const store = mockStore(initialState);
  // act
  const component = render(
    <Provider store={store}>
      <Profile />
    </Provider>
  );
  const checkBox = component.getByLabelText("Show Name");
  fireEvent.click(checkBox);

  // assert
  const actions = store.getActions();
  const expectedPayload = { type: "PROFILE::CHANGE_SHOW_NAME" };
  expect(actions).toEqual([expectedPayload]);
});
