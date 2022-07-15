import { gql } from "@apollo/client";

const customerCreateAddress = gql`
mutation customerAddressCreate($address: MailingAddressInput!, $customerAccessToken: String!) {
  customerAddressCreate(address: $address, customerAccessToken: $customerAccessToken) {
    customerAddress {
      id
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
`
export default customerCreateAddress;
