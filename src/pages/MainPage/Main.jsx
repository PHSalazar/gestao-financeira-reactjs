import ListaContas from "../../components/ListaContas/ListaContas";

import BotaoAddConta from "../../components/Actionbar/BotaoAddConta/BotaoAddConta";
import { ContainerCads } from "../../components/ListaCards/ContainerCads";
import style from "./Main.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../contexts/UserContext";

const Main = () => {
  const inputRefMonth = useRef();
  const { contas } = useContext(UserContext);
  const [contasExibicao, setContasExibicao] = useState([]);

  const [monthSelect, setMonthSelect] = useState([]);

  useEffect(() => {
    const mesesSelect = [];
    var nomesMeses = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];

    contas.forEach((conta) => {
      const [ano, mes] = conta.vencConta.split("-"); // 2025-07-01
      const mesIndex = parseInt(mes, 10) - 1;
      const monthBill = `${nomesMeses[mesIndex]}/${ano}`;

      const hasMonthInList = mesesSelect.some((m) => m.label === monthBill);

      if (!hasMonthInList) {
        mesesSelect.push({ label: monthBill, content: `${ano}-${mes}` });
      }
    });

    setMonthSelect(Array.from(mesesSelect));
  }, []);

  useEffect(() => {
    const contasFiltradas = contas.filter((conta) =>
      conta.vencConta.startsWith(inputRefMonth.current.value)
    );
    setContasExibicao(contasFiltradas);
  }, [contas]);

  const handlerFilterBillsByMonth = () => {
    const contasFiltradas = contas.filter((conta) =>
      conta.vencConta.startsWith(inputRefMonth.current.value)
    );

    setContasExibicao(contasFiltradas);
  };

  return (
    <section>
      <div className={style.container}>
        <ContainerCads />

        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 0",
          }}
        >
          <select
            name="selectMonth"
            id="selectMonth"
            onChange={handlerFilterBillsByMonth}
            ref={inputRefMonth}
          >
            {monthSelect.map(({ label, content }) => (
              <option key={content} value={content}>
                {label}
              </option>
            ))}
          </select>

          <BotaoAddConta />
        </section>

        <ListaContas contasExibicao={contasExibicao} />
      </div>

      {/* <Actionbar /> */}
    </section>
  );
};

export default Main;
