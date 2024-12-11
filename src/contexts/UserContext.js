import { createContext } from "react";

const UserContext = createContext({
  contas: [],
  setContas: () => {},
  total: 0,
  totalPagas: 0,
  totalAPagar: 0,
  totalVencidas: 0,
});

export default UserContext;
