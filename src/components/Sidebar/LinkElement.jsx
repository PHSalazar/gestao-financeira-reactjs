import { Link } from "react-router-dom";
import style from "./LinkElement.module.css";

export const LinkElement = ({ text, link, icon }) => {
  return (
    <>
      <Link to={link} className={style.LinkElement}>
        <img
          src={icon}
          alt={`Ícone de Menu para ${text}`}
          className={style.icon}
        />
        <p className={style.linkText}>{text}</p>
      </Link>
    </>
  );
};
