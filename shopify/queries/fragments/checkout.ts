import { gql } from "@apollo/client";

export const checkoutDetailsFragment = gql`
  fragment checkoutDetails on Checkout {
    id
    ready
    webUrl
    discountApplications(first: 5) {
      edges {
        node {
          ... on DiscountCodeApplication {
            allocationMethod
            applicable
            targetType
            targetSelection
            code
            value {
              ... on MoneyV2 {
                  amount
                  currencyCode
                }
            }
          }
        }
      }
    }
    lineItemsSubtotalPrice {
      amount
      currencyCode
    }
    subtotalPriceV2 {
      amount
      currencyCode
    }
    totalTaxV2 {
      amount
      currencyCode
    }
    totalPriceV2 {
      amount
      currencyCode
    }
    completedAt
    createdAt
    taxesIncluded
    lineItems(first: 250) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          title
          discountAllocations {
            discountApplication {
              allocationMethod
              targetSelection
              targetType
              value
            }
            allocatedAmount {
              amount
              currencyCode
            }
          }
          variant {
            id
            sku
            title
            selectedOptions {
              name
              value
            }
            image {
              originalSrc
              altText
              width
              height
            }
            priceV2 {
              amount
              currencyCode
            }
            compareAtPriceV2 {
              amount
              currencyCode
            }
            product {
              handle
            }
          }
          quantity
        }
      }
    }
  }
`
