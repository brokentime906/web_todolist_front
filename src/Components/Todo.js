import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
} from "react-icons/md";
const TodoBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8f9fa;
  width: 350px;
  margin: 10px 20px 20px 10px;
  min-height: 50px;
`;
const Contents = styled.div`
  color: black;
  flex: 1;
  text-decoration: ${(props) => (props.done ? "line-through" : "none")};
`;
const ToggleDone = gql`
  mutation toggleDone($id: String!) {
    toggleDone(id: $id)
  }
`;
const deleteTodo = gql`
  mutation deleteTodo($id: String!) {
    deleteTodo(id: $id)
  }
`;
const Todo = ({ contents, id, done, onToggle, onRemove }) => {
  //   console.log(id);
  const [toggleDoneMutation] = useMutation(ToggleDone, { variables: { id } });
  const [deleteTodoMutation] = useMutation(deleteTodo, { variables: { id } });
  const onClickToggle = async (e) => {
    console.log("toggl 실행은 되냐");
    e.preventDefault();
    onToggle(id);
    const {
      data: { toggleDone },
    } = await toggleDoneMutation();
    console.log("toggle 결과 ", toggleDone);
    //실패한 경우 toggle한거 원래대로 돌려놓아야함
    if (!toggleDone) {
      onToggle(id);
    }
  };
  ////////////////////////////////
  const onClickDelete = async (e) => {
    e.preventDefault();
    const {
      data: { deleteTodo: result },
    } = await deleteTodoMutation();
    console.log(result);
    if (result) {
      onRemove(id); //삭제는 toggle이랑 다르게 다시 복구시키는게 귀찮으니까 얘는 성공했을대만 부르자
    }
  };
  return (
    <TodoBlock>
      <button onClick={onClickToggle}>
        {done ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
      </button>
      <Contents done={done}>{contents}</Contents>
      <button onClick={onClickDelete}>
        <MdRemoveCircleOutline />
      </button>
    </TodoBlock>
  );
};
export default Todo;
