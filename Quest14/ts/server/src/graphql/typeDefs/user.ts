import { gql } from 'apollo-server-express';

export default gql`
  type Mutation {
    login(userId: String, userPw: String): String
  }
`;
