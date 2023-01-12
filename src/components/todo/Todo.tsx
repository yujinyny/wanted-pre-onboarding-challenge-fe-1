import React from "react";
import { useState, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { deleteTodo, getTodoById, updateTodo } from "../../api/todo";
import { loginState } from "../../atom/auth";
import { detailTodoState, todosState } from "../../atom/todo";
import { TodoType } from "../../types/todo";
import { TodoInput } from "./Todos";

const Todo = ({ todo }: { todo: TodoType }) => {
  const navigate = useNavigate();

  const { id, title, content } = todo;

  const setLogin = useSetRecoilState(loginState);
  const [todos, setTodos] = useRecoilState(todosState);
  const setTodo = useSetRecoilState(detailTodoState);

  const [isEdit, setEdit] = useState(false);
  const [updatedTitle, setUpdateTitle] = useState(title);
  const [updatedContent, setUpdateContent] = useState(content);
  const [currentTodoId, setCurrentTodoId] = useState("");

  const inputData = { title: updatedTitle, content: updatedContent };

  const handleClickTodo = (id: string) => {
    getTodoById(id)
      .then((res) => {
        setTodo(res.data);
        setCurrentTodoId(id);
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

  const handleUpdateTodo = (id: string) => {
    updateTodo(id, inputData)
      .then((res) => {
        setTodos([
          ...todos.map((todo) => {
            if (todo.id === res.data.id) {
              return res.data;
            } else {
              return todo;
            }
          }),
        ]);
        if (id === currentTodoId) setTodo(res.data);
        setUpdateTitle("");
        setUpdateContent("");
        setEdit(false);
      })
      .catch((err) => {
        alert(err.response.data.details);
      });
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id)
      .then((res) => {
        setTodos([...todos.filter((todo) => todo.id !== id)]);
        if (id === currentTodoId) setTodo(res.data);
      })
      .catch((err) => {
        alert(err.response.data.details);
      });
  };

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
            handleClickTodo(id);
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
                handleUpdateTodo(id);
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
            handleDeleteTodo(id);
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
