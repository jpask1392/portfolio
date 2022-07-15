import { storefrontClient } from '@/shopify/client';
import { CUSTOMER_CREATE_ADDRESS } from '@/shopify/mutations';

const customerCreateAddress = async ({
  customerAccessToken,
  address,
} : {
  customerAccessToken: string
  address: string
}) => {
  try {
    const { data } = await storefrontClient.mutate({
      mutation: CUSTOMER_CREATE_ADDRESS,
      variables: {
        customerAccessToken: customerAccessToken,
        address: address,
      }
    });
  
    return data.customerAddressCreate;
  } catch (err) {
    console.warn(err)
  }
}

export default customerCreateAddress;
