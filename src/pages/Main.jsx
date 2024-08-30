import Card from "../components/Card/Card";
import style from "./Main.module.css";
import ListaContas from "../components/ListaContas/ListaContas";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import Actionbar from "../components/Actionbar/Actionbar";

const Main = () => {
  const { total, totalPagas, totalAPagar, totalVencidas } =
    useContext(UserContext);

  return (
    <section>
      <div className={style.container}>
        <section className={style.cards}>
          <Card
            valor={total}
            legenda="Total"
            cor="blue"
            title="Soma de todas as contas que estão cadastradas."
          />
          <Card
            valor={totalPagas}
            legenda="Pagas"
            cor="green"
            title="Soma de todas as contas que já foram pagas."
          />
          <Card
            valor={totalAPagar}
            legenda="A pagar"
            cor="gray"
            title="Soma das contas que ainda não foram pagas."
          />
          <Card
            valor={totalVencidas}
            legenda="Em atraso"
            cor="red"
            title="Soma das contas que já venceram e ainda não foram pagas."
          />
        </section>
        <ListaContas />
      </div>

      <Actionbar />
    </section>
  );
};

export default Main;
