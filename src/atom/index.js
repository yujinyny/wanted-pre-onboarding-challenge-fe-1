import { atom } from "recoil";

export const loginState = atom({
  key: "loginState",
  default: false,
});

export const todosState = atom({
  key: "todosState",
  default: [],
});

export const todoState = atom({
  key: "todoState",
  default: null,
});
