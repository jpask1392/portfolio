import { gql } from "@apollo/client";

const getCustomerByAccessToken = gql`
  query getCustomerByAccessToken(
    $customerAccessToken: String!
  ) {
    customer(customerAccessToken: $customerAccessToken) {
      displayName
      email
      createdAt
      defaultAddress {
        city
        formatted(withName: true)
      }
      firstName
      lastName
      id
      phone
      addresses(first: 250) {
        edges {
          node {
            id
          }
        }
      }
      orders(first: 250) {
        edges {
          node {
            id
            customerUrl
            orderNumber
            processedAt
            fulfillmentStatus
            financialStatus
            totalPriceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export default getCustomerByAccessToken;
