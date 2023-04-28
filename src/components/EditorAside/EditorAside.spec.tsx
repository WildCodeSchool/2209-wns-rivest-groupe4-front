/* eslint-disable @typescript-eslint/ban-types */
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import { ExistingProjectQueryResult } from "../../container/EditorContainer/types";

import EditorAside from "./EditorAside";
import {
  ADD_FILE,
  ADD_FOLDER,
  DELETE_FILE,
  DELETE_FOLDER,
  RENAME_FILE,
  RENAME_FOLDER,
} from "../../apollo/mutations";

type Props = {
  projectData: ExistingProjectQueryResult;
  mocks: Array<MockedResponse>;
  refetch: () => {};
};

const mutationMocks: Array<MockedResponse> = [
  {
    request: {
      query: ADD_FOLDER,
      variables: {
        parentFolderId: 1,
        name: "fooFolder",
      },
    },
    result: {
      data: {
        addFolder: {
          id: "3",
          name: "fooFolder",
          parentFolder: {
            id: "2",
            name: "barFolder",
          },
        },
      },
    },
  },
  {
    request: {
      query: ADD_FILE,
      variables: {
        parentFolderId: 2,
        extension: "js",
        name: "fooFile",
      },
    },
    result: {
      data: {
        addFile: {
          id: "2",
          name: "fooFile",
          extension: "js",
        },
      },
    },
  },
  {
    request: { query: DELETE_FOLDER, variables: { folderId: 1 } },
    result: {
      data: {
        deleteFolder: "Folder deleted",
      },
    },
  },
  {
    request: { query: DELETE_FILE, variables: { fileId: 1 } },
    result: {
      data: {
        deleteFile: "File deleted",
      },
    },
  },
  {
    request: {
      query: RENAME_FOLDER,
      variables: {
        folderId: 1,
        name: "newFooFolder",
      },
    },
    result: {
      data: {
        renameFolder: {
          id: "1",
          name: "newFooFolder",
        },
      },
    },
  },
  {
    request: {
      query: RENAME_FILE,
      variables: {
        name: "fooFile",
        idFile: 1,
      },
    },
    result: {
      data: {
        modifyFile: {
          id: "1",
          name: "fooFile",
        },
      },
    },
  },
];

const MOCK_PROJECT: ExistingProjectQueryResult = {
  getOneProject: {
    id: "1",
    name: "Project 1",
    description: "Project 1 description",
    public: true,
  },
  getAllFoldersByProjectId: [
    {
      id: "1",
      name: "Folder 1",
      parentFolder: undefined,
      children: [
        {
          id: "2",
          name: "Folder 2",
          parentFolder: {
            id: "1",
            name: "Folder 1",
          },
        },
      ],
      files: [
        {
          content: "File 1 content",
          extension: "js",
          name: "File 1",
        },
      ],
    },
  ],
};

describe("EditorAside component", () => {
  const setup = ({ projectData, mocks, refetch }: Props) =>
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <EditorAside
          projectData={projectData}
          setCurrentFile={() => {}}
          refetch={refetch}
        />
      </MockedProvider>,
    );

  it("Shows relevant elements by default", () => {
    const refetchFn = jest.fn();
    setup({
      mocks: mutationMocks,
      projectData: MOCK_PROJECT,
      refetch: refetchFn,
    });

    expect(screen.getByTestId("editor-aside")).toBeDefined();
    expect(screen.getByText("Folder 1")).toBeDefined();

    fireEvent.click(screen.getByText("Folder 1"));
    expect(screen.getByText("File 1.js")).toBeDefined();
  });

  it("Call refetch when user adds a folder", async () => {
    const refetchFn = jest.fn();
    setup({
      mocks: mutationMocks,
      projectData: MOCK_PROJECT,
      refetch: refetchFn,
    });

    expect(screen.queryByTestId("flowbite-tooltip")).toBeNull();

    await userEvent.hover(screen.getByText("Folder 1"));

    expect(screen.getByTestId("flowbite-tooltip")).toBeDefined();

    fireEvent.click(screen.getByText("Create folder"));

    fireEvent.change(screen.getByPlaceholderText("Folder name"), {
      target: { value: "fooFolder" },
    });

    fireEvent.click(screen.getByText("Create"));

    await act(async () => {
      // eslint-disable-next-line no-promise-executor-return
      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    expect(refetchFn).toHaveBeenCalled();
  });
});
