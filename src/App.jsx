import { useEffect, useState } from "react";
import AppRoutes from "./Routes/Router";
import UserContext from "./contexts/UserContext";
import Sidebar from "./components/Sidebar/Sidebar";

import { BrowserRouter as Router } from "react-router-dom";

import style from "./App.module.css";

function App() {
  const [contas, setContasState] = useState([]);
  const [contasSelecionadas, setContasSelecionadas] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPagas, setTotalPagas] = useState(0);
  const [totalAPagar, setTotalAPagar] = useState(0);
  const [totalVencidas, setTotalVencidas] = useState(0);

  const convertToNumber = (number) => {
    const valorTotal = parseFloat(
      number.replace(/[^\d,.-]/g, "").replace(",", ".")
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

  const calcContasPagas = () => {
    const contasPagas = contas.filter((conta) => conta.statusConta);
    if (contasPagas.length > 0) {
      setTotalPagas(
        contasPagas.reduce((a, obj) => {
          return a + convertToNumber(obj.valorConta);
        }, 0)
      );
    } else {
      setTotalPagas(0);
    }
  };

  const calcContasAPagar = () => {
    const contasAPagar = contas.filter((conta) => !conta.statusConta);
    if (contasAPagar.length > 0) {
      setTotalAPagar(
        contasAPagar.reduce((a, obj) => {
          return a + convertToNumber(obj.valorConta);
        }, 0)
      );
    } else {
      setTotalAPagar(0);
    }
  };

  const calcContasVencidas = () => {
    const contasVencidas = contas.filter(
      (conta) => conta.vencConta < new Date().getDate() && !conta.statusConta
    );
    if (contasVencidas.length > 0) {
      setTotalVencidas(
        contasVencidas.reduce((a, obj) => {
          return a + convertToNumber(obj.valorConta);
        }, 0)
      );
    } else {
      setTotalVencidas(0);
    }
  };

  const calcTotalContas = () => {
    setTotal(
      contas.reduce((a, obj) => {
        return a + convertToNumber(obj.valorConta);
      }, 0)
    );
  };

  useEffect(() => {
    calcTotalContas();
    calcContasPagas();
    calcContasAPagar();
    calcContasVencidas();
  }, [contas]);

  return (
    <Router>
      <UserContext.Provider
        value={{
          contas,
          setContas,
          pagarConta,
          removerContas,
          contasSelecionadas,
          selecinaConta,
          tirarSelecaoConta,
          total,
          totalPagas,
          totalAPagar,
          totalVencidas,
        }}
      >
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
