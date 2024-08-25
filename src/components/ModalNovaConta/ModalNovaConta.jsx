import { useContext, useRef } from "react";
import styles from "./ModalNovaConta.module.css";
import UserContext from "../../contexts/UserContext";


const ModalNovaConta = ({ hideModal }) => {
  const inputTitulo = useRef();
  const inputValor = useRef();
  const inputVencimento = useRef();
  const formNovaConta = useRef();

  const { contas, setContas } = useContext(UserContext);


  const upperNomeConta = (nomeConta) => {
    let novoNomeConta = nomeConta.substring(0,1).toUpperCase() + nomeConta.substring(1).toLowerCase();

    return novoNomeConta;
  }
  const submitFormNovaConta = (event) => {

    event.preventDefault();
    
    const novaConta = {
      tituloConta: upperNomeConta(inputTitulo.current.value),
      valorConta: new Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
      }).format(inputValor.current.value),
      vencConta: parseInt(inputVencimento.current.value),
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
          <form onSubmit={submitFormNovaConta} ref={formNovaConta}>
            <input
              type="text"
              placeholder="Título da Conta"
              ref={inputTitulo}
              required
              autoFocus
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
              />

              <label htmlFor="" className={styles.legenda}>
                de cada mês
              </label>
            </div>

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
