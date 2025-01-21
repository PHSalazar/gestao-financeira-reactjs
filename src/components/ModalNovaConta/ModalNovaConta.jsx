import { useContext, useRef, useState } from "react";
import styles from "./ModalNovaConta.module.css";
import UserContext from "../../contexts/UserContext";

const ModalNovaConta = ({ hideModal, editar = false, dadosParaEditarConta = null }) => {
  const inputTitulo = useRef();
  const inputValor = useRef();
  const inputVencimento = useRef();
  const formNovaConta = useRef();
  const inputOBS = useRef("");

  const { contas, setContas } = useContext(UserContext);
  const [messageModal, setMessageModal] = useState("");

  const upperNomeConta = (nomeConta) => {
    let novoNomeConta =
      nomeConta.substring(0, 1).toUpperCase() +
      nomeConta.substring(1).toLowerCase();

    return novoNomeConta;
  };

  const submitFormNovaConta = (event) => {
    event.preventDefault();

    const verificarConta = contas.some(
      (conta) =>
        conta.tituloConta.toLowerCase() ===
          inputTitulo.current.value.toLowerCase() && conta.ativo
    );

    if (verificarConta && editar == false) {
       setMessageModal(
        "Já existe uma conta com esse título. Tente outro título."
      );
      setTimeout(() => {
        setMessageModal("");
      }, 4000);
      return;
    }
   

    if (inputTitulo.current.value.length > 25) {
      setMessageModal(
        "O título da conta não pode ter mais do que 25 caracteres."
      );
      setTimeout(() => {
        setMessageModal("");
      }, 4000);
      return;
    }

    if (inputOBS.current.value.length > 30) {
      setMessageModal("Observação não pode ter mais do que 25 caracteres.");
      setTimeout(() => {
        setMessageModal("");
      }, 4000);
      return;
    }

    const novaConta = {
      tituloConta: upperNomeConta(inputTitulo.current.value),
      valorConta: new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
      }).format(inputValor.current.value),
      vencConta: parseInt(inputVencimento.current.value),
      statusConta: false,
      obs: inputOBS.current.value,
      ativo: true,
    };

    let contaProcurada;

    if (editar == true) {
      contaProcurada = novaConta;
      let contaProcuradaIndex = contas.findIndex(c => c.tituloConta == dadosParaEditarConta.tituloConta);
      console.log("conta atualizada", contaProcuradaIndex);
      contas[contaProcuradaIndex] = novaConta;
      setContas(contas); // Atualizando todas as contas já cadastradas.
      hideModal();
      return;
    }

    setContas((contasAnteriores) => [...contasAnteriores, novaConta]);
    hideModal();
  };

  return (
    <section className={styles.backModal}>
      <article className={styles.modal}>
        <section className={styles.titleModal}>
          <h3>{editar ? "Editando Conta" : "Adicionando nova conta"}</h3>
          <button className={styles.close} onClick={hideModal}>
            x
          </button>
        </section>
        <section className={styles.content}>
          <form
            onSubmit={submitFormNovaConta}
            ref={formNovaConta}
            onKeyDown={(event) => {
              event.key === "Enter" && event.preventDefault();
            }}
          >
            <input
              type="text"
              placeholder="Título da Conta"
              ref={inputTitulo}
              required
              autoFocus
              defaultValue={editar ? dadosParaEditarConta.tituloConta : ''}
            />
            <input
              type="number"
              name=""
              id=""
              min={0.01}
              step={0.01}
              placeholder="Valor aproximado"
              ref={inputValor}
              required
              defaultValue={editar ? dadosParaEditarConta.valorConta.split(" ")[1]
                .replace(/\./g, "")
                .replace(/,/g, ".")
                : ''}
            />
            <div className={styles.camposVencimento}>
              <input
                type="number"
                name=""
                id=""
                min={1}
                max={31}
                step={1}
                placeholder="Data de Vencimento Mensal"
                ref={inputVencimento}
                required
                defaultValue={editar ? dadosParaEditarConta.vencConta : ''}
              />

              <label htmlFor="" className={styles.legenda}>
                de cada mês
              </label>
            </div>

            <textarea 
                type="text"
                placeholder="Observações" 
                ref={inputOBS} 
                defaultValue={editar ? dadosParaEditarConta.obs : ''}
                />

            <span id="message" className={styles.messageError}>
              {messageModal}
            </span>

            <section className={styles.footer}>
              <button className={styles.btnCancel} onClick={hideModal}>
                Cancelar
              </button>

              <button className={styles.btnSave} type="submit">
                Adicionar
              </button>
            </section>
          </form>
        </section>
      </article>
    </section>
  );
};

export default ModalNovaConta;
