import { storefrontClient } from '@/shopify/client';
import { GET_COLLECTION_BY_HANDLE } from '@/shopify/queries';
import { normalizeCollection } from '../utils/normalizeCollection';

const getCollectionByHandle = async ( 
  handle: any,
  options : {
    productFilters?: any[],
    sortKey?: string | null,
    reverse?: boolean,
    before?: string | null,
    after?: string | null,
    first?: number | null,
    last?: number | null
  }
) => {
  
  // set defaults
  options = {
    productFilters: [],
    sortKey: null,
    reverse: false,
    before: null,
    after: null,
    first: 6,
    last: 6,
    ...options,
  }

  try {
    const { data } = await storefrontClient.query({
      query: GET_COLLECTION_BY_HANDLE,
      variables: {
        handle: handle,
        productFilters: options.productFilters || [],
        sortKey: options.sortKey,
        reverse: options.reverse || false,
        after:options. after || null,
        before: options.before || null,
        first: !options.before ? options.first : null,
        last: options.before ? options.last : null,
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
