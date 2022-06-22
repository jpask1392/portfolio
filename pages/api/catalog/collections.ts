import { 
  getCollectionByHandle,
  getCollectionsByQuery,
} from "@/shopify/operations";

export default async function collections(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      const query = req.query;
      const key = Object.keys(query)[0];

      // run function based on param
      const fetcher: any = {
        handle: getCollectionByHandle,
        query: getCollectionsByQuery,
      }

      const data = await fetcher[key](query[key]);

      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({message: "Could not find collection"});  
      }
    } catch (err) {
      res.status(500);
    } 
  }

  if (req.method === 'POST') {
    try {
      const body = req.body;
      const filters = body.filters?.map((filterString: string) => JSON.parse(filterString));
      const sortBy = body.sortKey;
      const reverse = body.reverse;

      const data = await getCollectionByHandle(body.handle, filters, sortBy, reverse);

      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404);  
      }
    
    } catch (err) {
      console.log("err:", err)
      res.status(500);
    } 
  }
}
