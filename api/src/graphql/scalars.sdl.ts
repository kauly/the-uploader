export const schema = gql`
  scalar File

  type Mutation {
    readTextFile(file: File!): String! @requireAuth
    saveFile(file: File!): Boolean! @requireAuth
  }
`
