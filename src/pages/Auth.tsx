import { useState, useEffect, SetStateAction } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Wrapper from "../components/common/Wrapper";
import styled from "styled-components";
import Label from "../components/common/Label";
import ErrorMessage from "../components/common/ErrorMessage";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useSetRecoilState } from "recoil";
import { loginState } from "../atom/auth";
import { login, signUp } from "../api/auth";
import Title from "../components/common/Title";
import instance from "../api/root";

const SignUp = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { type } = useParams();

  const setLogin = useSetRecoilState(loginState);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSuccessEmail, setSuccessEmail] = useState(false);
  const [isSuccessPw, setSuccessPw] = useState(false);
  const [isErrorMessageEmail, setErrorMessageEmail] = useState(false);
  const [isErrorMessagePw, setErrorMessagePw] = useState(false);

  const inputData = { email, password };

  useEffect(() => {
    if (type === "login" && localStorage.getItem("token")) {
      alert("이미 로그인 중입니다");
      navigate("/");
    }
  }, [navigate, type]);

  // 유효성 검사
  useEffect(() => {
    if (!email) {
      setErrorMessageEmail(false);
      setSuccessEmail(false);
    } else {
      if (email.includes("@") && email.includes(".")) {
        setErrorMessageEmail(false);
        setSuccessEmail(true);
      } else {
        setErrorMessageEmail(true);
        setSuccessEmail(false);
      }
    }
    if (!password) {
      setErrorMessagePw(false);
      setSuccessPw(false);
    } else {
      if (password.length >= 8) {
        setErrorMessagePw(false);
        setSuccessPw(true);
      } else {
        setErrorMessagePw(true);
        setSuccessPw(false);
      }
    }
  }, [email, password]);

  const handleSignUp = () => {
    signUp(inputData)
      .then((res) => {
        alert(res.message);
        navigate("/auth/login");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        alert(err.response.data.details);
      });
  };

  const handleLogin = () => {
    login(inputData)
      .then((res) => {
        alert(res.message);
        localStorage.setItem("token", res.token);
        instance.defaults.headers.Authorization = localStorage.getItem("token");
        setLogin(true);
        navigate("/");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        alert(err.response.data.details);
      });
  };

  return (
    <Wrapper>
      <Title>{pathname}</Title>
      <InputBox>
        <div>
          <Label htmlFor="email">이메일</Label>
          <Input
            type="email"
            name="signup"
            id="email"
            value={email}
            onChange={(e: { target: { value: SetStateAction<string> } }) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        {isErrorMessageEmail && <ErrorMessage text="최소 @, . 포함" />}
      </InputBox>
      <InputBox>
        <div>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            type="password"
            name="signup"
            id="password"
            value={password}
            onChange={(e: { target: { value: SetStateAction<string> } }) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {isErrorMessagePw && <ErrorMessage text="8자 이상 입력" />}
      </InputBox>
      <Button
        onClick={() => (type === "signUp" ? handleSignUp() : handleLogin())}
        disabled={!(isSuccessEmail && isSuccessPw)}
      >
        {type === "signUp" ? "회원가입" : "로그인"}
      </Button>
    </Wrapper>
  );
};

export default SignUp;

export const InputBox = styled.div`
  margin-bottom: 30px;

  > div:first-child {
    display: flex;
    align-items: center;
  }
`;
