import { Link } from "react-router-dom";
import styled from "styled-components";

const TodoDetail = ({ todo }) => {
  return (
    <Block>
      <Link to={`/todo/${todo.id}`}>
        <p>
          <span>제목</span> {todo.title}
        </p>
        <p>
          <span>내용</span> {todo.content}
        </p>
        <p>
          <span>아이디</span> {todo.id}
        </p>
        <p>
          <span>생성 일자</span> {new Date(todo.createdAt).toLocaleString()}
        </p>
        <p>
          <span>수정 일자</span> {new Date(todo.updatedAt).toLocaleString()}
        </p>
      </Link>
    </Block>
  );
};

export default TodoDetail;

const Block = styled.div`
  p:not(:last-of-type) {
    margin-bottom: 20px;
  }
  span {
    font-weight: 600;
  }
  :hover {
    color: lightgray;
  }
`;
