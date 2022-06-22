import { gql } from "@apollo/client";

const getAllProducts = gql`
  {
    products(first: 3) {
      edges {
        cursor
        node {
          id
          title
        }
      }
    }
  }
`;

export default getAllProducts;
