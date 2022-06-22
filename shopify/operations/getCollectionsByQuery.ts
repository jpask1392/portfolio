import { storefrontClient } from '@/shopify/client';
import { GET_COLLECTIONS_BY_QUERY } from '@/shopify/queries';
import { normalizeCollection } from '../utils/normalizeCollection';

const getCollectionsByQuery = async ( 
  query: string,
  product_filters?: any,
  settings?: {
    product_count?: number,
    without_products?: boolean
  }
) => {
  try {
    const { data } = await storefrontClient.query({
      query: GET_COLLECTIONS_BY_QUERY,
      variables: {
        query: query,
        product_filters: product_filters || [],
        product_count: settings?.product_count || 200,
        with_products: settings?.without_products ? false : true,
      }
    });
  
    return data
      .collections
      .edges
      .map(({ node } : {node : any}) => normalizeCollection(node));

  } catch (err) {
    console.warn("err:", err)
  }
}

export default getCollectionsByQuery;
