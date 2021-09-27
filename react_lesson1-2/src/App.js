import "./App.css";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import MasterLayout from "./components/MasterLayout";

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <MasterLayout />
      </Provider>
    </React.StrictMode>
  );
}

export default App;
