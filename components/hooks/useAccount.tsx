import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import useToast from "@/components/hooks/useToast";

const useAccount = () => {
  const [ account, setAccount ] = useState(null);
  const [ toasts, addToast ] = useToast();
  const router = useRouter();

  useEffect(() => {
    console.log(account)
  }, [account]);

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
  
      // TODO: Redirect and login automatically?
      if (customerUserErrors.length) {
        addToast({
          title: "Error",
          message: customerUserErrors[0].message,
          style: "error"
        });
      }

      if (customer) {
        setAccount(customer)
        // TODO: save token to cookie
        // router.push('/account/login');
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
        // TODO: save token to cookie

        // get the customer with token
        const test = await fetch(`/api/customer/account?action=getCustomer`, {
          method: "POST",
          headers: {
            "content-type" : "application/json"
          },
          body: JSON.stringify({
            customerAccessToken: customerAccessToken.accessToken || "",
          })
        });

        const customer = await test.json();

        console.log('setting customer')
        setAccount(customer);
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

  return {
    account,
    handleCreateAccount,
    handleAccountLogin,
  };
} 

export default useAccount;