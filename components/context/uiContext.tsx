import { createContext, useContext, useState } from 'react';

export const UIContext = createContext({
  UI: {
    toasts: [],
    cartActive: false,
  },
  setUI: (data: any) => data
});

export function useUIContext() {
  return useContext(UIContext);
}

export function UIContextProvider({ 
  children 
} : { 
  children: any 
}) {
  const [ UI, setUI ] = useState<any>({
    toasts: [],
    cartActive: false,
  });

  const value = { UI, setUI };

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
}
