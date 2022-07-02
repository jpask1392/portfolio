import { gql } from "@apollo/client";

const getCustomerByAccessToken = gql`
  query getCustomerByAccessToken(
    $customerAccessToken: String!
  ) {
    customer(customerAccessToken: $customerAccessToken) {
      displayName
      email
    }
  }
`;

export default getCustomerByAccessToken;
