import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Wrapper from "../components/common/Wrapper";
import styled from "styled-components";
import Label from "../components/common/Label";
import ErrorMessage from "../components/common/ErrorMessage";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import { useSetRecoilState } from "recoil";
import { loginState } from "../atom";

const SignUp = () => {
  const setLogin = useSetRecoilState(loginState);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { type } = useParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailSuccess, setEmailSuccess] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [emailMessage, setEmailMessage] = useState(false);
  const [pwMessage, setPwMessage] = useState(false);

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

  const onSubmit = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/users/${
          type === "signUp" ? "create" : "login"
        }`,
        {
          email,
          password,
        }
      )
      .then((res) => {
        if (type === "signUp") {
          navigate("/auth/login");
        } else {
          localStorage.setItem("token", res.data.token);
          setLogin(true);
          navigate("/");
        }
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
