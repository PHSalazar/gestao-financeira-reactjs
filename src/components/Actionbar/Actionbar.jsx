import { useContext, useState } from "react";
import style from "./Actionbar.module.css";
import BotaoAddConta from "./BotaoAddConta/BotaoAddConta";
import UserContext from "../../contexts/UserContext";
import ModalRemoverContas from "../ModalRemoverContas/ModalRemoverContas";

const Actionbar = () => {
  const { contasSelecionadas, pagarConta, desativarConta } =
    useContext(UserContext);

    const [visibilityModalRemoverConta, setVisibilityModalRemoverConta] = useState(false);


    const handlerPagarConta = () => {
      contasSelecionadas.map((conta) => pagarConta(conta, true));
      document.querySelectorAll(".inputSel").forEach(el => el.checked = false);
    }

    const handlerDesativarConta = () => {
      setVisibilityModalRemoverConta(!visibilityModalRemoverConta);
    }

  return (
    <div className={style.actionbar}>
      
      {visibilityModalRemoverConta && (<ModalRemoverContas hideModal={() => handlerDesativarConta()} />)}

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
              onClick={() => handlerPagarConta()}
            >
              Pagar ({contasSelecionadas.length})
            </button>
            <button
              className={`${style.button} ${style.red}`}
              onClick={() => handlerDesativarConta()}
            >
              REMOVER ({contasSelecionadas.length})
            </button>
          </>
        )}
      </section>

      <BotaoAddConta />
    </div>
  );
};

export default Actionbar;
