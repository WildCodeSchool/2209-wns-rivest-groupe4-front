import { ExistingProjectQueryResult } from "../container/EditorContainer/types";

const mockProject: ExistingProjectQueryResult = {
  getOneProject: {
    description: "Project 1 Description",
    id: "1",
    name: "Project 1",
    public: true,
  },
  getAllFoldersByProjectId: [
    {
      name: "Folder 1",
      id: "folder1",
      files: [
        {
          content: "File 1 Content",
          extension: ".txt",
          name: "file1",
          id: "1",
        },
        {
          content: "File 2 Content",
          extension: ".txt",
          name: "file2",
          id: "2",
        },
      ],
    },
    {
      name: "Folder 2",
      id: "folder2",
      files: [
        {
          content: "File 3 Content",
          extension: ".txt",
          name: "file3",
          id: "3",
        },
        {
          content: "File 4 Content",
          extension: ".txt",
          name: "file4",
          id: "4",
        },
      ],
    },
  ],
};

export default { mockProject };
