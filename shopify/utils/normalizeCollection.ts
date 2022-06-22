import { normalizeProduct } from "./normalizeProduct";

export function normalizeCollection({
  id,
  title,
  descriptionHtml,
  products,
  handle,
  image,
} : {
  id: string
  title: string
  descriptionHtml: string
  products?: any
  handle: string
  image: any
}) {
  return {
    id,
    title: title.substring(title.indexOf("*") + 1),
    ...(descriptionHtml && { descriptionHtml }),
    descriptionHtml,
    handle,
    filters: products?.filters || [],
    products: products ? products
      .edges
      .map(({ 
        node, 
        cursor 
      } : { 
        node: any
        cursor: string
      }) => normalizeProduct(node, cursor)) : [],
    image: image ? {
      ...image,
      filename: image.url,
      alt: image.altText, 
    } : null,
  }
}
