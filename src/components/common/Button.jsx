import styled from "styled-components";

const Button = ({ onClick, disabled, children }) => {
  return (
    <Block onClick={onClick} disabled={disabled}>
      {children}
    </Block>
  );
};

export default Button;

const Block = styled.button`
  width: 262px;
  height: 40px;
  background-color: white;
  color: black;
  border-radius: 5px;
  cursor: pointer;
  :disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;
