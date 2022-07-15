import { 
  customerCreateAccessToken,
  customerCreate,
  getCustomerByAccessToken,
  customerCreateAddress,
  customerDeleteAddress,
} from "@/shopify/operations";

export default async function account(req: any, res: any) {
  if (req.method !== 'POST') {
    // TODO: return an error message here
    return;
  }

  const { 
    action = false
  } = req.query;

  /**
   * See related operations to view required params
   */
  const actionsMap: any = {
    createToken : customerCreateAccessToken,
    createCustomer : customerCreate,
    getCustomer : getCustomerByAccessToken,
    createAddress : customerCreateAddress,
    deleteAddress : customerDeleteAddress,
  }

  if ( action && action in actionsMap ) {
    let payload;

    try {
      payload = await actionsMap[action]({...req.body});
      res.status(200).json(payload);
    } catch (error) {

    }
  }
}
