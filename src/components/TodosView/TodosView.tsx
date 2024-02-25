import React, { useEffect, useState } from "react";
import AppSearchInput from "../_common/AppSearchInput/AppSearchInput";
import AppSpinner from "../_common/AppSpinner/AppSpinner";
import AppNotification from "../_common/AppNotification/AppNotification";
import TodoList from "../TodoList/TodoList";

import useTodosContext from "../../context/todos.context";
import useDebounce from "../../hooks/useDebounce";

import s from "./TodosView.module.css";

interface ITodosViewProps {}

const TodosView: React.FC<ITodosViewProps> = () => {
  const {
    isLoadingTodos,
    todosCount,
    filteredTodosList,
    errorGetTodos,
    onFilteredTodosByValue,
    getTodos,
  } = useTodosContext();

  const [filterValue, setFilterValue] = useState("");
  const debouncedValue = useDebounce(filterValue);

  const onFilterValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  useEffect(() => {
    onFilteredTodosByValue(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    getTodos(`/todos?limit=150`);
  }, []);

  return (
    <div className={s.todos_view}>
      <h1>Todos {!isLoadingTodos && <sup>{todosCount}</sup>}</h1>

      <AppSearchInput
        value={filterValue}
        onChange={onFilterValueChange}
        placeholder={"Filter todo, min 3 characters ..."}
      />

      <div>
        <AppSpinner isLoading={isLoadingTodos} />
        <AppNotification msg={errorGetTodos} />

        {!isLoadingTodos && !errorGetTodos && <TodoList list={filteredTodosList} />}
      </div>
    </div>
  );
};

export default TodosView;
