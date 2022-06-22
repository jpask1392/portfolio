import { gql } from "@apollo/client";
import { productDetailsFragment } from "./fragments";

const getProductByHandle = gql`
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      ...productDetails
    }
  }

  ${productDetailsFragment}
`;

export default getProductByHandle;
