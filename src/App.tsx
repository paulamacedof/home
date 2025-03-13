function App({ state, actions }: any) {
  const handleClick = () => {
    actions.setState("Hello home");
  };

  console.log("Estado atualizado:", state);
  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <header className="text-white text-7xl">Microfrontend HOME</header>
      <p>home state: {state}</p>
      <button onClick={handleClick}>mudar titulo</button>
    </div>
  );
}

export default App;
