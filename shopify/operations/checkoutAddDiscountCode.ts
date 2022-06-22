import { storefrontClient } from '@/shopify/client';
import { CHECKOUT_ADD_DISCOUNT_CODE } from '@/shopify/mutations';
import normalizeCart from '../utils/normalizeCart';

const checkoutAddDiscountCode = async ({ 
  checkoutId,
  discountCode
} : {
  checkoutId: string, 
  discountCode: string
}) => {
  try {
    const { data } = await storefrontClient.mutate({
      mutation: CHECKOUT_ADD_DISCOUNT_CODE,
      variables: {
        checkoutId: checkoutId,
        discountCode: discountCode
      }
    });

    return normalizeCart(data.checkoutDiscountCodeApply.checkout);

  } catch (err) {
    console.log(err)
  }
}

export default checkoutAddDiscountCode;
