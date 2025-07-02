import { json, BrowserRouter as Router } from "react-router-dom";
import UserContext from "./contexts/UserContext";
import Sidebar from "./components/Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./Routes/Router";
import style from "./App.module.css";
import { useEffect, useState } from "react";

const App = () => {
  const [contas, setContas] = useState(() => {
    const contasSalvas = localStorage.getItem("contas-GestorDeContasAPagar");
    return contasSalvas ? JSON.parse(contasSalvas) : [];
  });

  useEffect(() => {
    localStorage.setItem("contas-GestorDeContasAPagar", JSON.stringify(contas));
  }, [contas]);

  const calcularTotalContas = (contas, filtro) => {
    if (contas != undefined) {
      const contasFiltradas = contas.filter(filtro);

      var valorSomado = contasFiltradas.reduce((acc, conta) => {
        return acc + conta.valorConta;
      }, 0);

      return valorSomado;
    }
  };

  return (
    <Router>
      <UserContext.Provider
        value={{
          contas,
          setContas,
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
};

export default App;
