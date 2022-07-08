import { gql } from "@apollo/client";
import { productDetailsFragment } from "./fragments";

const getCollectionByHandle = gql`
  query getCollectionByHandle(
    $handle: String!
    $productFilters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys
    $reverse: Boolean
    $after: String
    $before: String
    $first: Int
    $last: Int
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
        filters: $productFilters
        sortKey: $sortKey
        reverse: $reverse
        first: $first
        last: $last
        after: $after
        before: $before
      ) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
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
