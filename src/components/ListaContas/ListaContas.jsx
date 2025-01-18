import style from "./ListaConta.module.css";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import Invoice_okIco from "../../assets/invoice_ok.svg";
import PendingIco from "../../assets/icoPending.svg";
import RemoveIco from "../../assets/remove.svg";
import EditIco from "../../assets/icoEdit.svg";
import Infoico from "../../assets/icoInfo.svg";


const ListaContas = () => {

  const {
    contas,
    pagarConta,
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
          {contas.filter((conta) => conta.ativo).length === 0 ? (
            <tr>
              <td colSpan={6}>Por favor, adicione alguma conta à lista.</td>
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
                      className="inputSel"
                        type="checkbox"
                        onChange={(event) =>
                          handleSetContaSelecionada(event, conta)
                        }
                      />
                    </td>
                    <td>{tituloConta} 
                      {obs.length != '' && 
                        <img src={Infoico} width={14} height={14} className={style.btnInfo} />
                      }</td>
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
                        onClick={() => pagarConta(conta, !conta.statusConta)}
                        className={statusConta == true ? style.btnPago : undefined}
                        name={statusConta == true ? "icoRestore" : "icoPay"}
                      >
                        <img
                          src={statusConta == true ? PendingIco : Invoice_okIco}
                          width={18}
                          height={18}
                          title={
                            statusConta == true
                              ? `Restaurar '${tituloConta}' para NÃO PAGO`
                              : `Pagar ${tituloConta}`
                          }
                        />
                      </button>

                      <button onClick={() => desativarConta(conta)} name="icoEdit">
                        <img
                          src={EditIco}
                          width={14}
                          height={14}
                          title={`Editar ${tituloConta}`}
                        />
                      </button>

                      <button onClick={() => desativarConta(conta)} name="icoRemove">
                        <img
                          src={RemoveIco}
                          width={14}
                          height={14}
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
