import { ApolloClient, InMemoryCache } from "@apollo/client";
import { API_URL, API_TOKEN } from './const';

export const storefrontClient = new ApolloClient({
  uri: API_URL || "",
  headers: {
    "X-Shopify-Storefront-Access-Token": API_TOKEN || "",
    "Content-Type": "application/json",
  },
  cache: new InMemoryCache({
    typePolicies: {
      Filter: {
        keyFields: false,
      },
      FilterValue: {
        keyFields: ["count", "id"],
      },
    },
  }),
});
