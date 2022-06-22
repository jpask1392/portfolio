import { gql } from "@apollo/client";
import { checkoutDetailsFragment } from "../queries/fragments/checkout";

const checkoutAddDiscountCode = gql`
mutation checkoutDiscountCodeRemove($checkoutId: ID!) {
  checkoutDiscountCodeRemove(checkoutId: $checkoutId) {
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
export default checkoutAddDiscountCode;
