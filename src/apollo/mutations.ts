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
