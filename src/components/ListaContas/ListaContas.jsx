import style from "./ListaConta.module.css";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import Invoice_okIco from "../../assets/invoice_ok.svg";
import RemoveIco from "../../assets/remove.svg";

const ListaContas = () => {
  const { contas, pagarConta, removerConta, selecinaConta, tirarSelecaoConta } =
    useContext(UserContext);

  const checkStatus = (statusConta, dataVencimento) => {
    if (statusConta) {
      return style.pronto;
    }

    const dataAtual = new Date().getDate();
    const status = dataAtual > dataVencimento;
    let retorno;

    if (status) {
      retorno = style.vencido;
    } else {
      retorno = style.aVenc;
    }
    return retorno;
  };

  const handlePagarConta = (contaTitulo) => {
    pagarConta(contaTitulo);
  };

  const handleRemoverConta = (contaTitulo) => {
    removerConta(contaTitulo);
  };

  const handleSetContaSelecionada = (event, conta) => {
    event.target.checked ? selecinaConta(conta) : tirarSelecaoConta(conta);
  };

  return (
    <div className={style.container}>
      <table className={style.tabelaContas}>
        <thead>
          <tr>
            <th colSpan={6}>Controle de Contas</th>
          </tr>
          <tr>
            <th>#</th>
            <th>Conta</th>
            <th>Venc.</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {contas.length === 0 ? (
            <tr>
              <td colSpan={6}>Por favor, adicione alguma conta à lista.</td>
            </tr>
          ) : (
            contas.map((conta) => {
              const { tituloConta, vencConta, valorConta, statusConta } = conta;

              return (
                <tr key={tituloConta}>
                  <td>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      onChange={(event) =>
                        handleSetContaSelecionada(event, conta)
                      }
                    />
                  </td>
                  <td>{tituloConta}</td>
                  <td>
                    Dia <b>{vencConta}</b> de cada mês
                  </td>
                  <td>{valorConta}</td>
                  <td>
                    <span
                      className={`${style.statusConta} ${checkStatus(
                        statusConta,
                        vencConta
                      )}`}
                    ></span>
                  </td>
                  <td>
                    <button
                      onClick={() => handlePagarConta(tituloConta)}
                      disabled={statusConta}
                    >
                      <img
                        src={Invoice_okIco}
                        width={18}
                        height={18}
                        title={
                          tituloConta === true
                            ? `${tituloConta} já está PAGO.`
                            : `Pagar ${tituloConta}`
                        }
                      />
                    </button>
                    <button onClick={() => handleRemoverConta(conta)}>
                      <img
                        src={RemoveIco}
                        width={18}
                        height={18}
                        title={`Remover ${tituloConta}`}
                      />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListaContas;
