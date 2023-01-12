import React from "react";
import { ReactNode } from "react";
import styled from "styled-components";

interface ButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: ReactNode;
}

const Button = ({ onClick, disabled, children }: ButtonProps) => {
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
