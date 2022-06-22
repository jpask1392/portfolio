import { storefrontClient } from '@/shopify/client';
import { CHECKOUT_REMOVE_ITEM } from '@/shopify/mutations';
import normalizeCart from '../utils/normalizeCart';

const checkoutRemoveItem = async ({ 
  checkoutId,
  lineItemIds 
}: {
  checkoutId: string, 
  lineItemIds: any[]
}) => {
  const { data } = await storefrontClient.mutate({
    mutation: CHECKOUT_REMOVE_ITEM,
    variables: {
      checkoutId: checkoutId,
      lineItemIds: lineItemIds
    }
  });

  return normalizeCart(data.checkoutLineItemsRemove.checkout);
}

export default checkoutRemoveItem;
