import { createContext, useContext } from 'react';

const GlobalContext = createContext();

export function GlobalContextProvider({ children, globalData }) {
  return (
    <GlobalContext.Provider value={globalData}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
