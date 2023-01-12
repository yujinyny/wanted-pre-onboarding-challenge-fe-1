import instance from "./root";

interface AuthDataType {
  email: string;
  password: string;
}

export const signUp = async (data: AuthDataType) => {
  const res = await instance.post(`/users/create`, data);

  return res.data;
};

export const login = async (data: AuthDataType) => {
  const res = await instance.post(`/users/login`, data);

  return res.data;
};
