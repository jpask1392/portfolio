import Cookies from 'js-cookie';
import { 
  SHOPIFY_CHECKOUT_ID_COOKIE,
  SHOPIFY_COOKIE_EXPIRE,
  SHOPIFY_CHECKOUT_URL_COOKIE 
} from '../const';

const getCheckoutId = async () => {
  let checkoutId = Cookies.get( SHOPIFY_CHECKOUT_ID_COOKIE ) || '';
  let checkout;

  if (!checkoutId) {
    try {
      // create a new one
      const res = await fetch(`/api/checkout?action=create`, {
        'method': 'POST',
        'body': JSON.stringify({}),
      });

      checkout = await res.json();
    } catch (err) {

    }
  }

  checkoutId = checkout?.id

  const options = {
    expires: SHOPIFY_COOKIE_EXPIRE,
  }

  Cookies.set(SHOPIFY_CHECKOUT_ID_COOKIE, checkoutId, options);

  // if (checkout?.webUrl) {
  //   Cookies.set(SHOPIFY_CHECKOUT_URL_COOKIE, checkout.webUrl, options)
  // }

  return checkoutId;
}

export default getCheckoutId;
