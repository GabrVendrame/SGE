import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import Axios from "axios";
export interface user {
  name: string;
  email: string;
  password: string;
  cpfCnpj: string;
  cell: string;
  userType: string;
}
function HomePageUser() {
  const [user, setUser] = useState<user>();
  const [tk, setTk] = useState<any>();
  const navigate = useNavigate();

  console.log(tk);
  //req para pegar o usuario com cpfCnpj === tk

  // const handleLoadUser = useCallback((tk) => {
  //   Axios.get("localhost:3001/api/users/find", tk)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const handleLoadUser = () => {
    // setTk("3232");
    // console.log("aqui", tk);
    // let fon: any = "3232";
    // console.log(fon);

    Axios.get(`http://localhost:3001/api/users/find/${tk}`)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    setTk(localStorage.getItem("token"));
  }, []);

  return (
    <div>
      <h1>
        <button onClick={() => handleLoadUser()}>olaaaaaaaaaaaaaaaaaa</button>
      </h1>
    </div>
  );
}

export default HomePageUser;
