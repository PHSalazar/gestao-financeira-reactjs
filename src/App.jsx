import { useState } from "react";
import AppRoutes from "./Routes/Router";
import UserContext from "./contexts/UserContext";

function App() {
  const [contas, setContasState] = useState([]);

  const setContas = (contaNova) => {
    if (typeof contaNova === "function") {
      setContasState((contasAnteriores) => {
        const newContas = contaNova(contasAnteriores);
        return [...newContas].sort((a, b) => a.vencConta - b.vencConta);
      });
    } else if (Array.isArray(contaNova)) {
      const ordenarContas = [...contaNova].sort(
        (a, b) => a.vencConta - b.vencConta
      );
      setContasState(ordenarContas);
    } else {
      console.error(
        "setContas expects an array or a function, but received:",
        contaNova
      );
    }
  };

  const pagarConta = (contaTitulo) => {
    setContas((contasAnteriores) => 
      contasAnteriores.map((conta) => 
      conta.tituloConta === contaTitulo ? {...conta, statusConta: true} : conta
      )
    );
  }

  return (
    <UserContext.Provider value={{ contas, setContas, pagarConta }}>
      <AppRoutes />
    </UserContext.Provider>
  );
}

export default App;
