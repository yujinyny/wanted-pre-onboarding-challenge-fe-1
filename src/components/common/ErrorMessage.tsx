import styled from "styled-components";

const ErrorMessage = ({ text }: { text: string }) => {
  return <Block>{text}</Block>;
};

export default ErrorMessage;

const Block = styled.div`
  margin-top: 15px;
  text-align: center;
  color: #fa5252;
`;
