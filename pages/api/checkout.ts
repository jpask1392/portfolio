import type { Checkout } from "@/types/shopify";
import { 
  createCheckout,
  getCheckout,
  checkoutAddItem,
  checkoutRemoveItem,
  checkoutAddDiscountCode,
  checkoutRemoveDiscountCode,
} from "@/shopify/operations";

export default async function collections(req: any, res: any) {
  // only allow POST methods at this endpoint
  if (req.method !== 'POST') return;

  try {
    const { query: { action } } = req;
    const body = JSON.parse(req.body);

    let checkout: Checkout | undefined;

    /**
     * Handle various actions
     */

    // creating a new checkout object
    if (action === 'create') {
      checkout = await createCheckout({
        lineItems: body.lineItems || [],
      });
    }

    // get the current checkout object
    if (action === 'get') {
      checkout = await getCheckout(body.checkoutId);
    }

    // add items to checkout object
    if (action === 'add') {
      let addRequest = await checkoutAddItem({
        checkoutId: body.checkoutId,
        lineItems: body.formData
      });

      // check if Apollo throws an error
      if ('graphQLErrors' in addRequest) {
        res.status(500).json({message: addRequest.graphQLErrors});
        return; // kill
      }

      checkout = addRequest;
    }

    // remove items from checkout object
    if (action === 'remove') {
      checkout = await checkoutRemoveItem({
        checkoutId: body.checkoutId,
        lineItemIds: body.formData
      });
    }

    // remove items from checkout object
    if (action === 'applyDiscount') {
      /**
       * Required Params:
       *  checkoutId
       *  discountCode 
       */
      checkout = await checkoutAddDiscountCode({
        checkoutId: body.checkoutId,
        discountCode: body.discountCode
      });
    }

    // remove items from checkout object
    if (action === 'removeDiscount') {
      /**
       * Required Params:
       *  checkoutId
       */
      checkout = await checkoutRemoveDiscountCode({
        checkoutId: body.checkoutId,
      });
    }

    // if, for any reason the checkout fails, throw an error
    if (!checkout) throw new Error('Checkout failed');
    
    // return the succesful checkout to client
    res.status(200).json(checkout);

  } catch (err) {
    res.status(500).json('err');
  } 
}
