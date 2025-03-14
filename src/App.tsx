interface AppProps {
  state: {
    home: string;
    statement: string;
    navbar: string;
  };
  actions: {
    setState: (newState: { home: string; statement: string }) => void;
  };
}

function App({ state, actions }: AppProps | any) {
  const handleClick = () => {
    actions.setState({
      ...state,
      home: "home",
    });
  };

  console.log("Estado atualizado:", state);
  return (
    <div className="bg-black-500 h-screen flex justify-center items-center">
      <header className="text-red-500 text-7xl ">Microfrontend HOME</header>
      <p>home state: {state.home}</p>
      <p>statement state: {state.statement}</p>
      <p>navbar state: {state.navbar}</p>
      <button onClick={handleClick}>state home</button>
    </div>
  );
}

export default App;
