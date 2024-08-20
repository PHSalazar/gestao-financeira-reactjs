import style from "./ListaConta.module.css";
import ModalNovaConta from "../ModalNovaConta";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/UserContext";

const index = () => {
  const [visibilityModal, setVisibilityModal] = useState(false);
  const { contas, pagarConta } = useContext(UserContext);

  const toggleVisibilityModal = () => {
    setVisibilityModal(!visibilityModal);
  };

  const checkStatus = (statusConta, dataVencimento) => {
    if (statusConta) {
      return style.pronto;
    }

    
    const dataAtual = new Date().getDate();
    const status = dataAtual > dataVencimento;
    let retorno;

    if (status) {
      retorno = style.vencido;
    }else{
      retorno = style.aVenc;
    }
    return retorno;
  };

  const handlePagarConta = (contaTitulo) => {
    pagarConta(contaTitulo);
  }

  return (
    <div className={style.container}>
      <h4>Lista de Contas a Pagar</h4>

      <table className={style.tabelaContas}>
        <thead>
          <tr>
            <th>Conta</th>
            <th>Vencimento</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {contas.length === 0 ? (
            <tr>
              <td colSpan={5}>Por favor, adicione alguma conta à lista.</td>
            </tr>
          ) : (
            contas.map(
              ({ tituloConta, vencConta, valorConta, statusConta }) => (
                <tr key={tituloConta}>
                  <td>{tituloConta}</td>
                  <td>
                    Dia <b>{vencConta}</b> de cada mês
                  </td>
                  <td>{valorConta}</td>
                  <td>
                    <span
                      className={`${style.statusConta} ${
                        checkStatus(statusConta, vencConta)
                      }`}
                    >
                    </span>
                  </td>
                  <td>
                    <button onClick={() => handlePagarConta(tituloConta)}>pagar</button>
                  </td>
                </tr>
              )
            )
          )}

          <tr>
            <td colSpan={5}>
              <button id={style.addNovaConta} onClick={toggleVisibilityModal}>
                Adicionar nova conta
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {visibilityModal && (
        <ModalNovaConta hideModal={() => setVisibilityModal(false)} />
      )}
    </div>
  );
};

export default index;
