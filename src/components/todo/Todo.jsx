import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginState, todosState, todoState } from "../../atom";
import { TodoInput } from "./TodoList";

const Todo = ({ todoEl }) => {
  const navigate = useNavigate();

  const setLogin = useSetRecoilState(loginState);
  const [todos, setTodos] = useRecoilState(todosState);
  const setTodo = useSetRecoilState(todoState);

  const [isEdit, setIsEdit] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(todoEl.title);
  const [updateContent, setUpdateContent] = useState(todoEl.content);
  const [currentTodoId, setCurrentTodoId] = useState("");

  useEffect(() => {
    if (currentTodoId !== "") {
      axios
        .get(`${process.env.REACT_APP_API_URL}/todos/${currentTodoId}`, {
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
            setLogin(false);
            alert("유효하지 않는 토큰입니다");
            navigate("/auth/login");
          } else {
            alert(err.response.data.details);
          }
        });
    }
  }, [currentTodoId, navigate, setLogin, setTodo]);

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
          setLogin(false);
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
          setLogin(false);
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
            setCurrentTodoId(todoEl.id);
          }}
        >
          <p>
            <span>제목</span>
            {todoEl.title}
          </p>
          <p>
            <span>내용</span>
            {todoEl.content}
          </p>
        </TodoDefaultContent>
      )}
      <TodoButtons>
        {isEdit ? (
          <div>
            <button
              onClick={() => {
                onUpdate(todoEl.id);
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
            onDelete(todoEl.id);
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
