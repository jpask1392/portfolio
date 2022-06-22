import { gql } from "@apollo/client";
import { checkoutDetailsFragment } from "../queries/fragments/checkout";

const createCheckout = gql`
mutation checkoutCreate($input: CheckoutCreateInput = {}) {
  checkoutCreate(input: $input) {
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
export default createCheckout;
