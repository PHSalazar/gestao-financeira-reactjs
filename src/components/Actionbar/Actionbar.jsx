import { useContext } from "react";
import style from "./Actionbar.module.css";
import BotaoAddConta from "./BotaoAddConta/BotaoAddConta";
import UserContext from "../../contexts/UserContext";

const Actionbar = () => {
  const { contasSelecionadas, pagarConta, desativarConta } =
    useContext(UserContext);

  return (
    <div className={style.actionbar}>
      <section>
        {contasSelecionadas.length > 0 && (
          <p>
            <span>{contasSelecionadas.length}</span> contas selecionadas.
          </p>
        )}
      </section>

      <section>
        {contasSelecionadas.length > 0 && (
          <>
            <button
              className={`${style.button} ${style.blue}`}
              onClick={() => contasSelecionadas.map((conta) => pagarConta(conta, !conta.statusConta))}
            >
              Pagar Selecionadas ({contasSelecionadas.length})
            </button>
            <button
              className={`${style.button} ${style.red}`}
              onClick={() => contasSelecionadas.map((conta) => desativarConta(conta))}
            >
              REMOVER Selecionadas ({contasSelecionadas.length})
            </button>
          </>
        )}
      </section>

      <BotaoAddConta />
    </div>
  );
};

export default Actionbar;
