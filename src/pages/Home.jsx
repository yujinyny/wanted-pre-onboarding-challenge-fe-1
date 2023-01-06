import { Link } from "react-router-dom";
import H1 from "../components/H1";
import Wrapper from "../components/Wrapper";
import Todos from "./Todos";
import styled from "styled-components";

const Home = () => {
  const onLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <Wrapper>
      <Box>
        <H1>Auth</H1>
        <Ul>
          <li>
            <button>
              <Link to="/auth/signUp">회원가입</Link>
            </button>
          </li>
          <li>
            <button>
              <Link to="/auth/login">로그인</Link>
            </button>
          </li>
          <li>
            <button onClick={onLogout}>로그아웃</button>
          </li>
        </Ul>
      </Box>
      <Box>
        <H1>Todos</H1>
        <Todos />
      </Box>
    </Wrapper>
  );
};

export default Home;

const Box = styled.div`
  margin-bottom: 60px;
`;

const Ul = styled.ul`
  display: flex;
  button {
    margin: 10px;
    cursor: pointer;
  }
  button:hover {
    color: lightgray;
  }
`;
