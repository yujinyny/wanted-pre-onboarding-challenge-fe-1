import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Wrapper from "../components/Wrapper";
import styled from "styled-components";
import Label from "../components/Label";
import ErrorMessage from "../components/ErrorMessage";
import Input from "../components/Input";
import Button from "../components/Button";

const SignUp = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailSuccess, setEmailSuccess] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [emailMessage, setEmailMessage] = useState(false);
  const [pwMessage, setPwMessage] = useState(false);

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

  const onSubmit = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/create`, {
        email,
        password,
      })
      .then((res) => {
        alert(res.data.message);
        navigate("/auth/login");
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {pwMessage && <ErrorMessage text="8자 이상 입력" />}
      </InputBox>
      <Button onClick={onSubmit} disabled={!(emailSuccess && pwSuccess)}>
        회원가입
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

export const AuthH1 = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 60px;
  text-align: center;
`;
