import { Button } from "flowbite-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import choose1 from "../../../public/assets/choose1.png";
import choose2 from "../../../public/assets/choose2.png";

export default function ChooseContainer() {
  const navigate = useNavigate();
  return (
    <div className="mt-6">
      <h1 className="text-center text-3xl font-aldrich">Make a choice</h1>
      <div className="grid grid-cols-2 gap-20 m-6">
        <div className="rounded text-center bg-[#283544]">
          <div className="m-10">
            <img
              className="w-full object-cover"
              src={choose2}
              alt="Open a project"
            />
          </div>
          <div className="grid place-items-center mb-6">
            <p className="m-6">
              <b className="underline">Create a new project :</b> try something,
              collaborate with your collegues, post code from community, and
              more...
            </p>
            <Button onClick={() => navigate("/editor?open=existing")}>
              Open a project
            </Button>
          </div>
        </div>
        <div className="rounded text-center bg-[#283544]">
          <div className="m-10">
            <img
              className="w-full object-cover"
              src={choose1}
              alt="Create a project"
            />
          </div>
          <div className="grid place-items-center mb-6">
            <p className="m-6">
              <b className="underline">Open a saved project :</b> pick up where
              you previously left your project and continue coding !
            </p>
            <Button onClick={() => navigate("/editor?open=new")}>
              Create a project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
