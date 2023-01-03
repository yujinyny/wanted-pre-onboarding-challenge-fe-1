import { useState, useEffect } from "react";
import axios from "axios";

const Todos = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    console.log("todos", todos);
  }, [todos]);

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
      .catch((err) => console.log("실패", err));
  }, []);

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
      .catch((err) => console.log("실패", err));
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
        setTitle("");
        setContent("");
      })
      .catch((err) => console.log("실패", err));
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
        setTitle("");
        setContent("");
      })
      .catch((err) => console.log("실패", err));
  };

  return (
    <>
      <ul>
        {todos.length &&
          todos.map((todo) => (
            <li key={todo.id}>
              <span>제목: {todo.title}</span>
              <span>내용: {todo.content}</span>
              <button onClick={() => onUpdate(todo.id)}>수정</button>
              <button onClick={() => onDelete(todo.id)}>삭제</button>
            </li>
          ))}
      </ul>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={onCreate}>추가</button>
    </>
  );
};

export default Todos;
