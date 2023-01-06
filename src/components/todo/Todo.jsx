import styled from "styled-components";

const Todo = ({ todo, setCurrentTodoId }) => {
  return (
    <TodoBlock
      onClick={() => {
        setCurrentTodoId(todo.id);
      }}
    >
      <p>
        <span>제목</span> {todo.title}
      </p>
      <p>
        <span>내용</span> {todo.content}
      </p>
    </TodoBlock>
  );
};

export default Todo;

const TodoBlock = styled.li`
  margin-bottom: 30px;
  cursor: pointer;
  :hover {
    color: lightgray;
  }
  p:first-child {
    margin-bottom: 10px;
  }
  span {
    font-weight: 600;
  }
`;
