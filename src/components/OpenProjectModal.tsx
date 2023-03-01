import { gql, useQuery } from "@apollo/client";
import { Button, ListGroup, Modal, Spinner } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GET_PROJECTS = gql`
  query GetProjectsByUserId($userId: String!) {
    getProjectsByUserId(userId: $userId) {
      name
      id
    }
  }
`;

type Props = {
  userId: string | null | undefined;
  // TODO update with user context
};

export default function OpenProjectModal({ userId }: Props) {
  const [showOpenProjectModal, setShowOpenProjectModal] = useState(false);

  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_PROJECTS, {
    variables: { userId },
  });

  // TODO gèrer les erreurs

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
