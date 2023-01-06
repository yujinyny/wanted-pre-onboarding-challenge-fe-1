import styled from "styled-components";

const Title = ({ children }) => {
  return <H1Block>{children}</H1Block>;
};

export default Title;

const H1Block = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 30px;
  text-align: center;
`;
