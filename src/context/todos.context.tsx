import React, { createContext, useContext, useEffect, useState } from "react";

import useFetch from "../hooks/useFetch";

import ITodo, { ITodosResponse } from "../types/todo.types";

export interface ITodosContextType {
  isLoadingTodos: boolean;
  todosCount: number;
  filteredTodosList: ITodo[];
  errorGetTodos: string | null;
  onFilteredTodosByValue: (searchValue: string) => void;
  getTodos: (url: string) => Promise<void>;

  afterDelete: (id: number) => void;
}

const initContextState: ITodosContextType = {
  isLoadingTodos: false,
  todosCount: 0,
  filteredTodosList: [],
  errorGetTodos: null,
  onFilteredTodosByValue: () => {},
  getTodos: async () => {},

  afterDelete: () => {},
};

const TodosContext = createContext(initContextState);

export const TodosContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const {
    isLoading: isLoadingTodos,
    error: errorGetTodos,
    data: todosData,
    fetchData: getTodos,
  } = useFetch<ITodosResponse>();

  const [todosCount, setTodosCount] = useState(0);
  const [filteredTodosList, setFilteredTodosList] = useState<ITodo[]>([]);

  const onFilteredTodosByValue = (searchValue: string) => {
    if (!todosData) return;

    if (searchValue.length === 0 && todosData) return setFilteredTodosList(todosData.todos);
    if (searchValue.length < 3) return;

    const filteredTodos = todosData.todos.filter((todo) =>
      todo.todo.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredTodosList(filteredTodos);
  };

  const afterDelete = (id: number) => {
    const newTodos = filteredTodosList.filter((todo) => todo.id !== id);

    setFilteredTodosList(newTodos);
    setTodosCount(todosCount - 1);
  };

  useEffect(() => {
    if (todosData && todosData.todos) {
      setTodosCount(todosData.total);
      setFilteredTodosList(todosData.todos);
    }
  }, [todosData]);

  return (
    <TodosContext.Provider
      value={{
        isLoadingTodos,
        todosCount,
        filteredTodosList,
        errorGetTodos,
        onFilteredTodosByValue,
        getTodos,
        afterDelete,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export default function useTodosContext() {
  return useContext(TodosContext);
}
