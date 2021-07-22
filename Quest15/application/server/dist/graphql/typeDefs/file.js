"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql `
  type File {
    name: String!
    text: String!
  }

  type Query {
    files: [File]
    file(fileName: String): File
  }
  extend type Mutation {
    createFile(fileName: String): Boolean
    deleteFile(fileName: String): Boolean
    saveFile(fileName: String, text: String): Boolean
    saveAsFile(oldFileName: String, newFileName: String, text: String): Boolean
  }
`;
