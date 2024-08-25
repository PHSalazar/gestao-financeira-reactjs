import style from "./ListaConta.module.css";
import { useContext } from "react";
import UserContext from "../../contexts/UserContext";

const ListaContas = () => {
  const { contas, pagarConta } = useContext(UserContext);

  

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
            contas.map(
              ({ tituloConta, vencConta, valorConta, statusConta }) => (
                <tr key={tituloConta}>
                  <td>
                    <input type="checkbox" name="" id="" />
                  </td>
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
        </tbody>
      </table>


    </div>
  );
};

export default ListaContas;
