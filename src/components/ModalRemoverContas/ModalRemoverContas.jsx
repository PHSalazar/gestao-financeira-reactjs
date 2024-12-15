import React, { useState } from 'react'
import { useContext } from 'react'
import UserContext from '../../contexts/UserContext'
import style from './ModalRemoverContas.module.css';

const ModalRemoverContas = ({hideModal}) => {
    
    const { contasSelecionadas, desativarConta } = useContext(UserContext);

    const handleDesativarConta = () => {
      contasSelecionadas.map((conta) => desativarConta(conta))
      document.querySelectorAll(".inputSel").forEach(el => el.checked = false);
      hideModal();
    }
  return (
    <>
        
            <div className={style.container}>
              <div className={style.wrapper}>
                <h3>Remover Contas</h3>
                <p>Deseja realmente remover as contas abaixo?</p>
                <br />
                <ul style={{fontStyle: "italic"}}>
                    
                    {
                        contasSelecionadas.map(({tituloConta}) => (<li key={tituloConta} style={{listStyle: "none"}}>{tituloConta}</li>))
                    }
                    
                </ul>

                <div>
                  <button className={style.btnCancelar} onClick={hideModal}>Cancelar</button>
                  <button className={style.btnRemover} onClick={() => handleDesativarConta()}>Remover</button>
                </div>
            </div>
            </div>
    </>
  )
}

export default ModalRemoverContas