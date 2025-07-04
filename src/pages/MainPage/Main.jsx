import ListaContas from "../../components/ListaContas/ListaContas";

import BotaoAddConta from "../../components/Actionbar/BotaoAddConta/BotaoAddConta";
import { ContainerCads } from "../../components/ListaCards/ContainerCads";
import style from "./Main.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "../../contexts/UserContext";
import Navbar from "../../components/Navbar/Navbar";

const Main = () => {
  const { contas } = useContext(UserContext);
  const [contasExibicao, setContasExibicao] = useState([]);
  const [monthSelectOptions, setMonthSelectOptions] = useState([]);
  const [monthSelected, setMonthSelected] = useState("allMonths");

  const getMonths = () => {
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

    setMonthSelectOptions(Array.from(mesesSelect));
  };

  const handlerFilterBillsByMonth = () => {
    const filterLabel =
      monthSelected === "allMonths"
        ? () => true
        : (conta) => conta.vencConta.startsWith(monthSelected);

    const contasFiltradas = contas.filter(filterLabel);

    setContasExibicao(contasFiltradas);
  };

  useEffect(() => {
    getMonths();
  }, [contas]);

  useEffect(() => {
    handlerFilterBillsByMonth();
  }, [contas, monthSelected]);

  return (
    <>
      <Navbar>
        <select
          name="selectMonth"
          id="selectMonth"
          onChange={(e) => setMonthSelected(e.target.value)}
          value={monthSelected}
          style={{
            padding: "8px",
            borderRadius: "10px",
            border: "1px solid #5e6f7733",
            background: "#fff",
          }}
        >
          <option value="allMonths">Todos os meses</option>
          {monthSelectOptions.map(({ label, content }) => (
            <option key={content} value={content}>
              {label}
            </option>
          ))}
        </select>
      </Navbar>

      <section>
        <div className={style.container}>
          <ContainerCads mesSelecionado={monthSelected} />

          <section
            style={{
              display: "flex",
              justifyContent: "right",
              padding: "10px",
            }}
          >
            <BotaoAddConta />
          </section>

          <ListaContas contasExibicao={contasExibicao} />
        </div>

        {/* <Actionbar /> */}
      </section>
    </>
  );
};

export default Main;
