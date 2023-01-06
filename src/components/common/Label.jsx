import styled from "styled-components";

const Label = ({ htmlFor, children }) => {
  return <LabelBlock htmlFor={htmlFor}>{children}</LabelBlock>;
};

export default Label;

const LabelBlock = styled.label`
  display: inline-block;
  width: 80px;
`;
