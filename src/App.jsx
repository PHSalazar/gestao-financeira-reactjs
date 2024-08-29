import { useState } from "react";
import AppRoutes from "./Routes/Router";
import UserContext from "./contexts/UserContext";
import Sidebar from "./components/Sidebar/Sidebar";

import style from "./App.module.css";

function App() {
  const [contas, setContasState] = useState([]);
  const [contasSelecionadas, setContasSelecionadas] = useState([]);

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
        conta.tituloConta === contaTitulo
          ? { ...conta, statusConta: true }
          : conta
      )
    );
    setContasSelecionadas([]);
  };

  const removerContas = (contasParaRemover) => {
    const contasRemovidas = contas.filter(
      (conta) => !contasParaRemover.includes(conta)
    );
    setContas(contasRemovidas);
    setContasSelecionadas([]);
  };

  const selecinaConta = (conta) => {
    setContasSelecionadas([...contasSelecionadas, conta]);
  };

  const tirarSelecaoConta = (conta) => {
    const contas = contasSelecionadas.filter((contaObj) => contaObj != conta);
    setContasSelecionadas(contas);
  };

  return (
    <UserContext.Provider
      value={{
        contas,
        setContas,
        pagarConta,
        removerContas,
        contasSelecionadas,
        selecinaConta,
        tirarSelecaoConta,
      }}
    >
      <section className={style.wrapper}>
        <Sidebar />

        <section className={style.container}>
          <AppRoutes />
        </section>
      </section>
    </UserContext.Provider>
  );
}

export default App;
