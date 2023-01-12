import axios from "axios";

const instance = axios.create({ baseURL: process.env.REACT_APP_API_URL });

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 401) {
      localStorage.removeItem("token");
      alert("유효하지 않는 토큰입니다");
      window.location.href = "/auth/login";
    }
    return Promise.reject(err);
  }
);

export default instance;
