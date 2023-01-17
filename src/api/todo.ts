import instance from "./root";

interface TodoCUDataType {
  title: string;
  content: string;
}

export const getTodos = async () => {
  const res = await instance.get(`/todos`);
  return res.data;
};

export const getTodoById = async (id: string) => {
  const res = await instance.get(`/todos/${id}`);

  return res.data;
};

export const createTodo = async (data: TodoCUDataType) => {
  const res = await instance.post(`/todos`, data);
  return res.data;
};

export const updateTodo = async (id: string, data: TodoCUDataType) => {
  const res = await instance.put(`/todos/${id}`, data);

  return res.data;
};

export const deleteTodo = async (id: string) => {
  const res = await instance.delete(`/todos/${id}`);

  return res.data;
};
