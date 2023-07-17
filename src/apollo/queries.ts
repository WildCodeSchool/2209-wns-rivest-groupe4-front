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
      hashedPassword
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

export const GET_PROJECTS_SUPPORTED = gql`
  query Query($userId: String!) {
    getProjectsSupported(userId: $userId) {
      comments {
        id
      }
      createdAt
      description
      updatedAt
      name
      isPublic
      id
      likes {
        user {
          id
          pseudo
        }
      }
      user {
        id
        pseudo
      }
    }
  }
`;

export const GET_PROJECT_BY_ID = gql`
  query GetOneProject($getOneProjectId: Float!) {
    getOneProject(id: $getOneProjectId) {
      comments {
        comment
        createdAt
        updatedAt
        user {
          pseudo
        }
      }
      createdAt
      description
      likes {
        user {
          pseudo
          id
        }
      }
      name
      updatedAt
      user {
        id
        pseudo
      }
    }
  }
`;

export const GET_COMMENTS_BY_IDPROJECT = gql`
  query GetAllCommentsByProjectId($getAllCommentsByProjectIdIdProject: Float!) {
    getAllCommentsByProjectId(idProject: $getAllCommentsByProjectIdIdProject) {
      id
      comment
      createdAt
      updatedAt
      user {
        id
        pseudo
        premium
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

export const GET_FOLDER_BY_IDPROJECT = gql`
  query GetAllFoldersByProjectId($idProject: Float!) {
    getAllFoldersByProjectId(idProject: $idProject) {
      id
      name
      files {
        id
        content
        extension
        name
      }
      parentFolder {
        id
      }
    }
  }
`;
export const GET_DAILY_RUNS = gql`
  query getDailyRunsUser {
    getDailyRunsUser
  }
`;

export const GET_USER_LIKES = gql`
  query getMonthlyLikesByUser {
    getMonthlyLikesByUser {
      id
    }
  }
`;

export const GET_USER_COMMENTS = gql`
  query getMonthlyCommentsByUser {
    getMonthlyCommentsByUser {
      id
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
        id
        pseudo
      }
      createdAt
    }
  }
`;

export const GET_TOKEN_WITH_USER = gql`
  query Query($password: String!, $email: String!) {
    getTokenWithUser(password: $password, email: $email) {
      user {
        dailyRuns
        email
        id
        premium
        pseudo
      }
      token
    }
  }
`;
