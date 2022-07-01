import { gql } from "@apollo/client";
import { productDetailsFragment } from "./fragments";

const getCollectionByHandle = gql`
  query getCollectionByHandle(
    $handle: String!
    $productFilters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
  ) {
    collectionByHandle(handle: $handle) {
      id
      title
      handle
      descriptionHtml
      image {
        id
        url
        thumbnail_url: url (transform: {
          maxWidth: 10
          maxHeight: 10
        })
        height
        width
        altText
      }
      collectionHeader: metafield(namespace: "custom", key: "collection_page_header") {
        reference {
          ... on MediaImage {
            image {
              id
              url
              thumbnail_url: url (transform: {
                maxWidth: 10
                maxHeight: 10
              })
              height
              width
              altText
            }
          }
        }
      }
      subHeader: metafield(namespace: "custom", key: "subHeader") {
        value
      }
      products(
        first: 200
        filters: $productFilters
        sortKey: $sortKey
        reverse: $reverse
      ) {
        filters {
          id
          label
          type
          values {
            label
            count
            input
            id
          }
        }
        edges {
          cursor
          node {
            ...productDetails
          }
        }
      }
    }
  }

  ${productDetailsFragment}
`;

export default getCollectionByHandle;
