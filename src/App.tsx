function App({ state, actions }: any) {
  const handleClick = () => {
    actions.setState({
      ...state,
      home: "home",
    });
  };

  console.log("Estado atualizado:", state);
  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <header className="text-white text-7xl">Microfrontend HOME</header>
      <p>home state: {state.home}</p>
      <p>statement state: {state.statement}</p>
      <button onClick={handleClick}>state home</button>
    </div>
  );
}

export default App;
