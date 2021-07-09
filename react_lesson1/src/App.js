import "./App.css";

function Message(props) {
  return <h3 className="header__message"> {props.message} </h3>;
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        My homework
        <Message message="Message from Message component"></Message>
      </header>
    </div>
  );
}

export default App;
