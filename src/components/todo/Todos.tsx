import { useState, SetStateAction } from "react";
import styled from "styled-components";
import TodoDetail from "./TodoDetail";
import Todo from "./Todo";
import { useRecoilState, useRecoilValue } from "recoil";
import { detailTodoState, todosState } from "../../atom/todo";
import { createTodo, getTodos } from "../../api/todo";
import Input from "../common/Input";
import React from "react";
import { useQuery, useMutation } from "react-query";

const Todos = () => {
  const [todos, setTodos] = useRecoilState(todosState);
  const todo = useRecoilValue(detailTodoState);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const inputData = { title, content };

  const { data: getTodoData } = useQuery("getTodo", getTodos, {
    onSuccess: (data) => {
      setTodos(data.data);
    },
  });

  const { mutate: createTodoMutate } = useMutation(
    () => createTodo(inputData),
    {
      onSuccess: (data) => {
        setTodos([...todos, data.data]);
        setTitle("");
        setContent("");
      },
    }
  );

  return (
    <Block>
      <div>
        <TodosBlock>
          {todos.length ? (
            todos.map((todo) => <Todo key={todo.id} todo={todo} />)
          ) : (
            <div>투두 리스트가 없습니다</div>
          )}
        </TodosBlock>
        <div>
          <TodoInput
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setTitle(e.target.value)
            }
          />
          <TodoInput
            type="text"
            placeholder="내용"
            value={content}
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setContent(e.target.value)
            }
          />
          <Button
            onClick={() => {
              createTodoMutate();
            }}
          >
            추가
          </Button>
        </div>
      </div>
      {todo ? <TodoDetail /> : <div>자세히 보고 싶은 투두를 선택해주세요</div>}
    </Block>
  );
};

export default Todos;

const Block = styled.div`
  display: flex;

  > div {
    padding: 10px 30px;
  }
  > div:first-child {
    border-right: 2px solid white;
  }
`;

const TodosBlock = styled.ul`
  height: 300px;
  margin-bottom: 10px;
  padding-right: 10px;
  overflow-y: scroll;
`;

export const TodoInput = styled(Input)`
  border: 1px solid gray;
  border-radius: 3px;
`;
const Button = styled.button`
  margin-left: 10px;
`;
