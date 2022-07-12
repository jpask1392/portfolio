import { createContext, useContext, useState } from 'react';

export const CartContext = createContext({
  cart: null,
  setCart: (data: any) => data
});

export function useCartContext() {
  return useContext<any>(CartContext);
}

export function CartContextProvider({ 
  children 
} :{ 
  children: any 
}) {
  const [ cart, setCart ] = useState<any>(null);
  const value = { cart, setCart };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
