import { 
  getProductByHandle,
  getProductRecommendations 
} from "@/shopify/operations";

export default async function products(req: any, res: any) {
  // only allow get requests
  if (req.method === 'GET') {
    try {
      const query = req.query;
      const key = Object.keys(query)[0];

      // run function based on param
      const fetcher: any = {
        handle: getProductByHandle,
        recommendationProductID: getProductRecommendations,
      }

      const data = await fetcher[key](query[key]);

      res.status(200).json(data);
    } catch (err) {
      res.status(500);
    } 
  }
}
