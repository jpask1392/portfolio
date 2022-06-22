import { storefrontClient } from '@/shopify/client';
import { GET_PRODUCT_RECOMMENDATIONS } from '@/shopify/queries';
import { normalizeProduct } from '../utils/normalizeProduct';

const GetProductByHandle = async ( productId: string ) => {
  const { data } = await storefrontClient.query({
    query: GET_PRODUCT_RECOMMENDATIONS,
    variables: {
      productId: productId
    }
  });

  return data
    .productRecommendations
    .map((node: any) => normalizeProduct(node));
}

export default GetProductByHandle;
