import styled from "styled-components";
import Wrapper from "../components/Wrapper";

const NotFound = () => {
  return (
    <Wrapper>
      <H1>존재하지 않는 페이지입니다.</H1>
    </Wrapper>
  );
};

export default NotFound;

const H1 = styled.div`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;
