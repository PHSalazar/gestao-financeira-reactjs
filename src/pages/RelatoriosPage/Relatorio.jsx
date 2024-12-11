import style from "./Relatorio.module.css";
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";

import ReactPDF from "@react-pdf/renderer";
import MyDocument from "../../components/Relatorios/MyDocument";

const Relatorio = () => {
  const { contas, setContas } = useContext(UserContext);

  return (
    <section className={style.container}>
      <h1 className={style.title}>Relatórios</h1>
      {/* <p className={style.message}>
        Esse seção ainda está sendo planejada e logo começará a ser
        desenvolvida.
      </p>
      <p>
        {contas.map((conta) => {
          const { tituloConta, vencConta, valorConta, statusConta } = conta;

          return <p key={tituloConta}>{tituloConta}</p>;
        })}
      </p> */}

      <p>
        <MyDocument />
      </p>
    </section>
  );
};

export default Relatorio;
