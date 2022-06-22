import { storefrontClient } from '@/shopify/client';
import { CHECKOUT_ADD_ITEM } from '@/shopify/mutations';
import normalizeCart from '../utils/normalizeCart';

const checkoutAddItem = async ({ 
  checkoutId,
  lineItems
} : {
  checkoutId: string, 
  lineItems: any[]
}) => {
  try {
    const { data } = await storefrontClient.mutate({
      mutation: CHECKOUT_ADD_ITEM,
      variables: {
        checkoutId: checkoutId,
        lineItems: lineItems
      }
    });

    return normalizeCart(data.checkoutLineItemsAdd.checkout);

  } catch (err) {
    console.error(err);
    return err;

    if ('graphQLErrors' in err) {
      return {
        graphErrors: err.graphQLErrors
      }
    }
  }
}

export default checkoutAddItem;
