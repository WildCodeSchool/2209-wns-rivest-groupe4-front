export interface CreateNewProjectMutationResult {
  createProject: {
    id: number;
  };
}

export interface CreateNewProjectMutationVariables {
  userId: string;
  description: string;
  name: string;
  public: boolean;
}

export interface CurrentProject {
  id: string;
  name: string;
  description: string;
  public: boolean;
}

export interface ExistingProjectQueryResult {
  getOneProject: CurrentProject;
  getAllFoldersByProjectId: FolderTree[];
}

export interface ExistingProjectQueryVariables {
  id: number;
}

export interface FolderTree {
  id?: string;
  parentFolder?: string | null;
  name: string;
  files: Array<{
    content: string;
    extension: string;
    name: string;
  }>;
}
