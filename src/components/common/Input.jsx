import styled from "styled-components";

const Input = (props) => {
  return <InputBlock {...props} />;
};

export default Input;

const InputBlock = styled.input`
  padding: 7px 10px;
  border-radius: 5px;
  :focus {
    background-color: lightgray;
  }
`;
