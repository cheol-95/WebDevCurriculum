import { gql } from 'apollo-server-express';

export default gql`
  type File {
    name: String!
    text: String!
  }

  type Query {
    files: [File]
    file(fileName: String): File
  }
  type Mutation {
    createFile(fileName: String): Boolean
    deleteFile(fileName: String): Boolean
    saveFile(fileName: String, text: String): Boolean
    saveAsFile(oldFileName: String, newFileName: String, text: String): Boolean
  }
`;
