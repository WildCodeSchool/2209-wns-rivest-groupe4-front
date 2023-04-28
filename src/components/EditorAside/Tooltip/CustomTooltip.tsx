import { Tooltip } from "flowbite-react";
import React from "react";

interface Props {
  type: string;
  setShowAddFolderModal: () => void;
  setShowAddFileModal: () => void;
  setShowDeleteModal: () => void;
  setShowRenameModal: () => void;
}

function CustomTooltip({
  type,
  setShowAddFolderModal,
  setShowAddFileModal,
  setShowDeleteModal,
  setShowRenameModal,
}: Props) {
  return (
    <div className="inline-block px-2">
      <Tooltip
        arrow={false}
        placement="right"
        content={
          <>
            {type === "folder" && (
              <>
                <button
                  className="block"
                  type="button"
                  onClick={setShowAddFolderModal}
                >
                  Create folder
                </button>
                <button
                  className="block"
                  type="button"
                  onClick={setShowAddFileModal}
                >
                  Create file
                </button>
              </>
            )}
            <button
              className="block"
              type="button"
              onClick={setShowDeleteModal}
            >
              Delete
            </button>
            <button
              className="block"
              type="button"
              onClick={setShowRenameModal}
            >
              Rename
            </button>
          </>
        }
        trigger="click"
      >
        ...
      </Tooltip>
    </div>
  );
}

export default CustomTooltip;
