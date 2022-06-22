import { gql } from "@apollo/client";
import { checkoutDetailsFragment } from "../queries/fragments/checkout";

const checkoutAddDiscountCode = gql`
mutation checkoutDiscountCodeApplyV2($checkoutId: ID!, $discountCode: String!) {
  checkoutDiscountCodeApply(checkoutId: $checkoutId, discountCode: $discountCode) {
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
