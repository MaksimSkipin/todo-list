import React from "react";
import s from "./AppSearchInput.module.css";

const AppSearchInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  value,
  className,
  ...rest
}) => {
  return (
    <input
      type={"text"}
      data-testid={"app_search"}
      className={`${s.search_input} ${className}`}
      {...rest}
    />
  );
};

export default AppSearchInput;
