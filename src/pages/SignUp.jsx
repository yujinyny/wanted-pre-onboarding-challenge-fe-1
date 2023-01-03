import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <button onClick={onSubmit}>회원가입</button>
    </>
  );
};

export default SignUp;
