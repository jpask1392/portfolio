import { storefrontClient } from '@/shopify/client';
import { CREATE_CHECKOUT } from '@/shopify/mutations';
import normalizeCart from '../utils/normalizeCart';

const createCheckout = async ({
  lineItems = []
}) => {
  const { data } = await storefrontClient.mutate({
    mutation: CREATE_CHECKOUT,
    variables: {
      input: {
        lineItems: lineItems
      }
    }
  });

  const checkout = data.checkoutCreate?.checkout

  return normalizeCart(checkout);
}

export default createCheckout;
