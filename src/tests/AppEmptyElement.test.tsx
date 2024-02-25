import React from "react";
import { render, screen } from "@testing-library/react";
import AppEmptyElement from "../components/_common/AppEmptyElement/AppEmptyElement";

describe("AppEmptyElement Component", () => {
  it("Renders default", () => {
    render(<AppEmptyElement />);

    const emptyElement = screen.getByTestId("app_empty_element");
    const defaultTitle = screen.getByText(/No todos/i);
    const defaultText = screen.getByText(
      /Add a new todo and it will appear here, or change the filter value/i,
    );

    expect(emptyElement).toBeInTheDocument();
    expect(defaultTitle).toBeInTheDocument();
    expect(defaultText).toBeInTheDocument();
  });

  it("Renders with custom values", () => {
    const customTitle = "Test Title";
    const customText = "Test Text";

    render(<AppEmptyElement title={customTitle} text={customText} />);

    const emptyElement = screen.getByTestId("app_empty_element");
    const customTitleElement = screen.getByText(customTitle);
    const customTextElement = screen.getByText(customText);

    expect(emptyElement).toBeInTheDocument();
    expect(customTitleElement).toBeInTheDocument();
    expect(customTextElement).toBeInTheDocument();
  });
});
