import React, { useMemo } from "react";
import AppEmptyElement from "../_common/AppEmptyElement/AppEmptyElement";
import TodoElement from "../TodoElement/TodoElement";

import ITodo from "../../types/todo.types";

import s from "./TodoList.module.css";

interface ITodoListProps {
  list: ITodo[];
}

const TodoList: React.FC<ITodoListProps> = ({ list }) => {
  const isEmpty = useMemo(() => list.length === 0, [list.length]);

  return (
    <>
      {!isEmpty && (
        <ul className={s.todos_list} data-testid='todo_list'>
          {list.map((todo) => (
            <TodoElement key={todo.id} todoItem={todo} />
          ))}
        </ul>
      )}

      {isEmpty && <AppEmptyElement />}
    </>
  );
};

export default TodoList;
