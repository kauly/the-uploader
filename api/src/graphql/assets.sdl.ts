export const schema = gql`
  type Asset {
    id: String!
    name: String!
    location: String!
    ext: String!
  }

  type Query {
    assets: [Asset!]! @requireAuth
    asset(id: String!): Asset @requireAuth
  }

  input CreateAssetInput {
    name: String!
    file: String!
  }

  input UpdateAssetInput {
    name: String
    location: String
    file: String
  }

  type Mutation {
    createAsset(input: CreateAssetInput!): Asset! @requireAuth
    updateAsset(id: String!, input: UpdateAssetInput!): Asset! @requireAuth
    deleteAsset(id: String!): Asset! @requireAuth
  }
`
