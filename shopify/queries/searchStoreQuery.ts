import { gql } from "@apollo/client";
import { productDetailsFragment } from "./fragments";

const searchStoreQuery = gql`
  query searchStoreQuery($query: String!) {
    products(first: 5, query: $query) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;

export default searchStoreQuery;
