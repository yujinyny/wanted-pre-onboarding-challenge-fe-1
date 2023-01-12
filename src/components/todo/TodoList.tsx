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

  const data = { title, content };

  useEffect(() => {
    getTodos()
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        alert(err.response.data.details);
      });
  }, [navigate, setLogin, setTodos]);

  const onCreate = () => {
    createTodo(data)
      .then((res) => {
        setTodos([...todos, res.data]);
        setTitle("");
        setContent("");
      })
      .catch((err) => {
        alert(err.response.data.details);
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
`;
