import Main from "../pages/Main";
import Relatorio from "../pages/RelatoriosPage/Relatorio";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/gestao-financeira-reactjs/" element={<Main />}></Route>
      <Route
        path="/gestao-financeira-reactjs/relatorios"
        element={<Relatorio />}
      ></Route>
    </Routes>
  );
};

export default AppRoutes;
