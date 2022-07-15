import { storefrontClient } from '@/shopify/client';
import { CUSTOMER_DELETE_ADDRESS } from '@/shopify/mutations';

const customerCreateAddress = async ({
  customerAccessToken,
  id,
} : {
  customerAccessToken: string
  id: string
}) => {
  try {
    const { data } = await storefrontClient.mutate({
      mutation: CUSTOMER_DELETE_ADDRESS,
      variables: {
        customerAccessToken: customerAccessToken,
        id: id,
      }
    });
  
    return data.customerAddressDelete;
  } catch (err) {
    console.warn(err)
  }
}

export default customerCreateAddress;
