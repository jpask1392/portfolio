export type Checkout = {
  id: string,
  url: string,
  customerId: string,
  email: string,
  createdAt: Date,
  currency: { code: 'USD' },
  taxesIncluded: boolean,
  lineItems: any[],
  lineItemsSubtotalPrice: number,
  subtotalPrice: number,
  totalPrice: string,
  discounts: any[]
}

export type LineItem = {
  
}