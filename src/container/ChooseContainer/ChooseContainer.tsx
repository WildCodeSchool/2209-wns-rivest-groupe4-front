import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChoiceActionCard from "../../components/ChoiceActionCard";
import CreateProjectModal from "../../components/CreateProjectModal";
import OpenProjectModal from "../../components/OpenProjectModal";
import { UserContext } from "../../contexts/UserContext";

export default function ChooseContainer() {
  document.title = "Codeless4 | Project";

  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/login");
  });

  return (
    <div className="mt-6">
      <h1 className="text-center text-3xl font-aldrich">Make a choice</h1>
      <div className="grid grid-cols-2 gap-20 m-6">
        <ChoiceActionCard
          imageSource="/assets/choose2.png"
          title="Open a saved project :"
          text="pick up where you previously left your project and continue coding !"
          button={<OpenProjectModal />}
        />

        <ChoiceActionCard
          imageSource="/assets/choose1.png"
          title="Create a new project :"
          text="try something, collaborate with your collegues, post code from community, and more..."
          button={<CreateProjectModal />}
        />
      </div>
    </div>
  );
}
