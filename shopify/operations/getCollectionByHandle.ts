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
        productFilters: product_filters,
        sortKey: sortKey,
        reverse: reverse,
      }
    });
    
    if (data.collectionByHandle) {
      return normalizeCollection(data.collectionByHandle);
    } else {
      return null;
    }
  } catch (err) {
    console.warn("err:", err);
    return null;
  }
}

export default getCollectionByHandle;
