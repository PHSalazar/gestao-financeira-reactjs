import { useContext } from "react";
import Card from "./Card/Card";
import UserContext from "../../contexts/UserContext";
import style from "./ContainerCads.module.css";

export const ContainerCads = ({ mesSelecionado }) => {
  const { contas, calcularTotalContas } = useContext(UserContext);

  mesSelecionado = mesSelecionado === "allMonths" ? "" : mesSelecionado;

  return (
    <section className={style.cards}>
      <Card
        valor={calcularTotalContas(contas, (conta) =>
          conta.vencConta.startsWith(mesSelecionado)
        )}
        legenda="Total"
        cor="blue"
        title="Soma de todas as contas que estão cadastradas."
      />
      <Card
        valor={calcularTotalContas(
          contas,
          (conta) =>
            conta.vencConta.startsWith(mesSelecionado) && conta.statusConta
        )}
        legenda="Pagas"
        cor="green"
        title="Soma de todas as contas que já foram pagas."
      />
      <Card
        valor={calcularTotalContas(
          contas,
          (conta) =>
            conta.vencConta.startsWith(mesSelecionado) && !conta.statusConta
        )}
        legenda="A pagar"
        cor="gray"
        title="Soma das contas que ainda não foram pagas."
      />
      <Card
        valor={calcularTotalContas(
          contas,
          (conta) =>
            conta.vencConta.startsWith(mesSelecionado) &&
            new Date(conta.vencConta) < new Date() &&
            !conta.statusConta
        )}
        legenda="Em atraso"
        cor="red"
        title="Soma das contas que já venceram e ainda não foram pagas."
      />
    </section>
  );
};
