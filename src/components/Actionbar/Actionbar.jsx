import { useContext } from "react";
import style from "./Actionbar.module.css";
import BotaoAddConta from "./BotaoAddConta/BotaoAddConta";
import UserContext from "../../contexts/UserContext";

const Actionbar = () => {
  const { contasSelecionadas, pagarConta, removerContas } =
    useContext(UserContext);

  const pagarContasSelecionadas = () => {
    contasSelecionadas.map((conta) => {
      pagarConta(conta.tituloConta);
    });
  };

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
              onClick={pagarContasSelecionadas}
            >
              Pagar Selecionadas ({contasSelecionadas.length})
            </button>
            <button
              className={`${style.button} ${style.red}`}
              onClick={() => removerContas(contasSelecionadas)}
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
