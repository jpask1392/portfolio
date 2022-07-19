import { storefrontClient } from '@/shopify/client';
import { SEARCH_STORE_QUERY } from '@/shopify/queries';

const searchStore = async ( query: string ) => {
  try {
    const { data } = await storefrontClient.query({
      query: SEARCH_STORE_QUERY,
      variables: {
        query: `
          (title:*${query}*) OR
          (tags:*${query}*)
        `
      }
    });
  
    if (data.products.edges.length) {
      return data.products.edges.map(({ node } : {node: any}) => node);
    } else {
      return false;
    }
    
  } catch (err) {
    console.log(err)
  }
}

export default searchStore;
