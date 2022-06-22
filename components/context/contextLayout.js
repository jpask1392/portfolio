import { CartContextProvider } from './cartContext';
import { UIContextProvider } from './uiContext';
import { GlobalContextProvider } from './globalContext';

export const DefaultLayout = ({ children, pageProps }) => {
  return (
    <GlobalContextProvider 
      globalData={pageProps.global}
    >
      <UIContextProvider>
        <CartContextProvider>
          {children}
        </CartContextProvider>
      </UIContextProvider>
    </GlobalContextProvider>
  );
}
