import React from "react";
import { useState, SetStateAction } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { deleteTodo, getTodoById, updateTodo } from "../../api/todo";
import { detailTodoState, todosState } from "../../atom/todo";
import { TodoType } from "../../types/todo";
import { TodoInput } from "./Todos";
import { useQuery, useMutation } from "react-query";

const Todo = ({ todo }: { todo: TodoType }) => {
  const { id, title, content } = todo;

  const [todos, setTodos] = useRecoilState(todosState);
  const setTodo = useSetRecoilState(detailTodoState);

  const [isEdit, setEdit] = useState(false);
  const [updatedTitle, setUpdateTitle] = useState(title);
  const [updatedContent, setUpdateContent] = useState(content);
  const [currentTodoId, setCurrentTodoId] = useState("");

  const inputData = { title: updatedTitle, content: updatedContent };

  const { refetch: getTodoRefetch } = useQuery(
    "clickTodo",
    () => getTodoById(id),
    {
      onSuccess: (data) => {
        setTodo(data.data);
        setCurrentTodoId(id);
      },
      enabled: false,
    }
  );

  const { mutate: updateTodoMutate } = useMutation(
    () => updateTodo(id, inputData),
    {
      onSuccess: (data) => {
        setTodos([
          ...todos.map((todo) => {
            if (todo.id === data.data.id) {
              return data.data;
            } else {
              return todo;
            }
          }),
        ]);
        if (id === currentTodoId) setTodo(data.data);
        setUpdateTitle("");
        setUpdateContent("");
        setEdit(false);
      },
    }
  );

  const { mutate: deleteTodoMutate } = useMutation(() => deleteTodo(id), {
    onSuccess: (data) => {
      console.log("#1", data);
      setTodos([...todos.filter((todo) => todo.id !== id)]);
      if (id === currentTodoId) setTodo(data.data);
    },
  });

  return (
    <LiBlock>
      {isEdit ? (
        <TodoEditContent>
          <p>
            <span>제목</span>
            <TodoInput
              value={updatedTitle}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setUpdateTitle(e.target.value)
              }
            />
          </p>
          <p>
            <span>내용</span>
            <TodoInput
              value={updatedContent}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setUpdateContent(e.target.value)
              }
            />
          </p>
        </TodoEditContent>
      ) : (
        <TodoDefaultContent
          onClick={() => {
            getTodoRefetch();
          }}
        >
          <p>
            <span>제목</span>
            {title}
          </p>
          <p>
            <span>내용</span>
            {content}
          </p>
        </TodoDefaultContent>
      )}
      <TodoButtons>
        {isEdit ? (
          <div>
            <button
              onClick={() => {
                updateTodoMutate();
              }}
            >
              저장
            </button>
            <button
              onClick={() => {
                setEdit(false);
              }}
            >
              취소
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setEdit(true);
            }}
          >
            수정
          </button>
        )}
        <button
          onClick={() => {
            deleteTodoMutate();
          }}
        >
          삭제
        </button>
      </TodoButtons>
    </LiBlock>
  );
};

export default Todo;

const LiBlock = styled.li`
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
`;

const TodoEditContent = styled.div`
  p {
    display: flex;
    align-items: center;
  }
  p:first-child {
    margin-bottom: 10px;
  }
  span {
    margin-right: 10px;
    font-weight: 600;
  }
`;

const TodoDefaultContent = styled(TodoEditContent)`
  cursor: pointer;
  :hover {
    color: lightgray;
  }
`;

const TodoButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  > div {
    button:last-of-type {
      margin-left: 5px;
    }
  }
`;
