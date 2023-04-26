import { gql } from "@apollo/client";

// USER MUTATIONS
export const MODIFY_USER = gql`
  mutation ModifyUser($pseudo: String, $password: String, $email: String) {
    modifyUser(pseudo: $pseudo, password: $password, email: $email) {
      token
    }
  }
`;

// PROJECT MUTATIONS
export const CREATE_PROJECT = gql`
  mutation CreateProject(
    $description: String!
    $name: String!
    $public: Boolean!
  ) {
    createProject(description: $description, name: $name, isPublic: $public) {
      id
    }
  }
`;
