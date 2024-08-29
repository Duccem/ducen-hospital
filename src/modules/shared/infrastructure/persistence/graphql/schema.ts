import gql from 'graphql-tag';

export const schema = gql`
  scalar DateTime
  scalar Void
  type Query {
    ping: String
  }

  input Criteria {
    filters: [Filter]
    pagination: Pagination
    order: Order
  }

  input Filter {
    field: String
    operator: String
    value: String
  }

  input Pagination {
    first: Int
    after: String
    last: Int
    before: String
    offset: Int
  }

  enum OrderDirection {
    ASC
    DESC
  }

  input Order {
    orderBy: String
    orderDirection: OrderDirection
  }

  type PageInfo {
    hasNextPage: Boolean
    hasPreviousPage: Boolean
    startCursor: String
    endCursor: String
    offset: Int
    pageSize: Int
  }

  interface Collection {
    totalCount: Int
    pageInfo: PageInfo
  }
`;
