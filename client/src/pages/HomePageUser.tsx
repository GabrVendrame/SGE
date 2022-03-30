import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function HomePageUser() {
  const navigate = useNavigate();
  const tk = localStorage.getItem("token");
  return (
    <div>
      <h1>{tk}</h1>
    </div>
  );
}

export default HomePageUser;
