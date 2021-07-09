import "./App.css";

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        My homework <h3 className="header__message"> {props.message} </h3>{" "}
      </header>
    </div>
  );
}

export default App;
