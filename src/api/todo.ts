import axios from "axios";

interface TodoCUDataType {
  title: string;
  content: string;
}

const API_URL = process.env.REACT_APP_API_URL;

export const getTodos = async () => {
  const res = await axios.get(`${API_URL}/todos`);

  return res.data;
};

export const getTodoById = async (id: string) => {
  const res = await axios.get(`${API_URL}/todos/${id}`);

  return res.data;
};

export const createTodo = async (data: TodoCUDataType) => {
  const res = await axios.post(`${API_URL}/todos`, data);
  return res.data;
};

export const updateTodo = async (id: string, data: TodoCUDataType) => {
  const res = await axios.put(`${API_URL}/todos/${id}`, data);

  return res.data;
};

export const deleteTodo = async (id: string) => {
  const res = await axios.delete(`${API_URL}/todos/${id}`);

  return res.data;
};
