import { Link } from "react-router-dom";
import Title from "../components/Title";
import Wrapper from "../components/Wrapper";
import TodoList from "../components/TodoList";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/user/action";

const Home = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state);

  const onLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  return (
    <Wrapper>
      <Box>
        <Title>Auth</Title>
        {isLogin ? (
          <Ul>
            <li>
              <button onClick={onLogout}>로그아웃</button>
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
        {isLogin ? <TodoList /> : <span>로그인 후 조회 가능합니다</span>}
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
