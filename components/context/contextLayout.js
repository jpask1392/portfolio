import { CartContextProvider } from './cartContext';
import { UIContextProvider } from './uiContext';
import { GlobalContextProvider } from './globalContext';
import { SmoothScrollProvider } from './smoothScrollContext';

export const DefaultLayout = ({ children, pageProps }) => {
  return (
    <GlobalContextProvider 
      pageData={pageProps}
    >
      <UIContextProvider>
        <CartContextProvider>
          <SmoothScrollProvider options={{ smooth: true, getDirection: true }}>
            {children}
          </SmoothScrollProvider>
        </CartContextProvider>
      </UIContextProvider>
    </GlobalContextProvider>
  );
}
