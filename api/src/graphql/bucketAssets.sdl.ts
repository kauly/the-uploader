export const schema = gql`
  type BucketAsset {
    id: String!
    name: String!
    version: Int!
  }

  type Query {
    bucketAssets: [BucketAsset!]! @requireAuth
    bucketAsset(id: String!): BucketAsset @requireAuth
    bucketAssetByName(name: String!): BucketAsset @requireAuth
  }

  input CreateBucketAssetInput {
    name: String!
    file: String!
  }

  input UpdateBucketAssetInput {
    name: String
    version: Int
  }

  type Mutation {
    createBucketAsset(input: CreateBucketAssetInput!): BucketAsset! @requireAuth
    updateBucketAsset(
      id: String!
      input: UpdateBucketAssetInput!
    ): BucketAsset! @requireAuth
    deleteBucketAsset(id: String!): BucketAsset! @requireAuth
  }
`
