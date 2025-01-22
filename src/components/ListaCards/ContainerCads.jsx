import { useContext } from "react";
import Card from "./Card/Card"
import UserContext from "../../contexts/UserContext";
import style from "./ContainerCads.module.css";

export const ContainerCads = () => {

    const { total, totalPagas, totalAPagar, totalVencidas } = useContext(UserContext);

    return (
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
  )
}
