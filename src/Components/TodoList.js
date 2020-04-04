import React from "react";
import styled from "styled-components";
import Title from "./Title";
import InputTodo from "./InputTodo";
import Todo from "./Todo";

const TodoListBlock = styled.div``;

const TodoList = ({ todos, setTodos, onToggle, onRemove }) => {
  return (
    <TodoListBlock>
      <Title />
      <InputTodo setTodos={setTodos} />
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          id={todo.id}
          contents={todo.contents}
          done={todo.done}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </TodoListBlock>
  );
};
export default TodoList;
