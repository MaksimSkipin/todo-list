import React, { useCallback, useMemo } from "react";
import { ReactComponent as XIcon } from "../../../assets/icons/x-icon.svg";

import s from "./AppXBtn.module.css";

interface IAppXBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  viewVariant?: "fill" | "outline";
  colorVariant?: "primary" | "danger";
  size?: number;
}

const AppXBtn: React.FC<IAppXBtnProps> = ({
  viewVariant = "outline",
  colorVariant = "primary",
  size = 26,
  className,
  style = {},
  ...rest
}) => {
  const createClassNames = useCallback(() => {
    const classes = [s.btn_x, className];
    classes.push(s[viewVariant]);
    classes.push(s[colorVariant]);

    return classes.join(" ");
  }, [viewVariant, viewVariant, className, colorVariant]);

  const classes = useMemo(() => createClassNames(), [createClassNames]);

  const styles = useMemo(() => ({ ...style, width: size, height: size }), [size]);

  return (
    <button className={classes} style={styles} data-testid={"app_x_btn"} {...rest}>
      <XIcon />
    </button>
  );
};

export default AppXBtn;
