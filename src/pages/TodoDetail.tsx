import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Wrapper from "../components/common/Wrapper";
import TodoDetailCompo from "../components/todo/TodoDetail";
import { loginState } from "../atom/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { detailTodoState } from "../atom/todo";
import { getTodoById } from "../api/todo";
import Title from "../components/common/Title";

const TodoDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();

  const setLogin = useSetRecoilState(loginState);
  const [todo, setTodo] = useRecoilState(detailTodoState);

  useEffect(() => {
    getTodoById(id as string)
      .then((res) => {
        setTodo(res.data);
      })
      .catch((err) => {
        alert(err.response.data.details);
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
