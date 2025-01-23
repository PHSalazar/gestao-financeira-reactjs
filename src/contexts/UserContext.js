import { createContext } from "react";

const UserContext = createContext({
  contas: [],
  setContas: () => {},
});

export default UserContext;
