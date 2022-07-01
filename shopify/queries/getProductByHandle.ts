import { gql } from "@apollo/client";
import { productDetailsFragment } from "./fragments";

const getProductByHandle = gql`
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      ...productDetails

      productMatches: metafield(namespace: "custom", key: "test") {
        value
        type
        reference {
          ... on Product {
            id
          }
        }
      }

      productMatches2: metafield(namespace: "custom", key: "product_matches") {
        value
        type
        parentResource {
          ... on Product {
            id
          }
        }
        reference {
          ... on Product {
            id
          }
        }
      }
    }
  }

  ${productDetailsFragment}
`;

export default getProductByHandle;
