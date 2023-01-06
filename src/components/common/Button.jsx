import styled from "styled-components";

const Button = ({ onClick, disabled, children }) => {
  return (
    <ButtonBlock onClick={onClick} disabled={disabled}>
      {children}
    </ButtonBlock>
  );
};

export default Button;

const ButtonBlock = styled.button`
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
