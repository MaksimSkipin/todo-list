import React from "react";
import { render, screen } from "@testing-library/react";
import AppNotification from "../components/_common/AppNotification/AppNotification";

const variantError = "error";
const variantSuccess = "success";

describe("AppNotification Component", () => {
  it("Render error message", () => {
    const errorMsg = "This is an error message";

    render(<AppNotification msg={errorMsg} variant={variantError} />);

    const notification = screen.getByText(errorMsg);
    const errorClass = screen.getByTestId(`app_msg-${variantError}`);

    expect(notification).toBeInTheDocument();
    expect(errorClass).toBeInTheDocument();
  });

  it("Render success message", () => {
    const successMsg = "This is a success message";

    render(<AppNotification msg={successMsg} variant={variantSuccess} />);

    const notification = screen.getByText(successMsg);
    const successClass = screen.getByTestId(`app_msg-${variantSuccess}`);

    expect(notification).toBeInTheDocument();
    expect(successClass).toBeInTheDocument();
  });

  it("Does not render", () => {
    render(<AppNotification msg={null} variant={variantError} />);

    const notification = screen.queryByTestId(`app_msg-${variantError}`);

    expect(notification).toBeNull();
  });

  it("Render as toast", () => {
    const toastMsg = "This is a toast message";

    render(<AppNotification msg={toastMsg} variant={variantError} isToast />);

    const notification = screen.getByText(toastMsg);
    const toastClass = screen.getByTestId(`app_msg-${variantError}-toast`);

    expect(notification).toBeInTheDocument();
    expect(toastClass).toBeInTheDocument();
  });

  it("Render default variant", () => {
    const defaultMsg = "This is a default message";

    render(<AppNotification msg={defaultMsg} />);

    const notification = screen.getByText(defaultMsg);
    const defaultClass = screen.getByTestId("app_msg-error");

    expect(notification).toBeInTheDocument();
    expect(defaultClass).toBeInTheDocument();
  });
});
