import { ReactNode } from "react";
import styled from "styled-components";

interface LabelProps {
  htmlFor: string;
  children: ReactNode;
}

const Label = ({ htmlFor, children }: LabelProps) => {
  return <Block htmlFor={htmlFor}>{children}</Block>;
};

export default Label;

const Block = styled.label`
  display: inline-block;
  width: 80px;
`;
