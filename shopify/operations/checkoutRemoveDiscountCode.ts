import { storefrontClient } from '@/shopify/client';
import { CHECKOUT_REMOVE_DISCOUNT_CODE } from '@/shopify/mutations';
import normalizeCart from '../utils/normalizeCart';

const checkoutRemoveDiscountCode = async ({ 
  checkoutId,
} : {
  checkoutId: string,
}) => {
  try {
    const { data } = await storefrontClient.mutate({
      mutation: CHECKOUT_REMOVE_DISCOUNT_CODE,
      variables: {
        checkoutId: checkoutId
      }
    });

    return normalizeCart(data.checkoutDiscountCodeRemove.checkout);

  } catch (err) {
    console.log(err)
  }
}

export default checkoutRemoveDiscountCode;
