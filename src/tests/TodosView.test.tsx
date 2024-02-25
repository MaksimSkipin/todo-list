import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TodosView from "../components/TodosView/TodosView";
import { TodosContextProvider } from "../context/todos.context";

describe("TodosView Component", () => {
  it("Displays title", () => {
    render(
      <TodosContextProvider>
        <TodosView />
      </TodosContextProvider>,
    );

    expect(screen.getByText(/Todos/i)).toBeInTheDocument();
    expect(screen.getByTestId("app_search")).toBeInTheDocument();
  });

  it("Change filter input", () => {
    render(
      <TodosContextProvider>
        <TodosView />
      </TodosContextProvider>,
    );

    const filterInput = screen.getByTestId("app_search") as HTMLInputElement;
    fireEvent.change(filterInput, { target: { value: "todo 1" } });

    expect(filterInput.value).toBe("todo 1");
  });

  it("Test show todos", async () => {
    render(
      <TodosContextProvider>
        <TodosView />
      </TodosContextProvider>,
    );

    expect(screen.getByTestId("app_spinner")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("app_spinner")).toBeNull();
    });

    await waitFor(() => {
      expect(screen.getByTestId("todo_list")).toBeInTheDocument();
    });
  });
});
