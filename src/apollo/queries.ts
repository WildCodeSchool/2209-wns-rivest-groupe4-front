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

export const GET_CHOSEN_PROJECT = gql`
  query GetOneProject($id: Float!) {
    getOneProject(id: $id) {
      id
      description
      createdAt
      name
      isPublic
      updatedAt
    }
    getAllFoldersByProjectId(idProject: $id) {
      name
      id
      parentFolder {
        name
        id
      }
      files {
        id
        content
        extension
        name
      }
    }
  }
`;

export const GET_SHARED_PROJECTS = gql`
  query GetSharedProjects(
    $offset: Float!
    $limit: Float!
    $order: String
    $orderBy: String
  ) {
    getSharedProjects(
      offset: $offset
      limit: $limit
      order: $order
      orderBy: $orderBy
    ) {
      id
      name
      description
      likes {
        user {
          id
        }
      }
      comments {
        id
      }
      reports {
        id
      }
      user {
        pseudo
      }
      createdAt
    }
  }
`;
