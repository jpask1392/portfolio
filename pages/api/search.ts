import { 
  searchStore,
} from "@/shopify/operations";

export default async function collections(req: any, res: any) {
  // only allow POST methods at this endpoint
  if (req.method !== 'GET') return;

  try {
    const { query: { q } } = req;
    let resData = await searchStore(q);
    // return the succesful checkout to client
    res.status(200).json(resData)
  } catch (err) {
    res.status(500).json('err');
  } 
}
