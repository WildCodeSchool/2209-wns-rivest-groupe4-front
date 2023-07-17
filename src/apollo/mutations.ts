import { gql } from "@apollo/client";

// USER MUTATION
export const CREATE_USER = gql`
  mutation Mutation($pseudo: String!, $password: String!, $email: String!) {
    createUser(pseudo: $pseudo, password: $password, email: $email) {
      token
      user {
        id
      }
    }
  }
`;
export const MODIFY_USER = gql`
  mutation ModifyUser($pseudo: String, $password: String, $email: String) {
    modifyUser(pseudo: $pseudo, password: $password, email: $email) {
      token
    }
  }
`;

export const ADD_RUN = gql`
  mutation Mutation {
    addRun {
      id
      dayOfRun
      dailyRuns
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

export const SAVE_PROJECT = gql`
  mutation ModifyFile(
    $idFile: Float!
    $fileName: String
    $fileContent: String
    $fileExtension: String
  ) {
    modifyFile(
      idFile: $idFile
      name: $fileName
      content: $fileContent
      extension: $fileExtension
    ) {
      id
      name
      content
      extension
    }
  }
`;

export const ADD_FOLDER = gql`
  mutation AddFolder($parentFolderId: Float!, $name: String!) {
    addFolder(parentFolderId: $parentFolderId, name: $name) {
      id
      name
      parentFolder {
        id
        name
      }
    }
  }
`;

export const ADD_FILE = gql`
  mutation Addfile(
    $parentFolderId: Float!
    $extension: String!
    $name: String!
  ) {
    addFile(folderId: $parentFolderId, extension: $extension, name: $name) {
      id
      name
      extension
    }
  }
`;

export const DELETE_FOLDER = gql`
  mutation DeleteFolder($folderId: Float!) {
    deleteFolder(folderId: $folderId)
  }
`;

export const DELETE_FILE = gql`
  mutation DeleteFolder($fileId: Float!) {
    deleteFile(fileId: $fileId)
  }
`;

export const RENAME_FOLDER = gql`
  mutation RenameFolder($folderId: Float!, $name: String) {
    renameFolder(folderId: $folderId, name: $name) {
      id
      name
    }
  }
`;

export const RENAME_FILE = gql`
  mutation RenameFile($name: String, $idFile: Float!) {
    modifyFile(name: $name, idFile: $idFile) {
      id
      name
    }
  }
`;

export const ADD_LIKE = gql`
  mutation Mutation($idProject: Float!) {
    addLike(idProject: $idProject) {
      id
    }
  }
`;

export const DELETE_LIKE = gql`
  mutation DeleteLike($idProject: Float!) {
    deleteLike(idProject: $idProject)
  }
`;

export const UPDATE_PUBLIC_STATE = gql`
  mutation Mutation($modifyProjectId: Float!, $isPublic: Boolean) {
    modifyProject(id: $modifyProjectId, isPublic: $isPublic) {
      id
      isPublic
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation Mutation(
    $modifyProjectId: Float!
    $description: String
    $name: String
  ) {
    modifyProject(
      id: $modifyProjectId
      description: $description
      name: $name
    ) {
      id
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation Mutation($idComment: Float!) {
    deleteComment(idComment: $idComment)
  }
`;

export const MODIFY_COMMENT = gql`
  mutation Mutation($content: String!, $modifyCommentId: Float!) {
    modifyComment(content: $content, id: $modifyCommentId)
  }
`;

export const ADD_COMMENT = gql`
  mutation Mutation($idProject: Float!, $comment: String!) {
    addComment(idProject: $idProject, comment: $comment) {
      comment
      createdAt
      id
      updatedAt
      user {
        premium
        id
        pseudo
      }
      project {
        id
      }
    }
  }
`;
