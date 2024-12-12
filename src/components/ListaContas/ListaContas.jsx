import style from "./ListaConta.module.css";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import Invoice_okIco from "../../assets/invoice_ok.svg";
import RemoveIco from "../../assets/remove.svg";

const ListaContas = () => {
  const {
    contas,
    pagarConta,
    // removerContas,
    desativarConta,
    selecinaConta,
    tirarSelecaoConta,
  } = useContext(UserContext);

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

  const handleDesativarConta = (conta) => {
    desativarConta(conta);
  };

  const handleSetContaSelecionada = (event, conta) => {
    event.target.checked ? selecinaConta(conta) : tirarSelecaoConta(conta);
  };

  return (
    <div className={style.container}>
      <table className={style.tabelaContas}>
        <thead>
          <tr>
            <th colSpan={7}>Controle de Contas</th>
          </tr>
          <tr>
            <th>#</th>
            <th>Conta</th>
            <th>Venc.</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Ações</th>
            <th>OBS</th>
          </tr>
        </thead>
        <tbody>
          {contas.filter((conta) => conta.ativo).length === 0 ? (
            <tr>
              <td colSpan={7}>Por favor, adicione alguma conta à lista.</td>
            </tr>
          ) : (
            contas
              .filter((conta) => conta.ativo)
              .map((conta) => {
                const { tituloConta, vencConta, valorConta, statusConta, obs } =
                  conta;

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
                      <b>{vencConta}</b>
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
                    <td className={style.acoes}>
                      <button
                        onClick={() => handlePagarConta(conta)}
                        // disabled={statusConta}
                        className={statusConta == true && style.btnPago}
                      >
                        <img
                          src={Invoice_okIco}
                          width={18}
                          height={18}
                          title={
                            statusConta == true
                              ? `'${tituloConta}' já está PAGO.`
                              : `Pagar ${tituloConta}`
                          }
                        />
                      </button>
                      <button onClick={() => handleDesativarConta(conta)}>
                        <img
                          src={RemoveIco}
                          width={18}
                          height={18}
                          title={`Remover ${tituloConta}`}
                        />
                      </button>
                    </td>
                    <td>{obs}</td>
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
