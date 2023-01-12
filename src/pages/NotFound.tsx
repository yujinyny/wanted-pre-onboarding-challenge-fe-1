import React from "react";
import styled from "styled-components";
import Wrapper from "../components/common/Wrapper";

const NotFound = () => {
  return (
    <Wrapper>
      <Title>존재하지 않는 페이지입니다.</Title>
    </Wrapper>
  );
};

export default NotFound;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;
