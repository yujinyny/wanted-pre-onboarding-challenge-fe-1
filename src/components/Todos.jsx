import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const Todos = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");

  const [currentTodoId, setCurrentTodoId] = useState("");
  const [todo, setTodo] = useState();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/todos`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTodos(res.data.data);
      })
      .catch((err) => {
        alert(err.response.data.details);
      });
  }, []);

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
          alert(err.response.data.details);
        });
    }
  }, [currentTodoId]);

  const onCreate = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/todos`,
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setTodos([...todos, res.data.data]);
        setTitle("");
        setContent("");
      })
      .catch((err) => {
        alert(err.response.data.details);
      });
  };

  const onUpdate = (id) => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/todos/${id}`,
        {
          title,
          content,
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
        setTodo(res.data.data);
        setUpdateTitle("");
        setUpdateContent("");
      })
      .catch((err) => {
        alert(err.response.data.details);
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
        setTodo(res.data.data);
      })
      .catch((err) => {
        alert(err.response.data.details);
      });
  };

  return (
    <Block>
      <div>
        <Ul>
          {todos &&
            todos.map((todo) => (
              <li key={todo.id} onClick={() => setCurrentTodoId(todo.id)}>
                <p>
                  <span>제목</span> {todo.title}
                </p>
                <p>
                  <span>내용</span> {todo.content}
                </p>
              </li>
            ))}
        </Ul>
        <InputBox>
          <Input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="text"
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button onClick={onCreate}>추가</Button>
        </InputBox>
      </div>
      {todo ? (
        <div>
          <Ul>
            <li>
              <Link to={`/todo/${currentTodoId}`}>
                <p>
                  <span>제목</span> {todo.title}
                </p>
                <p>
                  <span>내용</span> {todo.content}
                </p>
              </Link>
              <button
                onClick={() => onDelete(currentTodoId)}
                className="delete-btn"
              >
                삭제
              </button>
            </li>
          </Ul>
          <InputBox>
            <Input
              type="text"
              placeholder="제목"
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
            />
            <Input
              type="text"
              placeholder="내용"
              value={updateContent}
              onChange={(e) => setUpdateContent(e.target.value)}
            />
            <Button onClick={() => onUpdate(currentTodoId)}>수정</Button>
          </InputBox>
        </div>
      ) : (
        <div>자세히 보고 싶은 투두를 선택해주세요</div>
      )}
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

const Ul = styled.ul`
  li {
    margin-bottom: 30px;
    cursor: pointer;
  }
  li:hover {
    color: lightgray;
  }
  li p:first-child {
    margin-bottom: 10px;
  }
  li span {
    font-weight: 600;
  }
  .delete-btn {
    width: 100%;
    text-align: right;
    margin-top: 10px;
    cursor: pointer;
  }
`;

const InputBox = styled.div``;
const Input = styled.input`
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
