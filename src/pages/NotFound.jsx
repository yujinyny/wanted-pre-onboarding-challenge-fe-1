import styled from "styled-components";
import Wrapper from "../components/Wrapper";

const NotFound = () => {
  return (
    <Wrapper>
      <Title>존재하지 않는 페이지입니다.</Title>
    </Wrapper>
  );
};

export default NotFound;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;
