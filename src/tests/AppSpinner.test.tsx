import React from "react";
import { render, screen } from "@testing-library/react";
import AppSpinner from "../components/_common/AppSpinner/AppSpinner";

describe("AppSpinner Component", () => {
  it("Render default", () => {
    render(<AppSpinner isLoading={true} />);

    const spinner = screen.getByTestId("app_spinner");

    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveStyle({ width: "50px", height: "50px" });
  });

  it("Render with custom size", () => {
    render(<AppSpinner isLoading={true} size={30} />);

    const spinner = screen.getByTestId("app_spinner");

    expect(spinner).toHaveStyle({ width: "30px", height: "30px" });
  });

  it("Do not render", () => {
    render(<AppSpinner isLoading={false} />);

    const spinner = screen.queryByTestId("app_spinner");

    expect(spinner).toBeNull();
  });

  it("Render with custom class name", () => {
    const customClass = "custom-class";

    render(<AppSpinner isLoading={true} className={customClass} />);

    const spinner = screen.getByTestId("app_spinner");

    expect(spinner).toHaveClass(customClass);
  });
});
