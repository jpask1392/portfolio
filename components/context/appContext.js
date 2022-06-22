import { createContext, useContext } from 'react';

const AppContext = createContext();

export function AppWrapper({ children, pageProps }) {
  return (
    <AppContext.Provider value={pageProps}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}