import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Wrapper from "../components/Wrapper";
import { AuthH1, InputBox } from "./SignUp";
import Label from "../components/Label";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/login`, {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        alert(res.data.message);
        navigate("/");
      })
      .catch((err) => {
        alert(err.response.data.details);
      });
  };

  return (
    <Wrapper>
      <AuthH1>{pathname}</AuthH1>
      <InputBox>
        <div>
          <Label htmlFor="email">이메일</Label>
          <Input
            type="email"
            name="signup"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
      </InputBox>
      <InputBox>
        <div>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            name="signup"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
      </InputBox>
      <Button onClick={onSubmit}>로그인</Button>
    </Wrapper>
  );
};

export default Login;
