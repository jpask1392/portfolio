import { UIContextProvider } from './uiContext';
import { GlobalContextProvider } from './globalContext';
import { MouseContextProvider } from './mouseContext';

export const DefaultLayout = ({ children, pageProps }) => {
  return (
    <GlobalContextProvider 
      pageData={pageProps}
    >
      <UIContextProvider>
        <MouseContextProvider>
          {children}
        </MouseContextProvider>
      </UIContextProvider>
    </GlobalContextProvider>
  );
}
