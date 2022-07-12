import normalizeLineItem from './normalizeLineItem';

const normalizeCart = (checkout: any) => {
  return {
    id: checkout.id,
    url: checkout.webUrl,
    customerId: '',
    email: '',
    createdAt: checkout.createdAt,
    currency: { code: checkout.totalPriceV2?.currencyCode },
    taxesIncluded: checkout.taxesIncluded,
    lineItems: checkout.lineItems?.edges.map(({ node } : { node: any }) => normalizeLineItem(node)),
    lineItemsSubtotalPrice: checkout.lineItemsSubtotalPrice.amount,
    subtotalPrice: +checkout.subtotalPriceV2?.amount,
    totalPrice: checkout.totalPriceV2?.amount,
    discounts: checkout.discountApplications?.edges.map((node: any) => node) || [],
    ready: checkout.ready,
    // ...checkout
  }
}

export default normalizeCart;
