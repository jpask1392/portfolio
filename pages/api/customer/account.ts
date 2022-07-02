import { 
  customerCreateAccessToken,
  customerCreate,
  getCustomerByAccessToken
} from "@/shopify/operations";

export default async function account(req: any, res: any) {
  const { 
    action = false
  } = req.query;

  if (req.method === 'POST') {
    let payload;

    try {
      if (action && action === "createToken")  {
        const {
          email,
          password
        } = req.body;

        payload = await customerCreateAccessToken(email, password);
      }

      if (action && action === "createCustomer")  {
        const {
          email,
          password
        } = req.body;

        payload = await customerCreate({email, password});
      }

      if (action && action === "getCustomer")  {
        const {
          customerAccessToken
        } = req.body;

        payload = await getCustomerByAccessToken(customerAccessToken);
      }

      res.status(200).json(payload);
    } catch (err) {

    }
  }
}
