import styled from "styled-components";

const ErrorMessage = ({ text }) => {
  return <ErrorMessageBlock>{text}</ErrorMessageBlock>;
};

export default ErrorMessage;

const ErrorMessageBlock = styled.div`
  margin-top: 15px;
  text-align: center;
  color: #fa5252;
`;
