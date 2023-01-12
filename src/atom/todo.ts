import { atom } from "recoil";
import { TodoType } from "../types/todo";

export const todosState = atom<TodoType[]>({
  key: "todosState",
  default: [],
});

export const detailTodoState = atom<TodoType | null>({
  key: "detailTodoState",
  default: null,
});
