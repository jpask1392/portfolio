import { gql } from "@apollo/client";

const getResourcePaths = gql`
  query getResourcePaths(
    $isCollection: Boolean!
    $isProduct: Boolean!
  ) {
    collections(first: 250) @include(if: $isCollection) {
      edges {
        node {
          handle
        }
      }
    }
    products(first: 250) @include(if: $isProduct) {
      edges {
        node {
          handle
        }
      }
    }
    blogByHandle(handle: "press") {
      articles(first: 250) {
        edges {
          node {
            handle
          }
        }
      }
    }
  }
`;

export default getResourcePaths;
