import { Button, Modal, TextInput } from "flowbite-react";
import React from "react";

interface Props {
  showAddFolderModal: { parentFolder: string } | null;
  setShowAddFolderModal: (arg: { parentFolder: string } | null) => void;
  newFolderName: string;
  setNewFolderName: (e: string) => void;
  onSubmit: (arg: { folderId: string; name: string }) => void;
}

function AddFolderModal({
  showAddFolderModal,
  setShowAddFolderModal,
  newFolderName,
  setNewFolderName,
  onSubmit,
}: Props) {
  return (
    <Modal
      show={showAddFolderModal !== null}
      onClose={() => setShowAddFolderModal(null)}
    >
      <Modal.Header>Folder Name</Modal.Header>
      <Modal.Body>
        <TextInput
          id="newFolderName"
          type="text"
          placeholder="Folder name"
          value={newFolderName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewFolderName(e.target.value)
          }
        />
        <div className="grid place-items-center">
          <Button
            onClick={() => {
              if (showAddFolderModal) {
                onSubmit({
                  folderId: showAddFolderModal.parentFolder,
                  name: newFolderName,
                });
              }
            }}
          >
            Create
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default AddFolderModal;
