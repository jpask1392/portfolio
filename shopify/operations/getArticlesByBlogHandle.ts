import { storefrontClient } from '@/shopify/client';
import { GET_ARTICLES_BY_BLOG_HANDLE } from '@/shopify/queries';

const getArticlesByBlogHandle = async ( handle: string ) => {
  const { data } = await storefrontClient.query({
    query: GET_ARTICLES_BY_BLOG_HANDLE,
    variables: {
      handle: handle
    }
  });

  return {
    ...data.blogByHandle,
    articles: data.blogByHandle.articles.edges.map(({node} : {node: any}) => node)
  }
}

export default getArticlesByBlogHandle;
