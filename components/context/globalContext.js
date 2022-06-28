import { createContext, useContext } from 'react';

const GlobalContext = createContext();

export function GlobalContextProvider({ children, pageData }) {
  return (
    <GlobalContext.Provider value={pageData}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
