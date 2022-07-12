import type { Checkout } from '@/types/shopify';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { 
  SHOPIFY_CHECKOUT_ID_COOKIE,
  SHOPIFY_COOKIE_EXPIRE,
  SHOPIFY_CHECKOUT_URL_COOKIE 
} from '@/shopify/const';
import { useCartContext } from "@/components/context/cartContext";
import useToast from "@/components/hooks/useToast";
import { useUIContext } from "@/components/context/uiContext";

const useCart = () => {
  const [ toasts, addToast ] = useToast();
  const { UI, setUI } = useUIContext();

  // get and update cart from a global context
  const { 
    cart, 
    setCart
  } = useCartContext();

  // useEffect(() => {
  //   // console.log(cart);
  //   getCurrentCart();
  // }, [])

  // useEffect(() => {
  //   console.log(cart);
  //   getCurrentCart();
  // }, [cart.id])

  /**
   * Create a new checkout object
   */
  const createNewCheckout = async (withVariants?: any[]) => {
    try {
      // create a new one
      const res = await fetch("/api/checkout?action=create", {
        'method': 'POST',
        'body': JSON.stringify({
          lineItems: withVariants,
        }),
      });

      const checkout = await res.json();

      Cookies.set(SHOPIFY_CHECKOUT_ID_COOKIE, checkout?.id, {
        expires: SHOPIFY_COOKIE_EXPIRE,
      });

      // update the cart state
      setCart(checkout);

      if (withVariants?.length) {
        // show cart drawer
        setUI({
          ...UI,
          cartActive: true
        })
      }

    } catch (err) {
      addToast({
        message: "Could not create cart.",
        style: "error"
      });
    }
  }

  /**
   * Collect current checkout object from Shopify
   */
  const getCurrentCart = async () => {
    // get current checkout ID from cookies
    let idFromCookie = Cookies.get( SHOPIFY_CHECKOUT_ID_COOKIE ) || 'blank';

    // if the cookie doesn't exists, 
    // create a new checkout object
    if (idFromCookie === 'blank') {
      createNewCheckout();
      return;
    }

    try {
      const res = await fetch("/api/checkout?action=get", {
        'method': 'POST',
        'body': JSON.stringify({
          checkoutId: idFromCookie
        }),
      });

      const checkoutRes = await res.json();

      // update the cart state
      setCart(checkoutRes);

    } catch (err) {
      addToast({
        message: "Could not get current cart.",
        style: "error"
      });
    }
  }

  /**
   * Add variants to cart object
   * 
   * @param variants 
   */
  const addVariantsToCart = async (variants: {
    quantity: number
    variantId: string
  }[]) => {
    if (!cart || !Cookies.get( SHOPIFY_CHECKOUT_ID_COOKIE )) {
      // create a new checkout with cart items
      await createNewCheckout(variants);

      return;
    }

    try {
      const res = await fetch(`/api/checkout?action=add`, {
        'method': 'POST',
        'body': JSON.stringify({
          checkoutId: cart?.id,
          formData: variants,
        })
      });

      // check for a successful response before continuing
      if (res.status !== 200) {
        // get the response message
        const errorResponse = await res.json();
        throw new Error(errorResponse.message[0].message);
      }

      const checkout = await res.json();

      // add user feedback
      addToast({
        message: "Product Added To Cart",
        style: "success"
      });

      // update the state
      setCart(checkout)

      // show cart drawer
      setUI({
        ...UI,
        cartActive: true
      })

    } catch (err) {
      console.error(err);

      addToast({
        message: "Could not add product.",
        style: "error"
      });
    }
  }

  /**
   * Remove cart items from current checkout object
   * 
   * @param cartItems array of cart item ID's
   */
  const removeItemsFromCart = async (cartItems: string[]) => {
    try {
      const res = await fetch(`/api/checkout?action=remove`, {
        'method': 'POST',
        'body': JSON.stringify({
          checkoutId: cart?.id,
          formData: cartItems,
        })
      });

      const checkout = await res.json();

      setCart(checkout)
    } catch (error) {
      addToast({
        message: "Could not remove product from cart.",
        style: "error"
      });
    }
  }

  // return the information to hook caller
  return { 
    cart, 
    setCart,
    getCurrentCart,
    createNewCheckout,
    addVariantsToCart,
    removeItemsFromCart,
  };
}

export default useCart;