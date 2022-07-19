import { useAccountContext } from '../context/accountContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import useToast from "@/components/hooks/useToast";
import Cookies from 'js-cookie';

const useAccount = () => {
  const { account, setAccount, getAccount } = useAccountContext();
  const [ toasts, addToast ] = useToast();
  const router = useRouter();

  // useEffect(() => {
  //   console.log(account)
  // }, [account])

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
   * Handle logging the customer out
   */
  const handleAccountLogout = async () => {
    Cookies.remove('_secure_session_id');
    router.push('/')
  }

  /**
   * Update address information
   * 
   * @param id 
   */
  const handleUpdateAddress = async (id: string) => {
    const accessToken = account;

    // required fields
    // id
    // customerAccessToken
    // address - inputs
 
  }

  /**
   * Creates a new address associated with customer
   * 
   */
  const handleCreateAddress = async (address: {
    firstName: string,
    lastName: string,
    address1: string,
    address2: string,
  }) => {
    try {
      const res = await fetch(`/api/customer/account?action=createAddress`, {
        method: "POST",
        headers: {
          "content-type" : "application/json"
        },
        body: JSON.stringify({
          customerAccessToken: Cookies.get( '_secure_session_id' ),
          address: address
        })
      });
  
      const {
        customerAddress,
        customerUserErrors
      } = await res.json();

      if (customerUserErrors.length) {
        addToast({
          title: "Error",
          message: customerUserErrors[0].message,
          style: "error"
        });
      } else {
        addToast({
          title: "Success",
          message: "Created new address.",
          style: "success"
        });

        await getAccount(Cookies.get( '_secure_session_id' ));
      }
    } catch (err) {
      // any errors return to login page
      router.push('/account/login')
    }
  }

  /**
   * Deletes a customers address
   * 
   * @param id 
   */
  const handleDeleteAddress = async (id: string) => {
    const customerAccessToken = Cookies.get( '_secure_session_id' );

    try {
      const res = await fetch(`/api/customer/account?action=deleteAddress`, {
        method: "POST",
        headers: {
          "content-type" : "application/json"
        },
        body: JSON.stringify({
          customerAccessToken: customerAccessToken,
          id: id,
        })
      });
  
      const {
        deletedCustomerAddressId,
        customerUserErrors
      } = await res.json();

      if (customerUserErrors.length) {
        addToast({
          title: "Error",
          message: customerUserErrors[0].message,
          style: "error"
        });
      } else {
        addToast({
          title: "Success",
          message: "Deleted the address.",
          style: "success"
        });

        await getAccount(Cookies.get( '_secure_session_id' ));
      }
    } catch (err) {
      // any errors return to login page
      // router.push('/account/login')
    }
  }

  return {
    account,
    handleCreateAccount,
    handleAccountLogin,
    handleAccountLogout,
    handleCreateAddress,
    handleDeleteAddress,
  };
} 

export default useAccount;