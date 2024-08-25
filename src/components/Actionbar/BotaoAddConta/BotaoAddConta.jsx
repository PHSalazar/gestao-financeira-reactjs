import { useState } from 'react';
import style from './BotaoAddConta.module.css';
import ModalNovaConta from '../../ModalNovaConta/ModalNovaConta';


const BotaoAddConta = () => {
    const [visibilityModal, setVisibilityModal] = useState(false);

    const toggleVisibilityModal = () => {
        setVisibilityModal(!visibilityModal);
    };

  return (
    <>
    <button id={style.addNovaConta} onClick={toggleVisibilityModal}>Adicionar nova conta</button>
    {visibilityModal && (
        <ModalNovaConta hideModal={() => setVisibilityModal(false)} />
      )}
    </>
  )
}

export default BotaoAddConta