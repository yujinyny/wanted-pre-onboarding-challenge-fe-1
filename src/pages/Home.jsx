import { Link } from "react-router-dom";
import Todos from "./Todos";

const Home = () => {
  const onLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <>
      <h1>Auth</h1>
      <ul>
        <li>
          <Link to="/auth/signUp">회원가입</Link>
        </li>
        <li>
          <Link to="/auth/login">로그인</Link>
        </li>
        <li>
          <button onClick={onLogout}>로그아웃</button>
        </li>
      </ul>
      <h1>Todos</h1>
      <Todos />
    </>
  );
};

export default Home;
