import { useContext, useRef, useState } from "react";
import styles from "./ModalNovaConta.module.css";
import UserContext from "../../contexts/UserContext";

const index = ({ hideModal }) => {
  const inputTitulo = useRef();
  const inputValor = useRef();
  const inputVencimento = useRef();
  const formNovaConta = useRef();

  // const { contas } = useContext(UserContext);
  const { contas, setContas } = useContext(UserContext);

  const submitFormNovaConta = () => {
    event.preventDefault();
    const novaConta = {
      tituloConta: inputTitulo.current.value,
      valorConta: new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
      }).format(inputValor.current.value),
      vencConta: inputVencimento.current.value,
      statusConta: false,
    };

    setContas((contasAnteriores) => [...contasAnteriores, novaConta]);
    hideModal();
  };

  return (
    <section className={styles.backModal}>
      <article className={styles.modal}>
        <section className={styles.titleModal}>
          <h3>Adicionando nova conta</h3>
          <button className={styles.close} onClick={hideModal}>
            x
          </button>
        </section>
        <section className={styles.content}>
          <form action="/" onSubmit={submitFormNovaConta} ref={formNovaConta}>
            <input
              type="text"
              placeholder="Título da Conta"
              ref={inputTitulo}
            />
            <input
              type="number"
              name=""
              id=""
              step={1}
              placeholder="Valor aproximado"
              ref={inputValor}
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
              />

              <label htmlFor="" className={styles.legenda}>
                de cada mês
              </label>
            </div>
          </form>
        </section>

        <section className={styles.footer}>
          <button className={styles.btnCancel} onClick={hideModal}>
            Cancelar
          </button>
          <button className={styles.btnSave} onClick={submitFormNovaConta}>
            Adicionar
          </button>
        </section>
      </article>
    </section>
  );
};

export default index;
