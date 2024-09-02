import { useEffect, useState } from "react";
import style from "../PreferenciasPage/Preferencias.module.css";

const Preferencias = () => {
  const [autoSave, setAutoSave] = useState(false);

  useEffect(() => {
    autoSave === true && alert(autoSave);
  }, [autoSave]);

  return (
    <section className={style.container}>
      <h1 className={style.title}>Preferências</h1>

      <form>
        <input
          type="checkbox"
          name="_autoSave"
          id="_autoSave"
          onChange={() => setAutoSave(!autoSave)}
        />

        <label htmlFor="_autoSave" className={style.message}>
          Permitir gravação de contas em sistema local automaticamente.
        </label>
      </form>
    </section>
  );
};

export default Preferencias;
