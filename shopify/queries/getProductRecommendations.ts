import { gql } from "@apollo/client";
import { productDetailsFragment } from "./fragments";

const getProductRecommendations = gql`
  query getProductRecommendations($productId: ID!) {
    productRecommendations(productId: $productId) {
      ...productDetails
    }
  }

  ${productDetailsFragment}
`;

export default getProductRecommendations;
