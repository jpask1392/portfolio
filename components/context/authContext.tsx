
import { SessionProvider } from 'next-auth/react';

export function AuthContextProvider({ 
  children, 
  pageProps
} : { 
  children: any, 
  pageProps: any 
}) {
  // return children;
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
