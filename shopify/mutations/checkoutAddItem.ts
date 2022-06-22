import { gql } from "@apollo/client";
import { checkoutDetailsFragment } from "../queries/fragments/checkout";

const checkoutAddItem = gql`
mutation checkoutLineItemsAdd($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
  checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
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
