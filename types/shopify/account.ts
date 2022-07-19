export type Account = {
  displayName: string
  email: string
  createdAt: Date
  updatedAt: Date
  defaultAddress: {
    id: string
    city: string
    formatted: any[]
  }
  firstName: string
  lastName: string
  id: string
  phone: string
  addresses: {
    id: string
    formatted: string[]
  }[]
  orders: {
    id: string
    customerUrl: string
    orderNumber: string
    processedAt: Date
    fulfillmentStatus: string
    financialStatus: string
    totalPriceV2: {
      amount: number
      currencyCode: string
    }
  }[]
}
