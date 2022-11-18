import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomeScreen() {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      navigate("/login");
    }
  });

  return <div>HomeScreen</div>;
}

export default HomeScreen;
