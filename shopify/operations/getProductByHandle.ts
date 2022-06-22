import { storefrontClient } from '@/shopify/client';
import { GET_PRODUCT_BY_HANDLE } from '@/shopify/queries';
import { normalizeProduct } from '../utils/normalizeProduct';

const GetProductByHandle = async ( handle: string ) => {
  const { data } = await storefrontClient.query({
    query: GET_PRODUCT_BY_HANDLE,
    variables: {
      handle: handle
    }
  });

  return normalizeProduct(data.productByHandle);
}

export default GetProductByHandle;
