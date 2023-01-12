import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const auth = (type: string, email: string, password: string) => {
  const res = axios.post(
    `${API_URL}/users/${type === "signUp" ? "create" : "login"}`,
    {
      email,
      password,
    }
  );

  return res;
};
