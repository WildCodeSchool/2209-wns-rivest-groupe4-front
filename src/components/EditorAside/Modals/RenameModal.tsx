import { Button, Modal, TextInput } from "flowbite-react";
import React, { useState } from "react";

interface Props {
  showRenameModal: { type: string; id: string } | null;
  setShowRenameModal: (arg: { type: string; id: string } | null) => void;
  renameFolder: (arg: { folderId: number; name: string }) => void;
  renameFile: (arg: { fileId: number; name: string }) => void;
}

function RenameModal({
  showRenameModal,
  setShowRenameModal,
  renameFolder,
  renameFile,
}: Props) {
  const [newName, setNewName] = useState<string>("");

  const handleRename = () => {
    if (showRenameModal?.type === "folder") {
      renameFolder({
        folderId: parseInt(showRenameModal.id, 10),
        name: newName,
      });
    }
    if (showRenameModal?.type === "file") {
      renameFile({ fileId: parseInt(showRenameModal.id, 10), name: newName });
    }
  };
  return (
    <Modal
      show={showRenameModal !== null}
      onClose={() => setShowRenameModal(null)}
    >
      <Modal.Header>Folder Name</Modal.Header>
      <Modal.Body>
        <TextInput
          id="newFolderName"
          type="text"
          placeholder="Folder name"
          value={newName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewName(e.target.value)
          }
        />
        <div className="grid place-items-center">
          <Button onClick={handleRename}>Create</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default RenameModal;
