import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../redux/auth/action";
import { TodoInput } from "./TodoList";

const Todo = ({
  todo,
  todos,
  currentTodoId,
  setTodo,
  setTodos,
  setCurrentTodoId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(todo.title);
  const [updateContent, setUpdateContent] = useState(todo.content);

  const onUpdate = (id) => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/todos/${id}`,
        {
          title: updateTitle,
          content: updateContent,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setTodos([
          ...todos.map((todo) => {
            if (todo.id === res.data.data.id) {
              return res.data.data;
            } else {
              return todo;
            }
          }),
        ]);
        if (id === currentTodoId) setTodo(res.data.data);
        setUpdateTitle("");
        setUpdateContent("");
        setIsEdit(false);
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
  };

  const onDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/todos/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTodos([...todos.filter((todo) => todo.id !== id)]);
        if (id === currentTodoId) setTodo(res.data.data);
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
            setCurrentTodoId(todo.id);
          }}
        >
          <p>
            <span>제목</span>
            {todo.title}
          </p>
          <p>
            <span>내용</span>
            {todo.content}
          </p>
        </TodoDefaultContent>
      )}
      <TodoButtons>
        {isEdit ? (
          <div>
            <button
              onClick={() => {
                onUpdate(todo.id);
              }}
            >
              저장
            </button>
            <button
              onClick={() => {
                setIsEdit(false);
              }}
            >
              취소
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setIsEdit(true);
            }}
          >
            수정
          </button>
        )}
        <button
          onClick={() => {
            onDelete(todo.id);
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
  button {
    cursor: pointer;
  }
`;
