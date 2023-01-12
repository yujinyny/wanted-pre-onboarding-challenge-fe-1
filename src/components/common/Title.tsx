import { ReactNode } from "react";
import styled from "styled-components";

const Title = ({ children }: { children: ReactNode }) => {
  return <Block>{children}</Block>;
};

export default Title;

const Block = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 30px;
  text-align: center;
`;
