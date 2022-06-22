import { gql } from "@apollo/client";

export const productDetailsFragment = gql`
  fragment productDetails on Product {
    id
    title
    subTitle: metafield(namespace: "my_fields", key: "product_subtitle") {
      value
    }
    seo {
      description
      title
    }
    handle
    availableForSale
    vendor
    compareAtPriceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    createdAt
    description
    descriptionHtml
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    productType
    publishedAt
    tags
    images(first: 10) {
      edges {
        node {
          id
          altText
          height
          url
          thumbnail_url: url (transform: {
            maxWidth: 10
            maxHeight: 10
          })
          width
        }
      }
    }
    options {
      id
      name
      values
    }
    variants(first: 10) {
      edges {
        node {
          id
          sku
          title
          priceV2 {
            amount
            currencyCode
          }
          compareAtPriceV2 {
            amount
            currencyCode
          }
          description: metafield(namespace: "my_fields", key: "description") {
            value
          }
          requiresShipping
          availableForSale
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;