import { storefrontClient } from '@/shopify/client';
import { GET_ALL_PRODUCTS } from '@/shopify/queries';

const getAllProducts = async () => {
  const { data } = await storefrontClient.query({
    query: GET_ALL_PRODUCTS
  });

  return {
    // we can normalize the product data in the future if we need to
    products: data
      .products
      .edges
      .map(({ node }: {node: any}) => node)
  };
}

export default getAllProducts;
