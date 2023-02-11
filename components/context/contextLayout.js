import { UIContextProvider } from './uiContext';
import { GlobalContextProvider } from './globalContext';
import { AuthContextProvider } from './authContext';

export const DefaultLayout = ({ children, pageProps }) => {
  return (
    <GlobalContextProvider 
      pageData={pageProps}
    >
      <UIContextProvider>    
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </UIContextProvider>
    </GlobalContextProvider>
  );
}
