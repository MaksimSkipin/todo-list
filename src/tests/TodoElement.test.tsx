import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TodoElement from "../components/TodoElement/TodoElement";
import { TodosContextProvider } from "../context/todos.context";
import { ToastContextProvider } from "../context/toast.context";
import { mockTodoElement } from "./mockTodosData/todos";

describe("TodoElement Component", () => {
  it("Renders TodoElement correctly", () => {
    render(
      <TodosContextProvider>
        <ToastContextProvider>
          <TodoElement todoItem={mockTodoElement} />
        </ToastContextProvider>
      </TodosContextProvider>,
    );

    const todoElement = screen.getByTestId(`todo_element-${mockTodoElement.id}`);
    const todoStatusElement = screen.getByText("Not completed");
    const deleteButtonElement = screen.getByTestId(`delete_todo_button-${mockTodoElement.id}`);
    const bodyElement = screen.getByText(mockTodoElement.todo);
    const footerElement = screen.getByText(`User ID: ${mockTodoElement.userId}`);

    expect(todoElement).toBeInTheDocument();
    expect(todoStatusElement).toBeInTheDocument();
    expect(deleteButtonElement).toBeInTheDocument();
    expect(bodyElement).toBeInTheDocument();
    expect(footerElement).toBeInTheDocument();
  });

  it("Shows spinner while delete in progress", async () => {
    render(
      <TodosContextProvider>
        <ToastContextProvider>
          <TodoElement todoItem={mockTodoElement} />
        </ToastContextProvider>
      </TodosContextProvider>,
    );

    const deleteButton = screen.getByTestId(`delete_todo_button-${mockTodoElement.id}`);
    fireEvent.click(deleteButton);

    const spinner = screen.getByTestId(`delete_todo_spinner-${mockTodoElement.id}`);

    await waitFor(() => {
      expect(spinner).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(deleteButton).not.toBeInTheDocument();
    });
  });
});
