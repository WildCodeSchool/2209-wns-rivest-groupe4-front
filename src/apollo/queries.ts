import { gql } from "@apollo/client";

// USER QUERIES
export const GET_LOGGED_USER = gql`
  query GetLoggedUser {
    getLoggedUser {
      id
      email
      pseudo
      premium
      dailyRuns
    }
  }
`;

export const GET_ONE_USER = gql`
  query Query($getOneUserId: String!) {
    getOneUser(id: $getOneUserId) {
      email
      dailyRuns
      premium
      pseudo
    }
  }
`;

// PROJECT QUERIES
export const GET_PROJECTS = gql`
  query Query($userId: String!) {
    getProjectsByUserId(userId: $userId) {
      comments {
        id
      }
      likes {
        user {
          id
          pseudo
        }
      }
      createdAt
      description
      updatedAt
      name
      isPublic
      id
      user {
        id
        pseudo
      }
    }
  }
`;
