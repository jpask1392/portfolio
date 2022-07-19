import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect';
import { createContext, useContext, useState } from 'react';
import type { Account } from '@/types/shopify/account';

const AccountContext = createContext({
  account: null,
  setAccount: (data: any) => data,
  getAccount: (customerAccessToken: string | undefined) => customerAccessToken,
});



export function AccountProvider({ children } : { children: any }) {
  const [ account, setAccount ] = useState<Account | null>(null);

  /**
   * Get customer within the context to 
   * prevent un-needed api calls
   */
  useIsomorphicLayoutEffect(() => {
    (async() => {
      const Cookies = (await import('js-cookie')).default
      getAccount(Cookies.get( '_secure_session_id' ));
    })()
  }, []);

  /**
   * Get the customer with access token
   * 
   * @param customerAccessToken 
   */
  const getAccount = async (customerAccessToken: string | undefined) => {
    if (!customerAccessToken) return false;
  
    try {
      const res = await fetch(`/api/customer/account?action=getCustomer`, {
        method: "POST",
        headers: {
          "content-type" : "application/json"
        },
        body: JSON.stringify({
          customerAccessToken: customerAccessToken || "",
        })
      });
  
      const customer = await res.json();
      setAccount(customer);
    } catch (err) {
      // any errors return to login page
      // router.push('/account/login')
    }
  }

  const value: any = { account, setAccount, getAccount };

  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccountContext() {
  return useContext(AccountContext);
}