import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AppSearchInput from "../components/_common/AppSearchInput/AppSearchInput";

describe("AppSearchInput Component", () => {
  it("Renders default", () => {
    render(<AppSearchInput />);

    const searchInput = screen.getByTestId("app_search");

    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute("type", "text");
  });

  it("Custom attributes", () => {
    const placeholderText = "Enter your search";
    const customId = "custom-id";

    render(<AppSearchInput placeholder={placeholderText} id={customId} />);

    const searchInput = screen.getByTestId("app_search");

    expect(searchInput).toHaveAttribute("placeholder", placeholderText);
    expect(searchInput).toHaveAttribute("id", customId);
  });

  it("Handles value change", () => {
    render(<AppSearchInput />);

    const searchInput = screen.getByTestId("app_search") as HTMLInputElement;
    const value = "test";

    fireEvent.change(searchInput, { target: { value } });

    expect(searchInput.value).toBe(value);
  });
});
