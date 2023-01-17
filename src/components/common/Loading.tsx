import React from "react";
import styled from "styled-components";

const Loading = () => {
  return <Block>로딩 중 ...</Block>;
};

export default Loading;

const Block = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff84;
`;
