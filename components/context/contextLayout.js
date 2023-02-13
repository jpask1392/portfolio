import { UIContextProvider } from './uiContext';
import { GlobalContextProvider } from './globalContext';

export const DefaultLayout = ({ children, pageProps }) => {
  return (
    <GlobalContextProvider 
      pageData={pageProps}
    >
      <UIContextProvider>    
        {children}
      </UIContextProvider>
    </GlobalContextProvider>
  );
}
