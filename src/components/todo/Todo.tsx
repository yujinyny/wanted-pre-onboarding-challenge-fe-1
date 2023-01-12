import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { deleteTodo, getTodoById, updateTodo } from "../../api/todo";
import { loginState } from "../../atom/auth";
import { detailTodoState, todosState } from "../../atom/todo";
import { TodoType } from "../../types/todo";
import { TodoInput } from "./TodoList";

const Todo = ({ todo }: { todo: TodoType }) => {
  const navigate = useNavigate();

  const { id, title, content } = todo;

  const setLogin = useSetRecoilState(loginState);
  const [todos, setTodos] = useRecoilState(todosState);
  const setTodo = useSetRecoilState(detailTodoState);

  const [isEdit, setIsEdit] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(title);
  const [updateContent, setUpdateContent] = useState(content);
  const [currentTodoId, setCurrentTodoId] = useState("");

  const data = { title: updateTitle, content: updateContent };

  const onClickTodo = (id: string) => {
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

  const onUpdate = (id: string) => {
    updateTodo(id, data)
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
        setIsEdit(false);
      })
      .catch((err) => {
        alert(err.response.data.details);
      });
  };

  const onDelete = (id: string) => {
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
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
            />
          </p>
          <p>
            <span>내용</span>
            <TodoInput
              value={updateContent}
              onChange={(e) => setUpdateContent(e.target.value)}
            />
          </p>
        </TodoEditContent>
      ) : (
        <TodoDefaultContent
          onClick={() => {
            onClickTodo(id);
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
            <TodoButton
              onClick={() => {
                onUpdate(id);
              }}
            >
              저장
            </TodoButton>
            <TodoButton
              onClick={() => {
                setIsEdit(false);
              }}
            >
              취소
            </TodoButton>
          </div>
        ) : (
          <TodoButton
            onClick={() => {
              setIsEdit(true);
            }}
          >
            수정
          </TodoButton>
        )}
        <TodoButton
          onClick={() => {
            onDelete(id);
          }}
        >
          삭제
        </TodoButton>
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

const TodoButton = styled.button``;
