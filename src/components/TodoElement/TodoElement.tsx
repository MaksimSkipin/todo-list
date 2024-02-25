import React, { useEffect, useMemo } from "react";
import AppXBtn from "../_common/AppXBtn/AppXBtn";
import AppSpinner from "../_common/AppSpinner/AppSpinner";

import useTodosContext from "../../context/todos.context";
import useToastContext from "../../context/toast.context";

import useFetch from "../../hooks/useFetch";

import ITodo, { IDeletedTodo } from "../../types/todo.types";

import s from "./TodoElement.module.css";

interface ITodoElementProps {
  todoItem: ITodo;
}

const TodoElement: React.FC<ITodoElementProps> = ({ todoItem }) => {
  const { afterDelete } = useTodosContext();
  const { showToast } = useToastContext();

  const { isLoading, error, data, fetchData: deleteTodo } = useFetch<IDeletedTodo>();

  const { completed, todo, userId, id } = todoItem;

  const statusClass = useMemo(() => (completed ? s.completed : s.not_completed), [completed]);

  useEffect(() => {
    if (data && data.isDeleted && !error) {
      afterDelete(data.id);
      showToast(`Todo with ID: ${id} has been deleted`);
    }

    if (!data && error) showToast(error);
  }, [data, error]);

  return (
    <>
      <li className={s.todo_element_item} data-testid={`todo_element-${id}`}>
        <div className={s.todo_element_header}>
          <div className={statusClass}>{completed ? "Completed" : "Not completed"}</div>

          {!isLoading ? (
            <AppXBtn
              colorVariant={"danger"}
              size={20}
              onClick={() => deleteTodo(`/todos/${id}?delay=2000`, { method: "DELETE" })}
              data-testid={`delete_todo_button-${id}`}
            />
          ) : (
            <AppSpinner isLoading={isLoading} size={20} data-testid={`delete_todo_spinner-${id}`} />
          )}
        </div>

        <div className={s.todo_element_body}>{todo}</div>

        <div className={s.todo_element_footer}>User ID: {userId}</div>
      </li>
    </>
  );
};

export default TodoElement;
