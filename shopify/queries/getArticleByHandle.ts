import { gql } from "@apollo/client";

const getArticleByHandle = gql`
  query getArticleByHandle(
    $handle: String!
    $blogHandle: String!
  ) {
    blogByHandle(handle: $blogHandle) {
      handle
      articleByHandle(handle: $handle) {
        id
        handle
        title
        excerpt
      }
    }
  }
`;

export default getArticleByHandle;
