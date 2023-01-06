import styled from "styled-components";

const Label = ({ htmlFor, children }) => {
  return <Block htmlFor={htmlFor}>{children}</Block>;
};

export default Label;

const Block = styled.label`
  display: inline-block;
  width: 80px;
`;
