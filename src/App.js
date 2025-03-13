import React from "react";
import "./App.css";

function App({ state, actions }) {
  debugger;
  const changeTitle = () => {
    actions.setMicrofrontendTitle("Home");
  };

  return (
    <div className="App">
      <header className="App-header">
        {state?.microfrontendTitle}
        <button onClick={changeTitle}>mudar titulo</button>
      </header>
    </div>
  );
}

export default App;
