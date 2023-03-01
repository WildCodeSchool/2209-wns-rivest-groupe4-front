import { gql, useQuery } from "@apollo/client";
import { Button, ListGroup, Modal, Spinner } from "flowbite-react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const GET_PROJECTS = gql`
  query GetProjectsByUserId($userId: String!) {
    getProjectsByUserId(userId: $userId) {
      name
      id
    }
  }
`;

export default function OpenProjectModal() {
  const { user } = useContext(UserContext);
  const [showOpenProjectModal, setShowOpenProjectModal] = useState(false);

  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_PROJECTS, {
    variables: { userId: user?.id },
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
