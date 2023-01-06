import styled from "styled-components";

const Input = (props) => {
  return <Block {...props} />;
};

export default Input;

const Block = styled.input`
  padding: 7px 10px;
  border-radius: 5px;
  :focus {
    background-color: lightgray;
  }
`;
