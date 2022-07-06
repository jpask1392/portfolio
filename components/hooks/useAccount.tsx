import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import useToast from "@/components/hooks/useToast";
import Cookies from 'js-cookie';

const useAccount = () => {
  const [ account, setAccount ] = useState(null);
  const [ toasts, addToast ] = useToast();
  const router = useRouter();

  useEffect(() => {
    // run on mount
    getAccount(Cookies.get( '_secure_session_id' ));
  }, []);

  /**
   * Creates a customer account
   * 
   * @param data 
   * @returns 
   */
  const handleCreateAccount = async (data: any) => {
    try {
      // send query to API
      const res = await fetch(`/api/customer/account?action=createCustomer`, {
        method: "POST",
        headers: {
          "content-type" : "application/json"
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      });
  
      const {
        customer,
        customerUserErrors
      } = await res.json();

      if (customerUserErrors.length) {
        addToast({
          title: "Error",
          message: customerUserErrors[0].message,
          style: "error"
        });
      }

      if (customer) {
        setAccount(customer)
        
        await handleAccountLogin({
          email: data.email,
          password: data.password
        });
      }

    } catch (error) {
      addToast({
        title: "Error",
        message: "Oops, something went wrong.",
        style: "error"
      });
    } finally {
  
    }
  }

  /**
   * Creates a customer account token
   * 
   * @param data 
   * @returns 
   */
  const handleAccountLogin = async (data: any) => {
    try {
      // send query to API
      const res = await fetch(`/api/customer/account?action=createToken`, {
        method: "POST",
        headers: {
          "content-type" : "application/json"
        },
        body: JSON.stringify({
          email: data.email || "",
          password: data.password || ""
        })
      });

      const {
        customerAccessToken,
        customerUserErrors,
      } = await res.json();
  
      if (customerUserErrors.length) {
        addToast({
          title: "Error",
          message: customerUserErrors[0].message,
          style: "error"
        });
      }

      if (customerAccessToken) {
        Cookies.set('_secure_session_id', customerAccessToken.accessToken, {
          // expires: customerAccessToken.expiresAt,
        });

        // get the customer with token
        await getAccount(customerAccessToken.accessToken);

        // Redirect here
        router.push('/account')
      }
    } catch (error) {
      addToast({
        title: "Error",
        message: "Oops, something went wrong.",
        style: "error"
      });
    } finally {
  
    }
  }

  /**
   * Get the customer with access token
   * 
   * @param customerAccessToken 
   */
  const getAccount = async (customerAccessToken: string | undefined) => {
    if (!customerAccessToken) return;

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
      router.push('/account/login')
    }
  }

  /**
   * Handle logging the customer out
   */
  const handleAccountLogout = async () => {
    Cookies.remove('_secure_session_id');
    router.push('/')
  }

  return {
    account,
    handleCreateAccount,
    handleAccountLogin,
    handleAccountLogout,
  };
} 

export default useAccount;