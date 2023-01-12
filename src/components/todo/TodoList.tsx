import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TodoDetail from "./TodoDetail";
import Todo from "./Todo";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "../../atom/auth";
import { detailTodoState, todosState } from "../../atom/todo";
import { createTodo, getTodos } from "../../api/todo";

const TodoList = () => {
  const navigate = useNavigate();

  const setLogin = useSetRecoilState(loginState);
  const [todos, setTodos] = useRecoilState(todosState);
  const todo = useRecoilValue(detailTodoState);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    getTodos()
      .then((res) => {
        setTodos(res.data.data);
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
  }, [navigate, setLogin, setTodos]);

  const onCreate = () => {
    createTodo(title, content)
      .then((res) => {
        setTodos([...todos, res.data.data]);
        setTitle("");
        setContent("");
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
  };

  return (
    <Block>
      <div>
        <Todos>
          {todos.length ? (
            todos.map((todo) => <Todo key={todo.id} todo={todo} />)
          ) : (
            <div>투두 리스트가 없습니다</div>
          )}
        </Todos>
        <div>
          <TodoInput
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TodoInput
            type="text"
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button onClick={onCreate}>추가</Button>
        </div>
      </div>
      {todo ? <TodoDetail /> : <div>자세히 보고 싶은 투두를 선택해주세요</div>}
    </Block>
  );
};

export default TodoList;

const Block = styled.div`
  display: flex;

  > div {
    padding: 10px 30px;
  }
  > div:first-child {
    border-right: 2px solid white;
  }
`;

const Todos = styled.ul`
  height: 300px;
  margin-bottom: 10px;
  padding-right: 10px;
  overflow-y: scroll;
`;

export const TodoInput = styled.input`
  padding: 7px 10px;
  border: 1px solid gray;
  :focus {
    background-color: lightgray;
  }
`;
const Button = styled.button`
  margin-left: 10px;
  cursor: pointer;
`;
