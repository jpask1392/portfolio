import { gql } from "@apollo/client";

const getArticlesByBlogHandle = gql`
  query getArticlesByBlogHandle(
    $handle: String!
  ) {
    blogByHandle(handle: $handle) {
      handle
      title
      articles(first: 250) {
        edges {
          node {
            id
            title
            excerpt
            handle
            blog {
              handle
            }
          }
        }
      }
    }
  }
`;

export default getArticlesByBlogHandle;
