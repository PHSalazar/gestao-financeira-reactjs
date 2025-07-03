import style from "./Navbar.module.css";

const Navbar = ({ children }) => {
  return <nav className={style.nav}>{children}</nav>;
};

export default Navbar;
