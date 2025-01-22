import ListaContas from "../../components/ListaContas/ListaContas";

import BotaoAddConta from "../../components/Actionbar/BotaoAddConta/BotaoAddConta";
import { ContainerCads } from "../../components/ListaCards/ContainerCads";
import style from "./Main.module.css";

const Main = () => {
  return (
    <section>
      

      <div className={style.container}>
        <ContainerCads />

        <BotaoAddConta />

        <ListaContas />
      </div>

      {/* <Actionbar /> */}
    </section>
  );
};

export default Main;
