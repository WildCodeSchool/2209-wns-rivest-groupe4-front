import { useQuery } from "@apollo/client";
import { Button, ListGroup, Modal, Spinner } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLoggedUser from "../hooks/useLoggedUser";
import { GET_PROJECTS } from "../apollo/queries";

export default function OpenProjectModal() {
  const { user, loading: userIsLoading } = useLoggedUser();

  const [showOpenProjectModal, setShowOpenProjectModal] = useState(false);

  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_PROJECTS, {
    skip: user.id === undefined,
    variables: { userId: user?.id },
  });
  // TODO gérer les erreurs

  if (userIsLoading) return null;

  return (
    <>
      <Button onClick={() => setShowOpenProjectModal(true)}>
        Open a project
      </Button>
      <Modal
        show={showOpenProjectModal}
        onClose={() => setShowOpenProjectModal(false)}
      >
        <Modal.Header>Choose an existing project</Modal.Header>
        <Modal.Body>
          <ListGroup>
            {loading ? (
              <Spinner />
            ) : data.getProjectsByUserId.lenght === 0 ? (
              <p>You don&apos;t have a project yet.</p>
            ) : (
              data.getProjectsByUserId.map(
                (item: { id: string; name: string }) => (
                  <ListGroup.Item
                    key={item.id}
                    onClick={() => navigate(`/editor/${item.id}`)}
                  >
                    {item.name}
                  </ListGroup.Item>
                ),
              )
            )}
          </ListGroup>
        </Modal.Body>
      </Modal>
    </>
  );
}
