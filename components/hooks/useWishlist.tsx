import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

const useWishlist = () => {
  const [ wishlist, setWishlist ] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // run on mount
    getWishlist();
  }, []);

  /**
   * Get the customer with access token
   * 
   * @param email
   */
  const getWishlist = async (email?: string | undefined) => {
    
  }

  /**
   * Creates a new wishlist by email
   * 
   */
  const handleCreateWishlist = async (product: any, email: any) => {
    try {
      await fetch('https://prod-api.wishlist.plutocracy.io/api/wishlist/event/fd299e53-91fa-439e-afaa-05d9f97ad8bf', {
        method: 'POST',
        headers: {
          
        },
        body: JSON.stringify({
          eventType: "wishlist/add",
          email: "someone@gmail.com",
          event: {
            id: product.id,
            productObject: {
              productId: product.id,
              productHandle: product.handle,
              "price": "Add the price in cents as a number",
              "priceInstructions": "You can also add the price to the event object directly. Be sure to still use cents and pass the value as a number"
            },
          },
        })
      });

    } catch (error) {
      console.log('something went wrong')
    } finally {
    }  
  }

  return {
    wishlist,
    getWishlist,
    handleCreateWishlist,
  };
} 

export default useWishlist;