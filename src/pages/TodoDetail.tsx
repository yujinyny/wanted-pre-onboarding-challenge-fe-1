import { useLocation, useParams } from "react-router-dom";
import Wrapper from "../components/common/Wrapper";
import TodoDetailCompo from "../components/todo/TodoDetail";
import { useRecoilState } from "recoil";
import { detailTodoState } from "../atom/todo";
import { getTodoById } from "../api/todo";
import Title from "../components/common/Title";
import React from "react";
import { useQuery } from "react-query";

const TodoDetail = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  const [todo, setTodo] = useRecoilState(detailTodoState);

  const { data: getTodoData } = useQuery(
    "getTodo",
    () => getTodoById(id as string),
    {
      onSuccess: (data) => {
        setTodo(data.data);
      },
    }
  );

  return (
    <Wrapper>
      <Title>{pathname}</Title>
      {todo && <TodoDetailCompo />}
    </Wrapper>
  );
};

export default TodoDetail;
