import { gql } from "@apollo/client";
import { checkoutDetailsFragment } from "../queries/fragments/checkout";

const checkoutAddItem = gql`
mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
  checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
    checkout {
      ...checkoutDetails
    }
    checkoutUserErrors {
      code
      field
      message
    }
  }
}
${checkoutDetailsFragment}
`
export default checkoutAddItem;
