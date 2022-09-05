import { createContext, useContext, useState } from 'react';

const MouseContext = createContext({
  mouseState: 'default',
});

export function MouseContextProvider({ children }) {
  const [ mouseState, setMouseState ] = useState({
    style: "inactive",
    innerText: ""
  });
  const value = { mouseState, setMouseState };

  return (
    <MouseContext.Provider value={value}>
      {children}
    </MouseContext.Provider>
  );
}

export function useMouseContext() {
  return useContext(MouseContext);
}