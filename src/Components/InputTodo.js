import React from "react";
import styled from "styled-components";
import useInput from "../Hooks/useInput";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";

const InputTodoBlock = styled.div`
  display: flex;
  justify-content: space-between;
  background: #495057;
  width: 350px;
  height: 40px;
`;
const Input = styled.input`
  flex: 1;
  color: white;
  background: none;
  outline: none;
  border: none;
`;
const TODO_INSERT_QUERY = gql`
  mutation createTodo($contents: String, $done: Boolean) {
    createTodo(contents: $contents, done: $done) {
      id
      contents
      done
    }
  }
`;
const InputTodo = ({ setTodos }) => {
  const newTodo = useInput("");
  const [createTodoMutation] = useMutation(TODO_INSERT_QUERY, {
    variables: { contents: newTodo.value, done: false },
  });
  const onClick = async (e) => {
    e.preventDefault();
    const result = await createTodoMutation();
    console.log("생성된 결과", result);
    setTodos((prev) => [result.data.createTodo, ...prev]);
    newTodo.setValue("");
  };
  //   console.log(newTodo.value);
  return (
    <InputTodoBlock>
      <Input
        placeholder="할 일을 입력해주세요"
        value={newTodo.value}
        onChange={newTodo.onChange}
      />
      <button onClick={onClick}>+</button>
    </InputTodoBlock>
  );
};
export default InputTodo;
