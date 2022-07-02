import { storefrontClient } from '@/shopify/client';
import { GET_CUSTOMER_BY_ACCESS_TOKEN } from '@/shopify/queries';

const getCustomerByAccessToken = async ( 
  customerAccessToken: string,
) => {
  try {
    const { data } = await storefrontClient.query({
      query: GET_CUSTOMER_BY_ACCESS_TOKEN,
      variables: {
        customerAccessToken: customerAccessToken,
      }
    });
    
    return data.customer;
  } catch (err) {
    console.warn("err:", err);
    return null;
  }
}

export default getCustomerByAccessToken;
