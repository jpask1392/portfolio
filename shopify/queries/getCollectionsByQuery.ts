import { gql } from "@apollo/client";
import { productDetailsFragment } from "./fragments";

const getCollectionsByQuery = gql`
  query getCollectionsByQuery(
    $query: String!, 
    $product_filters: [ProductFilter!],
    $product_count: Int!
    $with_products: Boolean!
  ) {
    collections(first: 10, query: $query) {
      edges {
        node {
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
            width
            altText
          }
          products(
            first: $product_count, 
            filters: $product_filters
          ) @include(if: $with_products) {
            edges {
              cursor
              node {
                __typename
                ...productDetails
              }
            }
          }
        }
      }
    }
  }

  ${productDetailsFragment}
`;

export default getCollectionsByQuery;
