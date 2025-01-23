import { useEffect, useState } from "react";
import AppRoutes from "./Routes/Router";
import UserContext from "./contexts/UserContext";
import Sidebar from "./components/Sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";

import { BrowserRouter as Router, useFetcher } from "react-router-dom";

import style from "./App.module.css";

function App() {
  const [contas, setContasState] = useState([]);
  const [contasSelecionadas, setContasSelecionadas] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPagas, setTotalPagas] = useState(0);
  const [totalAPagar, setTotalAPagar] = useState(0);
  const [totalVencidas, setTotalVencidas] = useState(0);

  useEffect(() => {
    if (contas.length != 0) {
      var textoContas = JSON.stringify(contas);
      localStorage.setItem("contas-GestorDeContasAPagar", textoContas);
    }
  }, [contas]);

  useEffect(() => {
    var contasLocalStorage = JSON.parse(
      localStorage.getItem("contas-GestorDeContasAPagar")
    );

    setContas(contasLocalStorage);
  }, []);

  const convertToNumber = (number) => {
    const valorTotal = parseFloat(
      number
        .replace(/[^\d,.-]/g, "")
        .replace(/\./g, "")
        .replace(",", ".")
    );
    return valorTotal;
  };

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

  const pagarConta = (conta, status) => {
    conta.statusConta = status;
    setContas(contas);
    setContasSelecionadas([]);
  };

  const desativarConta = (conta) => {
    conta.ativo = false;
    setContas(contas);
    setContasSelecionadas([]);
  };

  const selecinaConta = (conta) => {
    setContasSelecionadas([...contasSelecionadas, conta]);
  };

  const tirarSelecaoConta = (conta) => {
    const contas = contasSelecionadas.filter((contaObj) => contaObj != conta);
    setContasSelecionadas(contas);
  };

  const calcularTotalContas = (contas, filtro) => {
    console.log("contas", contas);

    if (contas != undefined) {
      const contasFiltradas = contas.filter(filtro);

      var valorSomado = contasFiltradas.reduce((acc, conta) => {
        return acc + convertToNumber(conta.valorConta);
      }, 0);

      return valorSomado;
    }
  };

  useEffect(() => {
    calcularTotalContas();
  }, [contas]);

  return (
    <Router>
      <UserContext.Provider
        value={{
          contas,
          setContas,
          pagarConta,
          desativarConta,
          contasSelecionadas,
          selecinaConta,
          tirarSelecaoConta,
          calcularTotalContas,
        }}
      >
        <ToastContainer />

        <section className={style.wrapper}>
          <Sidebar />

          <section className={style.container}>
            <AppRoutes />
          </section>
        </section>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
