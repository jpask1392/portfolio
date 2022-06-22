import { 
  customerCreateAccessToken,
} from "@/shopify/operations";

export default async function accountLogin(req: any, res: any) {
  const {
    email,
    password
  } = req.body;

  if (req.method === 'POST') {
    try {
      let payload = await customerCreateAccessToken(email, password);
      res.status(200).json(payload);
    } catch (err) {

    }
  }
}
