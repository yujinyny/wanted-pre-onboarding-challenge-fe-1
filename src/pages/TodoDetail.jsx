import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Wrapper from "../components/common/Wrapper";
import { Title } from "./Auth";
import { useDispatch } from "react-redux";
import { logout } from "../redux/user/action";
import TodoDetailCompo from "../components/todo/TodoDetail";

const TodoDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const { pathname } = useLocation();

  const [todo, setTodo] = useState();

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
          dispatch(logout());
          alert("유효하지 않는 토큰입니다");
          navigate("/auth/login");
        } else {
          alert(err.response.data.details);
        }
      });
  }, [id, dispatch, navigate]);

  return (
    <Wrapper>
      <Title>{pathname}</Title>
      {todo && <TodoDetailCompo todo={todo} />}
    </Wrapper>
  );
};

export default TodoDetail;
