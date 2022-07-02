import { storefrontClient } from '@/shopify/client';
import { CUSTOMER_CREATE } from '@/shopify/mutations';

/**
 * Email and password required *
 */
const cusomterCreate = async ({
  email = "",
  password = "",
  firstName = "",
  lastName = "",
  phone = ""
}) => {
  console.log(email)
  try {
    const { data } = await storefrontClient.mutate({
      mutation: CUSTOMER_CREATE,
      variables: {
        input: {
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          // phone: phone
        }
      }
    });
  
    return data.customerCreate;
  } catch (err) {
    console.warn(err)
  }
}

export default cusomterCreate;
