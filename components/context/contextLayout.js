import { CartContextProvider } from './cartContext';
import { UIContextProvider } from './uiContext';
import { GlobalContextProvider } from './globalContext';
import { SmoothScrollProvider } from './smoothScrollContext';
import { AccountProvider } from './accountContext';

export const DefaultLayout = ({ children, pageProps }) => {
  return (
    <GlobalContextProvider 
      pageData={pageProps}
    >
      <UIContextProvider>
        <CartContextProvider>
          <AccountProvider>
            <SmoothScrollProvider options={{ smooth: true, getDirection: true }}>
              {children}
            </SmoothScrollProvider>
          </AccountProvider>
        </CartContextProvider>
      </UIContextProvider>
    </GlobalContextProvider>
  );
}
