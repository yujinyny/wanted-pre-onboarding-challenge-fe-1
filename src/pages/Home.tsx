import { Link } from "react-router-dom";
import Wrapper from "../components/common/Wrapper";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { loginState } from "../atom/auth";
import Todos from "../components/todo/Todos";

const Home = () => {
  const [isLogin, setLogin] = useRecoilState(loginState);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogin(false);
  };

  return (
    <Wrapper>
      <Box>
        <Title>Auth</Title>
        {isLogin ? (
          <Ul>
            <li>
              <button onClick={handleLogout}>로그아웃</button>
            </li>
          </Ul>
        ) : (
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
          </Ul>
        )}
      </Box>
      <Box>
        <Title>Todos</Title>
        {isLogin ? <Todos /> : <span>로그인 후 조회 가능합니다</span>}
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
  }
  button:hover {
    color: lightgray;
  }
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 30px;
  text-align: center;
`;
