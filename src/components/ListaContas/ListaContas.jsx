import style from "./ListaConta.module.css";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import Invoice_okIco from "../../assets/invoice_ok.svg";
import PendingIco from "../../assets/icoPending.svg";
import RemoveIco from "../../assets/remove.svg";
import EditIco from "../../assets/icoEdit.svg";
import Infoico from "../../assets/icoInfo.svg";
import ModalInfo from "../ModalInfo/ModalInfo";
import ModalNovaConta from "../ModalNovaConta/ModalNovaConta";

const ListaContas = () => {
  const {
    contas,
    pagarConta,
    desativarConta,
    selecinaConta,
    tirarSelecaoConta,
  } = useContext(UserContext);

  const [visibilityModal, setVisibilityModal] = useState(false);
  const [statusEditarConta, setStatusEditarConta] = useState(false);
  const [dadosParaEditarConta, setDadosParaEditarContas] = useState(null);

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

  const [infoModalVisibity, setInfoModalVisibity] = useState(false);
  const [infoContent, setInfoContent] = useState("");

  const mostrarModal = (texto) => {
    setInfoModalVisibity(true);
    setInfoContent(texto);
  };

  return (
    <div className={style.container}>
      <table className={style.tabelaContas}>
        <thead>
          <tr>
            <th colSpan={5}>Controle de Contas</th>
          </tr>
          <tr>
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
              <td colSpan={5}>Por favor, adicione alguma conta à lista.</td>
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
                      {tituloConta}
                      {obs.length != "" && (
                        <button
                          title="Clique para ver as observações"
                          className={style.btnInfo}
                          onClick={() => mostrarModal(obs)}
                        >
                          <img
                            src={Infoico}
                            width={14}
                            height={14}
                            alt="Botão deobservações"
                          />
                        </button>
                      )}
                    </td>
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
                        className={
                          statusConta == true ? style.btnPago : undefined
                        }
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

                      <button
                        onClick={() => {
                          setStatusEditarConta(true);
                          setVisibilityModal(true);
                          setDadosParaEditarContas(conta);
                        }}
                        name="icoEdit"
                      >
                        <img
                          src={EditIco}
                          width={14}
                          height={14}
                          title={`Editar ${tituloConta}`}
                        />
                      </button>

                      <button
                        onClick={() => desativarConta(conta)}
                        name="icoRemove"
                      >
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

      {infoModalVisibity == true && (
        <ModalInfo
          titleModal="Informações"
          hideModal={() => setInfoModalVisibity(false)}
          button1={{
            title: "Fechar",
            action: () => setInfoModalVisibity(false),
            color: "grey",
          }}
        >
          <p>{infoContent}</p>
        </ModalInfo>
      )}

      {visibilityModal && (
        <ModalNovaConta
          hideModal={() => setVisibilityModal(false)}
          editar={statusEditarConta}
          dadosParaEditarConta={dadosParaEditarConta}
        />
      )}
    </div>
  );
};

export default ListaContas;
