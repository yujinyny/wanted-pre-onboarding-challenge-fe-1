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
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { type } = useParams();

  const setLogin = useSetRecoilState(loginState);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailSuccess, setEmailSuccess] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [emailMessage, setEmailMessage] = useState(false);
  const [pwMessage, setPwMessage] = useState(false);

  const data = { email, password };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      alert("이미 로그인 중입니다");
      navigate("/");
    }
  }, [navigate]);

  // 유효성 검사
  useEffect(() => {
    if (!email) {
      setEmailMessage(false);
      setEmailSuccess(false);
    } else {
      if (email.includes("@") && email.includes(".")) {
        setEmailMessage(false);
        setEmailSuccess(true);
      } else {
        setEmailMessage(true);
        setEmailSuccess(false);
      }
    }

    if (!password) {
      setPwMessage(false);
      setPwSuccess(false);
    } else {
      if (password.length >= 8) {
        setPwMessage(false);
        setPwSuccess(true);
      } else {
        setPwMessage(true);
        setPwSuccess(false);
      }
    }
  }, [email, password]);

  const onSignUp = () => {
    signUp(data)
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

  const onLogin = () => {
    login(data)
      .then((res) => {
        alert(res.message);
        localStorage.setItem("token", res.token);
        axios.defaults.headers.Authorization = localStorage.getItem("token");
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
        {emailMessage && <ErrorMessage text="최소 @, . 포함" />}
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
        {pwMessage && <ErrorMessage text="8자 이상 입력" />}
      </InputBox>
      <Button
        onClick={() => (type === "signUp" ? onSignUp() : onLogin())}
        disabled={!(emailSuccess && pwSuccess)}
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

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 60px;
  text-align: center;
`;
