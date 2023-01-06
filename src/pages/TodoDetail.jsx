import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Wrapper from "../components/Wrapper";
import styled from "styled-components";
import { Title } from "./SignUp";

const TodoDetail = () => {
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
        alert(err.response.data.details);
      });
  }, [id]);

  return (
    todo && (
      <Wrapper>
        <Title>{pathname}</Title>
        <TodoDetailBlock>
          <p>
            <span>제목</span> {todo.title}
          </p>
          <p>
            <span>내용</span> {todo.content}
          </p>
          <p>
            <span>아이디</span> {todo.id}
          </p>
          <p>
            <span>생성 일자</span> {new Date(todo.createdAt).toLocaleString()}
          </p>
          <p>
            <span>수정 일자</span> {new Date(todo.updatedAt).toLocaleString()}
          </p>
        </TodoDetailBlock>
      </Wrapper>
    )
  );
};

export default TodoDetail;

const TodoDetailBlock = styled.div`
  p:not(:last-of-type) {
    margin-bottom: 20px;
  }
  span {
    font-weight: 600;
  }
`;
