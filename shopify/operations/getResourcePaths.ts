import { storefrontClient } from '@/shopify/client';
import { GET_RESOURCE_PATHS } from '@/shopify/queries';

const getResourcePaths = async ( 
  type: string,
) => {
  try {
    const { data } = await storefrontClient.query({
      query: GET_RESOURCE_PATHS,
      variables: {
        isCollection: type === 'collections',
        isProduct: type === 'products',
        isArticle: type === 'articles',
      }
    });

    let handlesList: string[] = [];

    /**
     * TODO: Handle this a little nicer
     */
    if (type === 'articles') {
      handlesList = data['blogByHandle']['articles'].edges
        .map(({ node }: {node: any}) => ({ params: { handle: node.handle } }));
    } else {
      handlesList = data[type].edges
        .map(({ node }: {node: any}) => ({ params: { handle: node.handle } }));
    }
    

    return handlesList;
  } catch (err) {
    console.warn("err:", err);
    return null;
  }
}

export default getResourcePaths;
