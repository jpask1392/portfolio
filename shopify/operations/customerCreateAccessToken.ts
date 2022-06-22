import { storefrontClient } from '@/shopify/client';
import { CUSTOMER_CREATE_ACCESS_TOKEN } from '@/shopify/mutations';

const cusomterCreateAccessToken = async ( email: string, password: string ) => {
  try {
    const { data } = await storefrontClient.mutate({
      mutation: CUSTOMER_CREATE_ACCESS_TOKEN,
      variables: {
        input: {
          email: email,
          password: password,
        }
      }
    });
  
    return data.customerAccessTokenCreate;
  } catch (err) {
    console.warn(err)
  }
}

export default cusomterCreateAccessToken;
