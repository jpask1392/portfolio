import { createContext, useContext, useState } from 'react';

export const CartContext = createContext({
  cart: null,
  setCart: (data) => data
});

export function useCartContext() {
  return useContext(CartContext);
}

export function CartContextProvider({ children }) {
  const [ cart, setCart ] = useState(null);
  const value = { cart, setCart };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
