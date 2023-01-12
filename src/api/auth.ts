import axios from "axios";

interface AuthDataType {
  email: string;
  password: string;
}

const API_URL = process.env.REACT_APP_API_URL;

export const signUp = async (data: AuthDataType) => {
  const res = await axios.post(`${API_URL}/users/create`, data);

  return res.data;
};

export const login = async (data: AuthDataType) => {
  const res = await axios.post(`${API_URL}/users/login`, data);

  return res.data;
};
