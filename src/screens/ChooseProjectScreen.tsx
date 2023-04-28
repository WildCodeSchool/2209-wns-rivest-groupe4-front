import React from "react";
import { useNavigate } from "react-router-dom";
import ChooseContainer from "../container/ChooseContainer/ChooseContainer";
import useLoggedUser from "../hooks/useLoggedUser";

export default function ChooseProjectScreen() {
  const { user } = useLoggedUser();
  const navigate = useNavigate();
  if (user.id === undefined) {
    return navigate("/login");
  }
  return (
    <div>
      <ChooseContainer />
    </div>
  );
}
