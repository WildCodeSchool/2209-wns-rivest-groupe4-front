import { Button, Modal, TextInput } from "flowbite-react";
import React from "react";

interface Props {
  showAddFileModal: { parentFolder: string } | null;
  setShowAddFileModal: (arg: { parentFolder: string } | null) => void;
  newFileName: string;
  setNewFileName: (e: string) => void;
  onSubmit: (arg: { folderId: string; name: string }) => void;
}

function AddFileModal({
  showAddFileModal,
  setShowAddFileModal,
  newFileName,
  setNewFileName,
  onSubmit,
}: Props) {
  return (
    <Modal
      show={showAddFileModal !== null}
      onClose={() => setShowAddFileModal(null)}
    >
      <Modal.Header>File Name</Modal.Header>
      <Modal.Body>
        <TextInput
          id="newFileName"
          type="text"
          placeholder="File name"
          value={newFileName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewFileName(e.target.value)
          }
        />
        <div className="grid place-items-center">
          <Button
            onClick={() => {
              if (showAddFileModal) {
                onSubmit({
                  folderId: showAddFileModal?.parentFolder,
                  name: newFileName,
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

export default AddFileModal;
