import { useEffect, useState } from "react";
import ChoiceActionCard from "../../components/ChoiceActionCard";
import CreateProjectModal from "../../components/CreateProjectModal";
import OpenProjectModal from "../../components/OpenProjectModal";

export default function ChooseContainer() {
  const [userId, setUserId] = useState<string | null>();

  useEffect(() => {
    if (localStorage.getItem("uuid")) {
      setUserId(localStorage.getItem("uuid"));
    }
  }, [userId]);

  return (
    <div className="mt-6">
      <h1 className="text-center text-3xl font-aldrich">Make a choice</h1>
      <div className="grid grid-cols-2 gap-20 m-6">
        <ChoiceActionCard
          imageSource="/assets/choose2.png"
          title="Open a saved project :"
          text="pick up where you previously left your project and continue coding !"
          button={<OpenProjectModal userId={userId} />}
        />

        <ChoiceActionCard
          imageSource="/assets/choose1.png"
          title="Create a new project :"
          text="try something, collaborate with your collegues, post code from community, and more..."
          button={<CreateProjectModal userId={userId} />}
        />
      </div>
    </div>
  );
}
