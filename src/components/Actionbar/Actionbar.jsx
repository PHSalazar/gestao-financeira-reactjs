import style from './Actionbar.module.css';
import BotaoAddConta from './BotaoAddConta/BotaoAddConta';

const Actionbar = () => {
  return (
    <div className={style.actionbar}>
      <BotaoAddConta />
    </div>
  )
}

export default Actionbar