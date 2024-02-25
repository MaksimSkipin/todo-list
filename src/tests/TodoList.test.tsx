import React from "react";
import { render, screen } from "@testing-library/react";
import TodoList from "../components/TodoList/TodoList";
import { mockTodosList } from "./mockTodosData/todos";

describe("TodoList Component", () => {
  it("Render empty list", () => {
    render(<TodoList list={[]} />);
    const emptyMessage = screen.getByTestId("app_empty_element");
    expect(emptyMessage).toBeInTheDocument();
  });

  it("Render todos list", async () => {
    render(<TodoList list={mockTodosList} />);
    const todoElements = await screen.findAllByTestId(/todo_element/);
    expect(todoElements).toHaveLength(mockTodosList.length);
  });
});
