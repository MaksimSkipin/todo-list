import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AppXBtn from "../components/_common/AppXBtn/AppXBtn";

describe("AppXBtn Component", () => {
  it("Render default", () => {
    render(<AppXBtn />);

    const xBtn = screen.getByTestId("app_x_btn");

    expect(xBtn).toBeInTheDocument();
    expect(xBtn).toHaveClass("btn_x");
    expect(xBtn).toHaveClass("outline");
    expect(xBtn).toHaveClass("primary");
    expect(xBtn).toHaveStyle({ width: "26px", height: "26px" });
  });

  it("Render with custom variants and size", () => {
    render(<AppXBtn viewVariant='fill' colorVariant='danger' size={30} />);

    const xBtn = screen.getByTestId("app_x_btn");

    expect(xBtn).toHaveClass("btn_x");
    expect(xBtn).toHaveClass("fill");
    expect(xBtn).toHaveClass("danger");
    expect(xBtn).toHaveStyle({ width: "30px", height: "30px" });
  });

  it("Handle button click", () => {
    const onClickMock = jest.fn();

    render(<AppXBtn onClick={onClickMock} />);

    const xBtn = screen.getByTestId("app_x_btn");

    fireEvent.click(xBtn);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("Render with custom class name", () => {
    const customClass = "custom-class";

    render(<AppXBtn className={customClass} />);

    const xBtn = screen.getByTestId("app_x_btn");

    expect(xBtn).toHaveClass(customClass);
  });
});
