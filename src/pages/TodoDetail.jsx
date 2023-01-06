import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Wrapper from "../components/common/Wrapper";
import { Title } from "./Auth";
import TodoDetailCompo from "../components/todo/TodoDetail";
import { loginState, todoState } from "../atom";
import { useRecoilState, useSetRecoilState } from "recoil";

const TodoDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();

  const setLogin = useSetRecoilState(loginState);
  const [todo, setTodo] = useRecoilState(todoState);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/todos/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTodo(res.data.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.removeItem("token");
          setLogin(false);
          alert("유효하지 않는 토큰입니다");
          navigate("/auth/login");
        } else {
          alert(err.response.data.details);
        }
      });
  }, [id, navigate, setLogin, setTodo]);

  return (
    <Wrapper>
      <Title>{pathname}</Title>
      {todo && <TodoDetailCompo />}
    </Wrapper>
  );
};

export default TodoDetail;
