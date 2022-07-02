import { gql } from "@apollo/client";

const cusomterCreateAccessToken = gql`
mutation customerCreate($input: CustomerCreateInput!) {
  customerCreate(input: $input) {
    customer {
      id
      firstName
      lastName
      email
    }
    customerUserErrors {
      code
      field
      message
    }
  }
}
`
export default cusomterCreateAccessToken;
