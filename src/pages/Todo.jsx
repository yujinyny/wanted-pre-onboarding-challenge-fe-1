import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Todo = () => {
  const { id } = useParams();

  const [todo, setTodo] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/todos/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setTodo(res.data.data);
      })
      .catch((err) => console.log("실패", err));
  }, [id]);

  return (
    <>
      <span>제목: {todo && todo.title}</span>
      <span>내용: {todo && todo.content}</span>
    </>
  );
};

export default Todo;
