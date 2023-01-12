import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getTodos = () => {
  const res = axios.get(`${API_URL}/todos`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

  return res;
};

export const getTodo = (id: string) => {
  const res = axios.get(`${API_URL}/todos/${id}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

  return res;
};

export const createTodo = (title: string, content: string) => {
  const res = axios.post(
    `${API_URL}/todos`,
    {
      title,
      content,
    },
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );

  return res;
};

export const updateTodo = (
  id: string,
  updateTitle: string,
  updateContent: string
) => {
  const res = axios.put(
    `${API_URL}/todos/${id}`,
    {
      title: updateTitle,
      content: updateContent,
    },
    {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }
  );

  return res;
};

export const deleteTodo = (id: string) => {
  const res = axios.delete(`${API_URL}/todos/${id}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

  return res;
};
