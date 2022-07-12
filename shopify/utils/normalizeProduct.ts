const normalizeProductImages = ({ edges } : { edges: any }) =>
  edges?.map(({ 
    node: { 
      url,
      height,
      width,
      altText,
      id,
      thumbnail_url,
    } 
  } : {
    node: any
  }) => ({
    thumbnail_url,
    filename: url,
    height,
    width,
    alt: altText, 
    id
  }))

const normalizeProductVariants = ({ edges } : { edges: any }) => {
  return edges?.map(
    ({
      node: {
        id,
        selectedOptions,
        sku,
        title,
        priceV2,
        compareAtPriceV2,
        requiresShipping,
        availableForSale,
        description,
      },
    } : { node: any }) => {
      return {
        id,
        name: title,
        sku: sku ?? id,
        price: +priceV2.amount,
        compare_at_price: +compareAtPriceV2?.amount,
        requiresShipping,
        availableForSale,
        option1: selectedOptions[0].value,
        option2: selectedOptions.length > 1 && selectedOptions[1].value,
        option3: selectedOptions.length > 2 && selectedOptions[2].value,
        description: description?.value || null,
      }
    }
  )
}

export function normalizeProduct({
  id,
  title,
  subTitle,
  vendor,
  images,
  variants,
  description,
  descriptionHtml,
  handle,
  priceRange,
  options,
  ...rest
} : {
  id: string
  title: string
  subTitle: {
    value: string
  }
  vendor: string
  images: any
  variants: any
  description: string
  descriptionHtml: string
  handle: string
  priceRange: any
  options: any
}) {
  return {
    id,
    title,
    subtitle: subTitle?.value || null,
    vendor,
    handle: handle?.replace(/^\/+|\/+$/g, ''),
    price: priceRange?.minVariantPrice,
    images: images.edges.length ? normalizeProductImages(images) : [],
    variants: variants ? normalizeProductVariants(variants) : [],
    options: options
      ? options
          .filter((o: any) => o.name !== 'Title') // By default Shopify adds a 'Title' name when there's only one option. We don't need it. https://community.shopify.com/c/Shopify-APIs-SDKs/Adding-new-product-variant-is-automatically-adding-quot-Default/td-p/358095
          // .map((o) => normalizeProductOption(o))
      : [],
    ...(description && { description }),
    ...(descriptionHtml && { descriptionHtml }),
    ...rest,
  }
}
