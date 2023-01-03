import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

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
      .catch((err) => console.log("실패", err));
  };

  return (
    <>
      <div>
        이메일
        <input
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      {emailMessage && <div>최소 @, . 포함</div>}
      <div>
        비밀번호
        <input
          type="text"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      {pwMessage && <div>8자 이상 입력</div>}
      <button onClick={onSubmit} disabled={!(emailSuccess && pwSuccess)}>
        회원가입
      </button>
    </>
  );
};

export default SignUp;
