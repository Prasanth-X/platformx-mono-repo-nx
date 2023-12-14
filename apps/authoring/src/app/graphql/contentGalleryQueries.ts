import { gql } from '@apollo/client';

export const FETCH_ALL_MULTISLOT_CONTENT_LIST = gql`
  query FETCH_ALL_MULTISLOT_CONTENT_LIST(
    $filter: authoring_CONTENT_TYPE_FILTER!
    $searchTerm: String!
    $pagination: authoring_Paginate!
    $tags: [String]!
    $isSuggestive: Boolean
  ) {
    authoring_getDynamicContentSearch(
      filter: $filter
      searchTerm: $searchTerm
      pagination: $pagination
      tags: $tags
      isSuggestive: $isSuggestive
    )
  }
`;

/**
 * product get list
 */
export const FETCH_ALL_ECOM_PRODUCT_CONTENT_LIST = gql`
query FETCH_ALL_ECOM_PRODUCT_CONTENT_LIST(
  $filter: authoring_CONTENT_TYPE_FILTER!
  $searchTerm: String!
  $pagination: authoring_Paginate!
  $tags: [String]!
  $isSuggestive: Boolean
  $ecommerceRequest: authoring_ecommerceRequest!
) {
  authoring_getDynamicContentSearch(
    filter: $filter
    searchTerm: $searchTerm
    pagination: $pagination
    tags: $tags
    isSuggestive: $isSuggestive
    ecommerceRequest: $ecommerceRequest
  )
}`;

/**
 * filter get list
 */
export const FETCH_ALL_FILTER_PRODUCT_LIST = gql`
query FETCH_ALL_FILTER_PRODUCT_LIST(
  $filter:  [String]!
  $searchTerm: String!
) {
  authoring_getEcommerceCategories(
    filter: $filter
    searchTerm: $searchTerm
  )
}`;
