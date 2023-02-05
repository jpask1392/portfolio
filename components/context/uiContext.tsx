import { createContext, useContext, useState, useReducer } from 'react';

const initialState: {
  activeSection: string | null,
  mouse: any
} = {
  activeSection: null,
  mouse: {
    style: "default"
  }
}

function reducer(state: any, action: {
  type: string
  payload: string
}) {
  switch (action.type) {
    case 'updateSection':
      return { ...state, activeSection: action.payload };
    case 'updateMouse':
      return { ...state, activeSection: action.payload };
    default:
      throw new Error();
  }
}

export const UIContext = createContext<{
  UI: any
  dispatch: any
}>({
  UI: initialState,
  dispatch: null
});

export function useUIContext() {
  return useContext(UIContext);
}

export function UIContextProvider({ children } : { children: any }) {
  const [ UI, dispatch ] = useReducer<any>(reducer, initialState);

  return (
    <UIContext.Provider value={{ UI, dispatch }}>
      {children}
    </UIContext.Provider>
  );
}
