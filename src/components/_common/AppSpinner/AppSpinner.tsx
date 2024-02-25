import React from "react";
import s from "./AppSpinner.module.css";

interface IAppSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  size?: number;
}

const AppSpinner: React.FC<IAppSpinnerProps> = ({ isLoading, size = 50, style, ...rest }) => {
  const styles = {
    width: size,
    height: size,
    ...style,
  };

  if (!isLoading) return null;

  return <div className={s.app_spinner} style={styles} data-testid='app_spinner' {...rest} />;
};

export default AppSpinner;
