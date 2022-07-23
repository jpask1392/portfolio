import { UIContextProvider } from './uiContext';
import { GlobalContextProvider } from './globalContext';
import { SmoothScrollProvider } from './smoothScrollContext';


export const DefaultLayout = ({ children, pageProps }) => {
  return (
    <GlobalContextProvider 
      pageData={pageProps}
    >
      <UIContextProvider>
        <SmoothScrollProvider options={{ smooth: true, getDirection: true }}>
          {children}
        </SmoothScrollProvider>
      </UIContextProvider>
    </GlobalContextProvider>
  );
}
