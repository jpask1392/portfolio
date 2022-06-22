import { gql } from "@apollo/client";
import { checkoutDetailsFragment } from './fragments';

const getCheckout = gql`
  query getCheckout($id: ID!) {
    node(id: $id) {
      ...checkoutDetails
    }
  }

  ${checkoutDetailsFragment}
`;

export default getCheckout;
