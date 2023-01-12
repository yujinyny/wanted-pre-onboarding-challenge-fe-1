import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { detailTodoState } from "../../atom/todo";
import { TodoType } from "../../types/todo";

const TodoDetail = () => {
  const { id, title, content, createdAt, updatedAt } = useRecoilValue(
    detailTodoState
  ) as TodoType;

  return (
    <Block>
      <Link to={`/todo/${id}`}>
        <p>
          <span>제목</span> {title}
        </p>
        <p>
          <span>내용</span> {content}
        </p>
        <p>
          <span>아이디</span> {id}
        </p>
        <p>
          <span>생성 일자</span> {new Date(createdAt).toLocaleString()}
        </p>
        <p>
          <span>수정 일자</span> {new Date(updatedAt).toLocaleString()}
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
