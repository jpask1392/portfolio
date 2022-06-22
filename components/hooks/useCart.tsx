import type { Checkout } from '@/types/shopify';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { 
  SHOPIFY_CHECKOUT_ID_COOKIE,
  SHOPIFY_COOKIE_EXPIRE,
  SHOPIFY_CHECKOUT_URL_COOKIE 
} from '@/shopify/const';
import { useCartContext } from "@/components/context/cartContext";

const useCart: () => [
  Checkout | null,
  (checkout: Checkout) => void
] = () => {
  // get current checkout ID from cookies
  let idFromCookie = Cookies.get( SHOPIFY_CHECKOUT_ID_COOKIE ) || 'blank';

  // get and update cart from context
  const { cart, setCart } = useCartContext();

  const fetcher = async ( url: string, checkoutId: string ) => {
    let checkout;

    if (checkoutId === "blank") {
      try {
        // create a new one
        const res = await fetch(url, {
          'method': 'POST',
          'body': JSON.stringify({}),
        });

        const checkoutRes = await res.json();
        checkout = checkoutRes;

        Cookies.set(SHOPIFY_CHECKOUT_ID_COOKIE, checkout?.id, {
          expires: SHOPIFY_COOKIE_EXPIRE,
        });
      } catch (err) {
        
      }
    } else {
      try {
        // create a new one
        const res = await fetch("/api/checkout?action=get", {
          'method': 'POST',
          'body': JSON.stringify({
            checkoutId: checkoutId
          }),
        });

        const checkoutRes = await res.json();
        checkout = checkoutRes;
      } catch (err) {
        
      }
    }

    return checkout;
  }

  useEffect(() => {
    (async() => {
      const checkout = await fetcher('/api/checkout?action=create', idFromCookie);
      setCart(checkout);
    })()
  }, [idFromCookie, setCart])

  // return the information to hook caller
  return [ cart, setCart ];
}

export default useCart;