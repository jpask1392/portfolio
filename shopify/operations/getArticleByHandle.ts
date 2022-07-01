import { storefrontClient } from '@/shopify/client';
import { GET_ARTICLE_BY_HANDLE } from '@/shopify/queries';
// import { normalizeCollection } from '../utils/normalizeCollection';

const getArticleByHandle = async ( 
  handle: string,
  blogHandle: string,
  // product_filters?: any,
  // sortKey?: string,
  // reverse?: boolean,
) => {
  try {
    const { data } = await storefrontClient.query({
      query: GET_ARTICLE_BY_HANDLE,
      variables: {
        blogHandle: blogHandle,
        handle: handle,
        // productFilters: product_filters,
        // sortKey: sortKey,
        // reverse: reverse,
      }
    });
    
    return data.blogByHandle.articleByHandle;
  } catch (err) {
    console.warn("err:", err);
    return null;
  }
}

export default getArticleByHandle;
