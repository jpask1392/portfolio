import { ScrollContextProvider } from './scroll';
import { UIContextProvider } from './uiContext';
import { GlobalContextProvider } from './globalContext';
import { WagmiContextProvider } from './wagmiContext';
import { AuthContextProvider } from './authContext';

export const DefaultLayout = ({ children, pageProps }) => {
  return (
    <GlobalContextProvider 
      pageData={pageProps}
    >
      <UIContextProvider>
        
          <WagmiContextProvider>
            <AuthContextProvider>
              {children}
            </AuthContextProvider>
          </WagmiContextProvider>
        
      </UIContextProvider>
    </GlobalContextProvider>
  );
}
