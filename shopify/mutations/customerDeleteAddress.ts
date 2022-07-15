import { gql } from "@apollo/client";

const customerCreateAddress = gql`
mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
  customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
    deletedCustomerAddressId
    customerUserErrors {
      code
      field
      message
    }
  }
}
`
export default customerCreateAddress;
