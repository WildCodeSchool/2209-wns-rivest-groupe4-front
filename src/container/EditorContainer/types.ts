import IFolderTree from "../../interfaces/IFolderTree";

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
  getAllFoldersByProjectId: IFolderTree[];
}

export interface ExistingProjectQueryVariables {
  id: number;
}
