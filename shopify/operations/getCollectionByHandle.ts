import { storefrontClient } from '@/shopify/client';
import { GET_COLLECTION_BY_HANDLE } from '@/shopify/queries';
import { normalizeCollection } from '../utils/normalizeCollection';

const getCollectionByHandle = async ( 
  handle: any,  
  product_filters?: any,
  sortKey?: string,
  reverse?: boolean,
) => {
  try {
    const { data } = await storefrontClient.query({
      query: GET_COLLECTION_BY_HANDLE,
      variables: {
        handle: handle,
        product_filters: product_filters,
        sortKey: sortKey,
        reverse: reverse,
      }
    });
  
    return normalizeCollection(data.collectionByHandle);
  } catch (err) {
    console.warn("err:", err.graphQLErrors);
    return null;
  }
}

export default getCollectionByHandle;
