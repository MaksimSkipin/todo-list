import React from "react";
import TodosView from "../TodosView/TodosView";

import { TodosContextProvider } from "../../context/todos.context";

import s from "./App.module.css";

function App() {
  return (
    <div className={s.app_container}>
      <TodosContextProvider>
        <TodosView />
      </TodosContextProvider>
    </div>
  );
}

export default App;
