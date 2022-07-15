import { storefrontClient } from '@/shopify/client';
import { GET_CUSTOMER_BY_ACCESS_TOKEN } from '@/shopify/queries';
import normalizeAccount from '../utils/normalizeAccount';

const getCustomerByAccessToken = async ({
  customerAccessToken
} : {
  customerAccessToken: string
}) => {
  try {
    /**
     * Queries cannot be made to collect the Customer
     * with their ID. THe customerAccessToken isn't returned
     * with the data so can't be cached.
     * 
     * This caused some out-of-sync issues so fetchPolicy is included here.
     */
    const { data } = await storefrontClient.query({
      fetchPolicy: "no-cache",
      query: GET_CUSTOMER_BY_ACCESS_TOKEN,
      variables: {
        customerAccessToken: customerAccessToken,
      }
    });
    
    return normalizeAccount(data.customer);
  } catch (err) {
    console.warn("err:", err);
    return null;
  }
}

export default getCustomerByAccessToken;
