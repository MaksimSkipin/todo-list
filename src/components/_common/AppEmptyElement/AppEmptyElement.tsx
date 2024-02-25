import React from "react";

import s from "./AppEmptyElement.module.css";

interface IAppEmptyElementProps {
  title?: string;
  text?: string;
}

const initialProps: IAppEmptyElementProps = {
  title: "No todos",
  text: "Add a new todo and it will appear here, or change the filter value.",
};

const AppEmptyElement: React.FC<IAppEmptyElementProps> = ({
  title = initialProps.title,
  text = initialProps.text,
}) => {
  return (
    <div className={s.empty_element} data-testid={"app_empty_element"}>
      <div className={s.empty_title}>{title}</div>

      <p className={s.empty_text}>{text}</p>
    </div>
  );
};

export default AppEmptyElement;
