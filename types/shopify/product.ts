import type { Variant } from "./variant"

export type Product = {
  description: string,
  descriptionHtml: string,
  created_at: Date,
  handle: string,
  id: number,
  images: any[],
  options: any[],
  product_type: string,
  published_at: Date,
  published_scope: string,
  status: string,
  tags: string,
  template_suffix: string,
  title: string,
  subtitle: string,
  updated_at: Date,
  variants: Variant[],
  vendor: string,
  details: string[],
  moreinfo: string,
}
