import { Button, Modal } from "flowbite-react";
import React from "react";

interface Props {
  showDeleteModal: { type: string; id: string } | null;
  setShowDeleteModal: (arg: { type: string; id: string } | null) => void;
  deleteFolder: (folderId: number) => void;
  deleteFile: (fileId: number) => void;
}

function DeleteModal({
  showDeleteModal,
  setShowDeleteModal,
  deleteFolder,
  deleteFile,
}: Props) {
  const handleDeletion = () => {
    if (showDeleteModal?.type === "folder") {
      deleteFolder(parseInt(showDeleteModal.id, 10));
    }
    if (showDeleteModal?.type === "file") {
      deleteFile(parseInt(showDeleteModal.id, 10));
    }
  };

  return (
    <Modal
      show={showDeleteModal !== null}
      onClose={() => setShowDeleteModal(null)}
    >
      <Modal.Header>Supprimer</Modal.Header>
      <Modal.Body>
        <div className="flex justify-between">
          <Button onClick={handleDeletion}>Confirmer</Button>
          <Button onClick={() => setShowDeleteModal(null)}>Annuler</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteModal;
