import { useContext, useState } from "react";
import style from "./Actionbar.module.css";
import BotaoAddConta from "./BotaoAddConta/BotaoAddConta";
import UserContext from "../../contexts/UserContext";
import ModalRemoverContas from "../ModalRemoverContas/ModalRemoverContas";
import ModalInfo from '../ModalInfo/ModalInfo';

const Actionbar = () => {
  const { contasSelecionadas, pagarConta, desativarConta } =
    useContext(UserContext);

    const [visibilityModalRemoverConta, setVisibilityModalRemoverConta] = useState(false);


    const handlerPagarConta = () => {
      contasSelecionadas.map((conta) => pagarConta(conta, true));
      document.querySelectorAll(".inputSel").forEach(el => el.checked = false);
    }

    const changeVisibilityModal = () => {
      setVisibilityModalRemoverConta(!visibilityModalRemoverConta);
    }

    const removerContas = () => {
      contasSelecionadas.map((conta) => desativarConta(conta))
      document.querySelectorAll(".inputSel").forEach(el => el.checked = false);
      changeVisibilityModal();
    }

  return (
    <div className={style.actionbar}>
      
      {visibilityModalRemoverConta && (
      <ModalInfo
          titleModal="Informações" 
          hideModal={() => changeVisibilityModal()}
          button1={{title: "Fechar", action: () => changeVisibilityModal(), color: "grey"}}
          button2={{title: "SIM, REMOVER", action: () => removerContas(), color: "red"}}
      >
        <p>Deseja realmente remover as contas abaixo?</p>
        <ol style={{fontStyle: "italic", flex: 1}}>
        {
          contasSelecionadas.map(({tituloConta}) => (<li key={tituloConta}>{tituloConta}</li>))
        }
        </ol>
      </ModalInfo>
      )}

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
              onClick={() => changeVisibilityModal()}
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
