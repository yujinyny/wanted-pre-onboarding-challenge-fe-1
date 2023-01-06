import styled from "styled-components";

const Wrapper = ({ children }) => {
  return <Block>{children}</Block>;
};

export default Wrapper;

const Block = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
