import style from "./Sidebar.module.css";
import iconUser from "../../assets/iconUser.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LinkElement } from "./LinkElement";

import iconMenuHome from "../../assets/iconsMenu/iconHome.svg";
import iconMenuGraph from "../../assets/iconsMenu/iconGraph.svg";

const Sidebar = () => {
  const [linksMenu] = useState([
    {
      icon: iconMenuHome,
      link: "/",
      text: "Início",
    },
    {
      icon: iconMenuGraph,
      link: "/relatorios",
      text: "Relatórios [Em Breve]",
    },
  ]);

  return (
    <aside className={style.sidebar}>
      <section className={style.headerSidebar}>
        <figure>
          <img
            src={iconUser}
            alt="Imagem de Perfil do usuário"
            className={style.imgProfile}
          />
        </figure>
        <section className={style.headerText}>
          <h5 className={style.headerUsername}>Administrador</h5>
          <Link to="/" className={style.headerLinkPreferences}>
            Preferências
          </Link>
        </section>
      </section>

      <section className={style.sidebarMenu}>
        {linksMenu.map((itemMenu) => (
          <LinkElement
            icon={itemMenu.icon}
            text={itemMenu.text}
            link={itemMenu.link}
          />
        ))}
      </section>
    </aside>
  );
};

export default Sidebar;
