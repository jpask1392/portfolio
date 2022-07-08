import { normalizeProduct } from "./normalizeProduct";

export function normalizeCollection({
  id,
  title,
  descriptionHtml,
  products,
  handle,
  image,
  collectionHeader,
  ...rest
} : {
  id: string
  title: string
  descriptionHtml: string
  products?: any
  handle: string
  image: any
  collectionHeader: any
}) {
  return {
    id,
    title: title.substring(title.indexOf("*") + 1),
    ...(descriptionHtml && { descriptionHtml }),
    descriptionHtml,
    handle,
    filters: products?.filters || [],
    pagination: {
      ...products.pageInfo,
    },
    products: products ? (
      products
        .edges
        .map(({ 
          node, 
        } : { 
          node: any
        }) => normalizeProduct(node))
    ) : [],
    image: image ? {
      ...image,
      filename: image.url,
      alt: image.altText, 
    } : null,
    collectionHeader: collectionHeader?.reference.image ? {
      ...collectionHeader?.reference.image,
      filename: collectionHeader?.reference.image.url,
      alt: collectionHeader?.reference.image.altText, 
    } : null,
    ...rest,
  }
}
