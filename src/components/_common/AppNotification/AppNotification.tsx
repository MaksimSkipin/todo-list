import React, { useCallback, useMemo } from "react";
import s from "./AppNotification.module.css";

interface IAppErrorMsgProps {
  msg: string | null;
  variant?: "error" | "success";
  isToast?: boolean;
}

const AppNotification: React.FC<IAppErrorMsgProps> = ({ msg, variant = "error", isToast }) => {
  const createClassNames = useCallback(() => {
    const classes = [s.app_msg];
    classes.push(s[variant]);
    isToast && classes.push(s.toast);

    return classes.join(" ");
  }, [variant, isToast]);

  const classes = useMemo(() => createClassNames(), [createClassNames]);
  const testId = useMemo(() => `app_msg-${variant}${isToast ? "-toast" : ""}`, [variant, isToast]);

  if (!msg) return null;

  return (
    <div className={classes} data-testid={testId}>
      {msg}
    </div>
  );
};

export default AppNotification;
