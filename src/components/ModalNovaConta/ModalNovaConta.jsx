import { useContext, useRef, useState } from "react";
import styles from "./ModalNovaConta.module.css";
import UserContext from "../../contexts/UserContext";

import { toast } from "react-toastify";

const ModalNovaConta = ({
  hideModal,
  editar = false,
  dadosParaEditarConta = null,
}) => {
  const inputTitulo = useRef();
  const inputValor = useRef();
  const inputVencimento = useRef();
  const inputRepet = useRef();
  const formNovaConta = useRef();
  const inputOBS = useRef("");

  const { contas, setContas } = useContext(UserContext);
  const [messageModal, setMessageModal] = useState("");

  const [repetMonthly, setRepetMonthly] = useState(false);

  const upperNomeConta = (nomeConta) => {
    let novoNomeConta =
      nomeConta.substring(0, 1).toUpperCase() +
      nomeConta.substring(1).toLowerCase();

    return novoNomeConta;
  };

  const getDataHoje = () => {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
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

    const novasContas = [];
    const quantMeses = repetMonthly ? parseInt(inputRepet.current.value) : 1;

    for (let i = 0; i < quantMeses; i++) {
      const dataVencimento = new Date(inputVencimento.current.value);
      dataVencimento.setMonth(dataVencimento.getMonth() + i);

      const novaConta = {
        tituloConta: upperNomeConta(inputTitulo.current.value),
        valorConta: parseFloat(inputValor.current.value),
        vencConta: dataVencimento.toISOString().split("T")[0],
        statusConta: false,
        repetFor: quantMeses,
        obs: inputOBS.current.value,
      };

      novasContas.push(novaConta);
    }

    if (editar == true) {
      let contaProcuradaIndex = contas.findIndex(
        (c) => c.tituloConta == dadosParaEditarConta.tituloConta
      );
      contas[contaProcuradaIndex] = novasContas[0];
      setContas(contas); // Atualizando todas as contas já cadastradas.

      toast.success(`${novasContas[0].tituloConta} atualizada com sucesso.`, {
        position: "top-right",
        autoClose: true,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      hideModal();
      return;
    }

    setContas((contasAnteriores) => [...contasAnteriores, ...novasContas]);
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
              defaultValue={editar ? dadosParaEditarConta.tituloConta : ""}
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
              defaultValue={editar ? dadosParaEditarConta.valorConta : ""}
            />
            <div className={styles.camposVencimento}>
              <input
                type="date"
                ref={inputVencimento}
                required
                defaultValue={
                  editar ? dadosParaEditarConta.vencConta : getDataHoje()
                }
              />

              <div>
                <input
                  type="checkbox"
                  name="repetMonthy"
                  id="repetMonthly"
                  onChange={(e) => setRepetMonthly(e.target.checked)}
                />
                <label htmlFor="repetMonthly" className={styles.legenda}>
                  Repetir mensalmente
                </label>
              </div>
            </div>

            {repetMonthly && (
              <>
                <label
                  htmlFor="labelnumberRepetMonthly"
                  style={{ color: "#888", paddingLeft: "8px" }}
                >
                  Repetir por (x) meses
                </label>
                <input
                  type="number"
                  name="numberRepetMonthly"
                  id="numberRepetMonthly"
                  min={2}
                  max={12}
                  required
                  placeholder="Número de meses que essa conta deve ser paga"
                  defaultValue={editar ? dadosParaEditarConta.repetMonthky : 1}
                  ref={inputRepet}
                />
              </>
            )}

            <textarea
              type="text"
              placeholder="Observações"
              ref={inputOBS}
              defaultValue={editar ? dadosParaEditarConta.obs : ""}
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
