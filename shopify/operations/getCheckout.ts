import { storefrontClient } from '@/shopify/client';
import { GET_CHECKOUT } from '@/shopify/queries';
import normalizeCart from '../utils/normalizeCart';

const getCheckout = async ( checkoutId: any ) => {
  try {
    const { data } = await storefrontClient.query({
      query: GET_CHECKOUT,
      variables: {
        id: checkoutId
      }
    });
  
    return normalizeCart(data.node);
  } catch (err) {
    console.warn(err)
  }
}

export default getCheckout;
