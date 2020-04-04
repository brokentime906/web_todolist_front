import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import TodoList from "./Components/TodoList";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";

const GET_TODOS_QUERY = gql`
  {
    seeTodoes {
      id
      contents
      done
    }
  }
`;
const App = () => {
  const [todos, setTodos] = useState([]);
  const { data, loading } = useQuery(GET_TODOS_QUERY);
  const onToggle = useCallback((id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  });
  const onRemove = useCallback((id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  });
  useEffect(() => {
    // console.log("loading is chaing", data);
    if (!loading && data && data.seeTodoes) {
      const _todos = data.seeTodoes;
      // console.log(_todos);
      setTodos(_todos);
    }
  }, [loading]);
  return (
    <div className="App">
      {!loading && data && data.seeTodoes && (
        <TodoList
          key={"aslejkfalskejf"}
          todos={todos}
          setTodos={setTodos}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      )}
    </div>
  );
};

export default App;
