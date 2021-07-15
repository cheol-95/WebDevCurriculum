import { gql } from 'apollo-server-express';

export default gql`
  type File {
    name: String!
    text: String!
  }

  type Query {
    files: [String]
    file(fileName: String): File
  }
  extend type Mutation {
    createFile(fileName: String): Boolean
    deleteFile(fileName: String): Boolean
    saveFile(fileName: String, text: String): Boolean
    saveAsFile(oldFileName: String, newFileName: String, text: String): Boolean
  }
`;
