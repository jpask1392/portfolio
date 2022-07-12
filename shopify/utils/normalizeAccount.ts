const normalizeAccount = (account: any) => {
  return {
    ...account,
    id: account.id,
    addresses: account.addresses?.edges.map(({ node } : { node: any }) => node),
    orders: account.orders?.edges.map(({ node } : { node: any }) => node),
  }
}

export default normalizeAccount;
